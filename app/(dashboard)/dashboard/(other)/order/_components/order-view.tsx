"use client"

import { format } from "date-fns"
import Image from "next/image"
import { useCallback, useRef, useState } from "react"
import { useReactToPrint } from "react-to-print"

// Utility to format currency
const money = (v: unknown) => {
    const num = Number(v || 0)
    return `৳${num.toFixed(2)}`
}

interface OrderItem {
    id: string
    quantity: number
    color?: string
    size?: string
    price: number
    discountAmount?: number
    productName?: string
    productSku?: string
    productImage?: string
    product?: { name?: string; thumbnail?: string; sku?: string }
}

interface OrderData {
    orderId?: string
    createdAt?: string
    paymentMethod?: string
    billingAddress?: string
    shipToDifferentAddress?: string | null
    shippingCharge?: number
    discount?: number | null
    discountAmount?: number | null
    totalAmount?: number
    orderItems?: OrderItem[]
    user?: {
        firstName?: string
        lastName?: string
        phone?: string
        email?: string
        role?: string
    }
    notes?: string | null
    status?: string
}

const OrderView = ({ orderData }: { orderData?: OrderData | null }) => {
    const componentRef = useRef<HTMLDivElement | null>(null)
    const [downloading, setDownloading] = useState(false)

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    // Normalize and compute totals
    const rawItems = Array.isArray(orderData?.orderItems) ? orderData!.orderItems! : []
    const items: OrderItem[] = rawItems.filter(Boolean)
    const subtotal = items.reduce(
        (acc, it) => acc + Number(it?.price || 0) * Number(it?.quantity || 0),
        0
    )
    const lineDiscount = items.reduce(
        (acc, it) => acc + Number(it?.discountAmount || 0),
        0
    )
    const orderLevelDiscount = Number(
        orderData?.discountAmount || orderData?.discount || 0
    )
    const totalDiscount = lineDiscount > 0 ? lineDiscount : orderLevelDiscount
    const shipping = Number(orderData?.shippingCharge || 0)
    const payable = subtotal - totalDiscount + shipping

    // Row component memoized
    const OrderItemRow = useCallback(
        ({ item, index }: { item: OrderItem; index: number }) => {
            const lineSubtotal = Number(item?.price || 0) * Number(item?.quantity || 0)
            const discount = Number(item?.discountAmount || 0)
            const lineTotal = lineSubtotal - discount

            return (
                <tr key={item.id} className="border-t *:*:px-3 *:*:py-2 align-top">
                    <td>{index + 1}</td>
                    <td className="max-w-[220px]">
                        <div className="flex gap-2">
                            <Image
                                width={60}
                                height={60}
                                alt={item.productName || item.product?.name || "product"}
                                className="h-10 w-10 rounded object-cover border p-1"
                                src={item.productImage || item.product?.thumbnail || "/placeholder.png"}
                                unoptimized
                                priority
                            />
                            <div className="space-y-0.5">
                                <p className="font-medium leading-snug">{item.productName || item.product?.name}</p>
                                <p className="text-[10px] text-gray-500">SKU: {item.productSku || item.product?.sku || "N/A"}</p>
                                {(item.color || item.size) && (
                                    <p className="text-[10px] text-gray-500">
                                        {item.color || "—"} {item.size && <>| {item.size}</>}
                                    </p>
                                )}
                            </div>
                        </div>
                    </td>
                    <td className="text-center">{item.quantity}</td>
                    <td className="text-right">{money(item.price)}</td>
                    <td className="text-right text-red-600">{discount ? `-${money(discount)}` : "-"}</td>
                    <td className="text-right font-medium">
                        {money(lineTotal)}
                        {discount ? (
                            <span className="block text-[10px] text-gray-400 line-through">{money(lineSubtotal)}</span>
                        ) : null}
                    </td>
                </tr>
            )
        },
        []
    )

    // PDF Generation
    const generatePdf = async () => {
        if (!componentRef.current) return
        try {
            setDownloading(true)
            const html2canvas = (await import("html2canvas")).default
            const { jsPDF } = await import("jspdf")

            // Ensure images are loaded
            const images = componentRef.current.querySelectorAll("img")
            await Promise.all(
                Array.from(images).map((img) => {
                    if (img.complete) return Promise.resolve(null)
                    return new Promise((resolve) => {
                        img.onload = resolve
                        img.onerror = resolve
                    })
                })
            )

            const canvas = await html2canvas(componentRef.current, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: "#fff",
                imageTimeout: 15000,
                logging: false,
            })

            const pdf = new jsPDF("p", "mm", "a4")
            const margin = 10
            const pageWidth = pdf.internal.pageSize.getWidth()
            const pageHeight = pdf.internal.pageSize.getHeight()
            const usableWidth = pageWidth - margin * 2
            const usableHeight = pageHeight - margin * 2
            const scaleFactor = usableWidth / canvas.width
            const sliceHeightPx = usableHeight / scaleFactor

            let rendered = 0
            let page = 0
            while (rendered < canvas.height) {
                const sliceCanvas = document.createElement("canvas")
                sliceCanvas.width = canvas.width
                const h = Math.min(sliceHeightPx, canvas.height - rendered)
                sliceCanvas.height = h
                const ctx = sliceCanvas.getContext("2d")
                ctx?.drawImage(canvas, 0, rendered, canvas.width, h, 0, 0, canvas.width, h)
                const img = sliceCanvas.toDataURL("image/png")
                if (page > 0) pdf.addPage()
                pdf.addImage(img, "PNG", margin, margin, usableWidth, h * scaleFactor)
                rendered += h
                page++
            }
            pdf.save(`order-${orderData?.orderId || "invoice"}.pdf`)
        } catch (e) {
            console.error(e)
        } finally {
            setDownloading(false)
        }
    }

    if (!orderData) {
        return (
            <div className="p-4 text-sm text-gray-500 border rounded-md">No order data provided.</div>
        )
    }

    return (
        <div className="space-y-2">
            {/* Printable Area */}
            <div className="print:shadow-none print:p-2 print:bg-transparent" ref={componentRef}>
                {/* Header */}
                <div className="flex justify-between flex-wrap gap-4 border-b pb-4 mb-4">
                    <div className="flex items-center gap-3">
                        <Image
                            width={64}
                            height={64}
                            alt="logo"
                            className="h-14 w-14 object-contain"
                            src="/youngheart.png"
                            unoptimized
                            priority
                        />
                        <div>
                            <h1 className="text-lg font-semibold">Invoice</h1>
                            <p className="text-xs text-gray-500">Thank you for your purchase!</p>
                        </div>
                    </div>
                    <div className="text-right text-xs leading-5">
                        <p>
                            <span className="text-gray-500">Order ID:</span> <strong>{orderData.orderId || "-"}</strong>
                        </p>
                        <p>
                            <span className="text-gray-500">Date:</span>{" "}
                            <strong>{format(orderData.createdAt ? new Date(orderData.createdAt) : new Date(), "PP")}</strong>
                        </p>
                        <p>
                            <span className="text-gray-500">Payment:</span>{" "}
                            <strong>
                                {orderData.paymentMethod === "cod"
                                    ? "Cash On Delivery"
                                    : orderData.paymentMethod
                                        ? "Online"
                                        : "-"}
                            </strong>
                        </p>
                        {orderData.status && (
                            <p>
                                <span className="text-gray-500">Status:</span> <strong>{orderData.status}</strong>
                            </p>
                        )}
                    </div>
                </div>

                {/* Parties */}
                <div className="grid grid-cols-2 gap-4 text-xs mb-6">
                    <div>
                        <h2 className="font-semibold text-sm mb-1">Bill To</h2>
                        <p className="font-medium">
                            {orderData.user?.firstName} {orderData.user?.lastName}
                        </p>
                        <p className="text-gray-600 whitespace-pre-line break-words">{orderData.billingAddress || "-"}</p>
                        <p>{orderData.user?.phone}</p>
                        <p>{orderData.user?.email}</p>
                    </div>
                    <div>
                        <h2 className="font-semibold text-sm mb-1">Ship To</h2>
                        <p className="text-gray-600 min-h-[40px]">
                            {orderData.shipToDifferentAddress || orderData.billingAddress || "N/A"}
                        </p>
                        {orderData.notes && (
                            <p className="mt-2">
                                <span className="font-semibold">Notes:</span> {orderData.notes}
                            </p>
                        )}
                    </div>
                </div>

                {/* Items */}
                <table className="w-full text-xs border border-gray-200 mb-6">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr className="*:*:px-3 *:*:py-2">
                            <th className="text-left">#</th>
                            <th className="text-left">Product</th>
                            <th className="text-center">Qty</th>
                            <th className="text-right">Price</th>
                            <th className="text-right">Discount</th>
                            <th className="text-right">Line Total</th>
                        </tr>
                    </thead>
                    <tbody className="p-2">
                        {items.map((item, idx) => (
                            <OrderItemRow key={item.id || idx.toString()} item={item} index={idx} />
                        ))}
                        {items.length === 0 && (
                            <tr className="border-t">
                                <td className="px-3 py-4 text-center text-gray-500" colSpan={6}>
                                    No items
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Totals */}
                <div className="flex justify-end">
                    <table className="text-xs w-64">
                        <tbody className="*:*:py-1 *:*:px-2">
                            <tr>
                                <td className="text-gray-500">Subtotal</td>
                                <td className="text-right font-medium">{money(subtotal)}</td>
                            </tr>
                            <tr>
                                <td className="text-gray-500">Discount</td>
                                <td className="text-right text-red-600">-{money(totalDiscount)}</td>
                            </tr>
                            <tr>
                                <td className="text-gray-500">Shipping</td>
                                <td className="text-right">{money(shipping)}</td>
                            </tr>
                            <tr className="border-t">
                                <td className="font-semibold">Total Payable</td>
                                <td className="text-right font-semibold">{money(payable)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-[10px] text-gray-400 mt-6">This is a system generated invoice.</p>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 print:hidden">
                <button
                    onClick={handlePrint}
                    className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm hover:bg-black transition"
                >
                    Print
                </button>
                <button
                    onClick={generatePdf}
                    disabled={downloading}
                    className="bg-blue-600 disabled:opacity-50 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
                >
                    {downloading ? "Preparing..." : "Download PDF"}
                </button>
            </div>
        </div>
    )
}

export default OrderView
