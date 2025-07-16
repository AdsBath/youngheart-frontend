"use client";
import Loading from "@/components/loding";
import BlurImage from "@/components/ui/blur-image";
import { useMyOrderByIdQuery } from "@/redux/api/orderApi";
import { IconCheck } from "@tabler/icons-react";
import { format } from "date-fns";

const OrderReceivePage = ({ params }: { params: any }) => {
    const { orderId } = params;
    const { data: order, isLoading } = useMyOrderByIdQuery(orderId);
    const orderData = order?.data;

    return (
        <div className="container mx-auto min-h-[60vh] my-10">
            <div className="flex justify-center items-center gap-2 text-center text-green-500 font- text-[28px] tracking-normal leading-7 mb-10">
                <div>
                    <IconCheck size={50} />{" "}
                </div>
                <span className="text-sm sm:text-sm md:text-md lg:text-2xl">
                    Thank you! Your Order has been received.
                </span>
            </div>
            {isLoading ? (
                <div className="min-h-screen">
                    <Loading />
                </div>
            ) : (
                <>
                    <section className="container px-4 mx-auto">
                        <ul className="flex flex-col md:flex-row items-start justify-center gap-4 md:gap-8  py-6 bg-gray-100">
                            {[
                                {
                                    label: "Order Id:",
                                    value: orderData?.orderId,
                                },
                                {
                                    label: "Date:",
                                    value: format(orderData?.createdAt, "PPP"),
                                },
                                {
                                    label: "Email:",
                                    value: orderData?.user?.email ?? "no email",
                                },
                                {
                                    label: "Total:",
                                    value: orderData?.totalAmount ?? "0",
                                },
                                {
                                    label: "Payment method:",
                                    value:
                                        orderData?.paymentMethod === "online"
                                            ? "Online Payment"
                                            : "Cash on delivery",
                                },
                            ]?.map(({ label, value }, index) => (
                                <li
                                    key={index}
                                    className="flex flex-col items-start "
                                >
                                    <p className="text-sm font-medium text-gray-600">
                                        {label}
                                    </p>
                                    <strong className="text-base text-gray-900">
                                        {value}
                                    </strong>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* product details */}
                    <p className="mb-3 text-center md:text-left">
                        Pay with cash upon delivery.
                    </p>
                    <section className="container">
                        <div className="border rounded p-5">
                            <h2 className="mb-5 text-2xl font-bold text-center md:text-left">
                                Order Details
                            </h2>
                            <div className="overflow-x-auto">
                                <div className="inline-block min-w-full py-2 align-middle">
                                    <div className="overflow-hidden">
                                        <table className="min-w-full divide-y divide-gray-200 ">
                                            <thead className="bg-gray-50 ">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 "
                                                    >
                                                        <div className="flex items-center gap-x-3">
                                                            <button className="flex items-center gap-x-2">
                                                                <span>
                                                                    Image
                                                                </span>

                                                                <svg
                                                                    className="h-3"
                                                                    viewBox="0 0 10 11"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
                                                                        fill="currentColor"
                                                                        stroke="currentColor"
                                                                        strokeWidth="0.1"
                                                                    />
                                                                    <path
                                                                        d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
                                                                        fill="currentColor"
                                                                        stroke="currentColor"
                                                                        strokeWidth="0.1"
                                                                    />
                                                                    <path
                                                                        d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
                                                                        fill="currentColor"
                                                                        stroke="currentColor"
                                                                        strokeWidth="0.3"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </th>

                                                    <th
                                                        scope="col"
                                                        className="px-4 py-3.5 text-sm font-normal text-center text-gray-500"
                                                    >
                                                        Color
                                                    </th>

                                                    <th
                                                        scope="col"
                                                        className="px-4 py-3.5 text-sm font-normal text-center text-gray-500 "
                                                    >
                                                        Size
                                                    </th>

                                                    <th
                                                        scope="col"
                                                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                                                    >
                                                        Price
                                                    </th>

                                                    <th
                                                        scope="col"
                                                        className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 "
                                                    >
                                                        Quantity
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-4 py-3.5 text-sm font-normal text-right text-gray-500 "
                                                    >
                                                        Total
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {orderData?.orderItems?.map(
                                                    (
                                                        order: any,
                                                        index: number
                                                    ) => (
                                                        <tr key={index}>
                                                            <td className="px-4 py-4 text-sm font-medium w-[250px] text-gray-700 whitespace-nowrap">
                                                                <div className="flex items-center gap-x-2 w-[250px]">
                                                                    <BlurImage
                                                                        className="object-cover w-8 h-8 rounded-full"
                                                                        src={
                                                                            order
                                                                                ?.product
                                                                                ?.thumbnail
                                                                        }
                                                                        alt={
                                                                            order
                                                                                ?.product
                                                                                ?.name
                                                                        }
                                                                    />
                                                                    <div>
                                                                        <h2 className="text-sm font-medium text-gray-800 text-wrap line-clamp-2">
                                                                            {order
                                                                                ?.product
                                                                                ?.name ??
                                                                                "N/A"}
                                                                        </h2>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-4 text-sm text-center text-gray-500 whitespace-nowrap">
                                                                <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60">
                                                                    <h2 className="text-sm font-normal">
                                                                        {
                                                                            order?.color
                                                                        }
                                                                    </h2>
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-4 text-sm font-medium text-center text-gray-700 whitespace-nowrap">
                                                                <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-black bg-gray-100/60">
                                                                    <h2 className="text-sm font-normal">
                                                                        {
                                                                            order?.size
                                                                        }
                                                                    </h2>
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                                ৳{order?.price}
                                                            </td>
                                                            <td className="px-4 py-4 text-sm text-center text-gray-500 whitespace-nowrap">
                                                                {
                                                                    order?.quantity
                                                                }
                                                            </td>
                                                            <td className="px-4 py-4 text-sm text-right text-gray-500 whitespace-nowrap">
                                                                ৳
                                                                {order?.price *
                                                                    order?.quantity}
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full border rounded">
                                <div className="border-b">
                                    <div className="flex justify-between px-3 pb-2">
                                        <span className="text-sm">
                                            Subtotal:
                                        </span>
                                        <span className="text-sm">
                                            ৳{" "}
                                            {orderData?.totalAmount +
                                                orderData?.discountAmmount -
                                                orderData?.shippingCharge}
                                        </span>
                                    </div>
                                    <div className="flex justify-between px-3 pb-2">
                                        <div className="text-sm">
                                            <span>Discount: </span>
                                        </div>
                                        <span className="text-sm">
                                            {orderData?.discountAmmount > 0 &&
                                                "-"}
                                            ৳ {orderData?.discountAmmount}
                                        </span>
                                    </div>
                                    <div className="flex justify-between px-3 pb-2">
                                        <span className="text-sm">
                                            Shipping:
                                        </span>
                                        <span className="text-sm">
                                            ৳ {orderData?.shippingCharge}
                                        </span>
                                    </div>
                                    <div className="flex justify-between px-3 pb-2">
                                        <span className="text-sm">
                                            Payment method:
                                        </span>
                                        <span className="text-sm">
                                            {" "}
                                            {orderData?.paymentMethod ===
                                            "Online"
                                                ? "Bank"
                                                : "Cash on delivery"}
                                        </span>
                                    </div>
                                </div>
                                <div className="border-t">
                                    <div className="flex justify-between p-3 text-base">
                                        <span className="font-semibold">
                                            Total:
                                        </span>
                                        <span className="font-semibold">
                                            ৳ {orderData?.totalAmount}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 md:mt-10 px-4 mx:px-0">
                            <ul>
                                <li className="font-bold text-2xl">
                                    Billing Address
                                </li>
                                {orderData?.billingAddress
                                    ?.split(",")
                                    ?.map((address: any, index: number) => (
                                        <li key={index}>{address}</li>
                                    ))}
                                <li>{orderData?.user?.email}</li>
                            </ul>
                            <ul>
                                <li className="font-bold text-2xl">
                                    Shipping Address
                                </li>
                                {orderData?.shipToDifferentAddress
                                    ? orderData?.shipToDifferentAddress
                                          ?.split(",")
                                          ?.map(
                                              (address: any, index: number) => (
                                                  <li key={index}>{address}</li>
                                              )
                                          )
                                    : orderData?.billingAddress
                                          ?.split(",")
                                          ?.map(
                                              (address: any, index: number) => (
                                                  <li key={index}>{address}</li>
                                              )
                                          )}
                            </ul>
                        </div>
                    </section>
                </>
            )}
        </div>
    );
};

export default OrderReceivePage;
