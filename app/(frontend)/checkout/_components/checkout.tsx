"use client";

import CheckoutForm from "@/components/frontend/checkout/checkoutForm";
import Loading from "@/components/loding";
import { AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAddressQuery } from "@/redux/api/addressApi";
import { useShippingRulesQuery } from "@/redux/api/shippingRulesApi";
import { useUserBySessionIdQuery } from "@/redux/api/userApi";
import { Terminal } from "lucide-react";
import Link from "next/link";
import { useCookies } from "react-cookie";

const Checkout = () => {
  const [cookie] = useCookies(["sessionId"]);
  const { data: sessionData, isLoading: isLoadingSession } =
    useUserBySessionIdQuery({ id: cookie.sessionId });
  const { data: addressData, isLoading: isAddressLoading } = useAddressQuery(
    sessionData?.data?.id
  );

  const { data: shippingRulesData, isLoading: isShippingRulesLoading } =
    useShippingRulesQuery({});

  return (
    <div className="bg-[#F6F6F6]">
      <section className="m-2 sm:container">
        {/* 1 Shopping Cart ------------ 2 Shipping and Checkout ------------ 2 Confirmation */}

        <div className="pt-8 pb-2 flex justify-center items-center w-full flex-wrap sm:flex-nowrap">
          {/* Step 1 */}
          <div className="flex-1 border-t-2 border-red-300 mr-2"></div>
          <div className="flex justify-center items-center relative">
            <div className="w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center bg-brand text-white rounded-full">
              <span className="leading-none">1</span>
            </div>
            <span className="text-[10px] sm:text-sm font-bold absolute bottom-10 w-[80px] text-center sm:w-[100px] text-brand -right-[20px] sm:-right-[35px]">
              Shopping Cart
            </span>
          </div>

          {/* Separator */}
          <div className="flex-1 border-t-2 border-red-300 mx-2 sm:mx-4"></div>

          {/* Step 2 */}
          <div className="flex justify-center items-center relative">
            <div className="w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center bg-red-500 text-white rounded-full">
              <span className="leading-none">2</span>
            </div>
            <span className="text-[10px] sm:text-sm font-bold absolute bottom-10 w-[140px] text-center sm:w-[200px] text-red-500 -right-[55px] sm:-right-[105px]">
              Shipping and Checkout
            </span>
          </div>

          {/* Separator */}
          <div className="flex-1 border-t-2 border-red-300 mx-2 sm:mx-4"></div>

          {/* Step 3 */}
          <div className="flex justify-center items-center relative">
            <div className="w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center bg-gray-200 text-gray-500 rounded-full">
              <span className="leading-none">3</span>
            </div>
            <span className="text-[10px] sm:text-sm absolute text-gray-500 bottom-10 w-[80px] text-center sm:w-auto -right-[20px] sm:-right-[25px]">
              Confirmation
            </span>
          </div>
          <div className="flex-1 border-t-2 border-gray-300 mx-2 sm:mx-4"></div>
        </div>

        {/* Alert Returning customer? Click here to login  */}
        {!sessionData?.data?.isUser && (
          <div className="h-auto border rounded-sm bg-[#fca5a5] p-3 sm:p-6 text-white my-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start sm:items-center gap-2">
                <Terminal size={24} />
                <div className="flex flex-col">
                  <AlertTitle className="text-xs sm:text-sm">
                    Returning customer? Click here to login
                  </AlertTitle>
                  <AlertDescription className="text-[10px] sm:text-xs">
                    If you have shopped with us before, please enter your
                    details in the boxes below. If you are a new customer,
                    please proceed to the Billing & Shipping section.
                  </AlertDescription>
                </div>
              </div>
              <div className="text-xs sm:text-sm font-semibold cursor-pointer">
                <Link href="/my-account">Login</Link>
              </div>
            </div>
          </div>
        )}

        {/* checkout form */}
        {isLoadingSession || isAddressLoading || isShippingRulesLoading ? (
          <div className="h-screen">
            <Loading />
          </div>
        ) : (
          <CheckoutForm
            sessionData={sessionData}
            addressData={addressData}
            shippingRulesData={shippingRulesData?.data?.data}
          />
        )}
      </section>
    </div>
  );
};

export default Checkout;
