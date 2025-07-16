"use client";
import Breadcrumbs from "@/components/breadcrumb";
import Loading from "@/components/loding";
import { useAddressQuery } from "@/redux/api/addressApi";
import { useUserBySessionIdQuery } from "@/redux/api/userApi";
import { useCookies } from "react-cookie";
import AddressForm from "./_components/address-form";

const Addresses = () => {
  const [cookie] = useCookies(["sessionId"]);
  const { data: sessionData, isLoading: isLoadingSession } =
    useUserBySessionIdQuery({ id: cookie.sessionId });
  const { data: addressData, isLoading: isAddressLoading } = useAddressQuery(
    sessionData?.data?.id
  );
  return (
    <>
      <section className="bg-white h-10 mb-3 flex items-center px-4">
        <Breadcrumbs
          items={[
            { label: "My Account", href: `/my-account` },
            { label: "Addresses" },
          ]}
          className=""
        />
      </section>
      <section className="flex flex-col gap-4 px-2 bg-white relative">
        <div className="flex flex-col gap-2 px-4">
          <h2 className="text-lg font-semibold mt-3">Your Address</h2>
          <p className="text-sm font-semibold">
            You have not set up this type of address yet.
          </p>
        </div>
        <hr />
        {isLoadingSession || isAddressLoading ? (
          <div className="h-screen">
            <Loading />
          </div>
        ) : (
          <AddressForm addressData={addressData} sessionData={sessionData} />
        )}
      </section>
    </>
  );
};

export default Addresses;
