"use client";

import ThankYou from "./_components/thank-you";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TrackAnimation from "./_components/animattion-car";
import { useOrderQuery } from "@/redux/api/orderApi";
import { useProductsQuery } from "@/redux/api/productApi";
import { trackPurchase } from "@/lib/ga4-events";

const ThankYouPage = () => {
  const router = useRouter();
  const [orderId, setOrderId] = useState<string | null>(null);
  const { data: orderData } = useOrderQuery(orderId as string, {
    skip: !orderId,
  });
  const { data: productsData } = useProductsQuery({});

  useEffect(() => {
    const storedOrderId = JSON.parse(localStorage.getItem("orderId") || "null");
    if (storedOrderId) {
      setOrderId(storedOrderId);
    }
    setTimeout(() => {
      if (storedOrderId) {
        return router.push(`/checkout/order-receive/${storedOrderId}`);
      }
    }, 5000);
  }, [router]);

  // Track purchase event when order data is available
  useEffect(() => {
    if (
      orderData?.data &&
      orderId &&
      productsData?.data?.data &&
      orderData.data.orderItems
    ) {
      const order = orderData.data;
      const orderItems = order.orderItems || [];
      
      // Format cart items for tracking
      const cartItems = orderItems.map((item: any) => ({
        productId: item.productId || item.id,
        price: item.price || 0,
        quantity: item.quantity || 1,
        discountAmmount: item.discountAmount || item.discountAmmount || 0,
        color: item.color,
        size: item.size,
        product: item.product,
      }));

      trackPurchase(
        order.orderId || order.id || orderId,
        cartItems,
        productsData.data.data,
        {
          value: order.totalAmount || 0,
          tax: 0, // Add tax if available
          shipping: order.shippingCharge || 0,
          coupon: order.coupon?.code || "",
        }
      );
    }
  }, [orderData, orderId, productsData]);

  return (
    <div>
      <TrackAnimation />
    </div>
  );
};

export default ThankYouPage;
