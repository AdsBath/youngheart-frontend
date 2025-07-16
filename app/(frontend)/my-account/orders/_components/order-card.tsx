"use client";

import { Button } from "@/components/custom/button";
import Loading from "@/components/loding";
import { useMyOrderQuery } from "@/redux/api/orderApi";
import Link from "next/link";

const OrderCard = () => {
    const { data, isLoading } = useMyOrderQuery({});

    const sortedOrders = data?.data?.slice().sort((a: any, b: any) => {
        return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    });

    // Get the first 3 orders
    const recentOrders = sortedOrders?.slice(0, 3);

    return (
        <>
            {isLoading ? (
                <div className="relative h-[25vh] w-full">
                    <Loading />
                </div>
            ) : (
                <div className="px-4 my-4 ">
                    <div className="flex justify-between">
                        <h2 className="text-xl font-bold tracking-tight">
                            Recent Orders
                        </h2>
                        <Link href={"/my-account/orders"}>
                            <Button
                                className="mt-2"
                                variant="outline"
                                size="sm"
                            >
                                View All
                            </Button>
                        </Link>
                    </div>
                    <p className="text-muted-foreground mb-4">
                        List of all Orders in the system.
                    </p>
                    <hr />
                    {recentOrders?.length > 0 ? (
                        <div className="overflow-x-auto mt-4">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Order ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Items & Variants
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {recentOrders?.map(
                                        (orderItem: any, index: number) => (
                                            <tr key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="text-green-500 font-bold">
                                                        {orderItem?.orderId}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex flex-col space-y-2">
                                                        {orderItem?.orderItems?.map(
                                                            (
                                                                product: any,
                                                                idx: number
                                                            ) => (
                                                                <div key={idx}>
                                                                    <div className="font-bold text-sm">
                                                                        {product?.product?.name?.substring(
                                                                            0,
                                                                            20
                                                                        )}
                                                                    </div>
                                                                    <div className="text-xs text-gray-500">
                                                                        <span>
                                                                            Color:{" "}
                                                                            {
                                                                                product?.color
                                                                            }
                                                                        </span>
                                                                        ,{" "}
                                                                        <span>
                                                                            Size:{" "}
                                                                            {
                                                                                product?.size
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap relative">
                                                    <span className="font-bold text-gray-900">
                                                        ৳{" "}
                                                        {orderItem?.totalAmount.toFixed(
                                                            2
                                                        )}
                                                    </span>
                                                    {orderItem?.status ===
                                                        "PENDING" && (
                                                        <span
                                                            className="text-xs bg-red-600 p-1 text-white block absolute -top-2
                          "
                                                        >
                                                            New Order
                                                        </span>
                                                    )}
                                                    {orderItem?.status !==
                                                        "PENDING" && (
                                                        <span
                                                            className="text-xs  text-black block
                          "
                                                        >
                                                            Processing
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-zinc-500">No orders found</p>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default OrderCard;
