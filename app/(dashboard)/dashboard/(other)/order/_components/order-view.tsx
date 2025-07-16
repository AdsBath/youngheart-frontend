"use client";
// import BlurImage from "@/components/ui/blur-image";
import { format } from "date-fns";
import Image from "next/image";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const OrderView = ({ orderData }: { orderData: any }) => {
    const componentRef = useRef<HTMLDivElement | null>(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const subtotal =
        orderData?.orderItems?.reduce(
            (acc: any, item: any) => acc + item.price * item.quantity,
            0
        ) || 0;

    const total = subtotal - orderData?.discount;
    const delivery = Number(orderData?.shippingCharge);

    return (
        <div>
            {/* Printable Area */}
            <div className="mx-auto w-[720px]" ref={componentRef}>
                {/* Header Section */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        {/* Company Logo or Name */}
                        <Image
                            width={12}
                            height={12}
                            alt="thumbnail"
                            className="h-12 w-12"
                            src="/logo.svg"
                        />
                    </div>
                    <div className="text-right">
                        <p className="text-sm">
                            Order ID: <strong>{orderData?.orderId}</strong>
                        </p>
                        <p className="text-sm">
                            Order Date:{" "}
                            <strong>
                                {format(
                                    orderData?.createdAt ?? new Date(),
                                    "PPP"
                                )}
                            </strong>
                        </p>
                        <p className="text-sm">
                            Payment:{" "}
                            <strong>
                                {orderData?.paymentMethod === "cod"
                                    ? "Cash On Delivery (COD)"
                                    : "Online"}
                            </strong>
                        </p>
                        {/* <p className="text-sm">
                            Shipping: <strong>My Courier</strong>
                        </p> */}
                    </div>
                </div>

                {/* Customer Information */}
                <div className="mb-6">
                    <p>
                        <strong>
                            {orderData?.user?.firstName}{" "}
                            {orderData?.user?.lastName}
                        </strong>
                    </p>
                    <p>Billing Address: {orderData?.billingAddress}</p>
                    <p>
                        Shipping Address:{" "}
                        {orderData?.shipToDifferentAddress ?? "N/A"}
                    </p>
                    <p>Phone: {orderData?.user?.phone}</p>
                </div>

                {/* Product Details */}
                <table className="min-w-full mb-6 text-sm border-collapse">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-2 px-4 border">Image</th>
                            <th className="py-2 px-4 border">Product</th>
                            <th className="py-2 px-4 border">Price</th>
                            <th className="py-2 px-4 border">Quantity</th>
                            <th className="py-2 px-4 border">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderData?.orderItems?.map(
                            (order: any, index: number) => (
                                <tr key={index}>
                                    <td className="py-2 px-4 border text-center">
                                        <Image
                                            width={10}
                                            height={10}
                                            className="object-contain w-10 h-10"
                                            alt={order?.product?.name}
                                            src={order?.product?.thumbnail}
                                        />
                                    </td>
                                    <td className="py-2 px-4 border text-xs">
                                        {order?.product?.name} <br />
                                        Color:{" "}
                                        {order?.color ? order?.color : "N/A"},
                                        Size:{" "}
                                        {order?.size ? order?.size : "N/A"}
                                    </td>
                                    <td className="py-2 px-4 border text-center">
                                        ৳{order?.price}.00
                                    </td>
                                    <td className="py-2 px-4 border text-center">
                                        {order?.quantity}
                                    </td>
                                    <td className="py-2 px-4 border text-center">
                                        ৳
                                        {(
                                            order?.price * order?.quantity
                                        )?.toFixed(2)}
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>

                {/* Summary Section */}
                <div className="text-right">
                    <table className="ml-auto text-sm">
                        <tbody>
                            <tr>
                                <td className="py-1 px-4">Subtotal:</td>
                                <td className="py-1 px-4">
                                    ৳{subtotal?.toFixed(2)}
                                </td>
                            </tr>
                            <tr>
                                <td className="py-1 px-4">Shipping Charge:</td>
                                <td className="py-1 px-4">
                                    ৳{delivery.toFixed(2)}
                                </td>
                            </tr>
                            <tr>
                                <td className="py-1 px-4">Discount:</td>
                                <td className="py-1 px-4">
                                    ৳{orderData?.discount?.toFixed(2)}
                                </td>
                            </tr>
                            <tr>
                                <td className="py-1 px-4 font-bold">
                                    Grand Total:
                                </td>
                                <td className="py-1 px-4 font-bold">
                                    ৳{(total + delivery)?.toFixed(2)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Print Button */}
            <div className="flex justify-end mt-6 print:hidden">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={handlePrint}
                >
                    Print
                </button>
            </div>
        </div>
    );
};

export default OrderView;
