"use client";

import Loading from "@/components/loding";
import { useMyOrderQuery } from "@/redux/api/orderApi";
import Image from "next/image";

const MyOrderList = () => {
  const { data, isLoading } = useMyOrderQuery({});

  console.log({ data });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CONFIRMED":
        return "bg-blue-100 text-blue-800";
      case "PACKING":
        return "bg-orange-100 text-orange-800";
      case "DELIVERED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="px-4 mt-4 min-h-[50vh]">
          <h2 className="text-2xl font-bold tracking-tight">Orders List</h2>
          <p className="text-muted-foreground mb-4">
            List of all Orders in the system.
          </p>
          <hr />
          {data?.data?.length > 0 ? (
            <div className="space-y-4 my-6">
              {data?.data?.map((orderItem: any, index: number) => (
                <div
                  key={index}
                  className="border rounded-lg p-5 shadow-sm bg-white w-full"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700">
                        Order ID:{" "}
                        <span className="text-green-600">
                          {orderItem?.orderId}
                        </span>
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(orderItem?.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        orderItem?.status
                      )}`}
                    >
                      {orderItem?.status === "CONFIRMED" && "Confirmed"}
                      {orderItem?.status === "PENDING" && "Processing"}
                      {orderItem?.status === "PACKING" && "Packing"}
                      {orderItem?.status === "DELIVERED" && "Delivered"}
                      {orderItem?.status === "CANCELLED" && "Cancelled"}
                    </div>
                  </div>
                  <div className="mt-4 flex items-start justify-between flex-col-reverse md:flex-row">
                    <div>
                      {orderItem?.orderItems?.map(
                        (product: any, idx: number) => (
                          <div key={idx} className="flex items-center">
                            <Image
                              src={
                                product?.product?.thumbnail ||
                                "https://via.placeholder.com/150"
                              }
                              alt={product?.product?.name}
                              width={60}
                              height={60}
                              className="object-cover rounded-lg"
                            />
                            <div className="ml-4">
                              <div className="text-sm font-semibold text-gray-800">
                                {product?.product?.name?.substring(0, 20)}
                              </div>
                              <div className="text-xs text-gray-500">
                                Color: {product?.color}, Size: {product?.size}
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                    <div className="text-lg font-bold text-gray-900 text-right md:text-left">
                      ৳ {orderItem?.totalAmount.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
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

export default MyOrderList;
