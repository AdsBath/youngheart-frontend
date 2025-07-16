"use client";
import Breadcrumbs from "@/components/breadcrumb";
import Loading from "@/components/loding";
import { useUserBySessionIdQuery } from "@/redux/api/userApi";
import { useCookies } from "react-cookie";
import AccountDetailsForm from "./_components/account-details-form";
import { ChangePasswordForm } from "./_components/change-password-form";
import { SetPasswordForm } from "./_components/set-password";

const AccountDetails = () => {
  const [cookie] = useCookies(["sessionId"]);
  const { data: sessionData, isLoading: isLoadingSession } =
    useUserBySessionIdQuery({ id: cookie.sessionId || "" });
  // console.log(sessionData?.data?.setPassword, "user find");
  return (
    <>
      <section className="bg-white h-10 mb-3 flex items-center px-4 rounded shadow">
        <Breadcrumbs
          items={[
            { label: "My Account", href: `/my-account` },
            { label: "Account Details" },
          ]}
          className=""
        />
      </section>
      <section className="flex flex-col gap-4 px-2 bg-white rounded shadow">
        <div className="flex flex-col gap-2 px-4 mt-4">
          <div className="text-lg font-semibold">Account details</div>
          <div className="text-sm font-semibold">Edit your account details</div>
        </div>
        <hr />

        {isLoadingSession ? (
          <div className="h-screen">
            <Loading />
          </div>
        ) : (
          <AccountDetailsForm sessionData={sessionData} />
        )}

        {sessionData?.data?.setPassword ? (
          <div className="flex flex-col gap-2 px-4 mt-4">
            <div className="text-lg font-semibold">Set Password</div>
            <div className="text-sm font-semibold">
              You need secure your site
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2 px-4 mt-4">
            <div className="text-lg font-semibold">Change Password</div>
            <div className="text-sm font-semibold">
              Edit your account details
            </div>
          </div>
        )}
        <hr />

        {isLoadingSession ? (
          <div className="h-screen">
            <Loading />
          </div>
        ) : (
          <>
            {sessionData?.data?.setPassword ? (
              <SetPasswordForm sessionData={sessionData} />
            ) : (
              <ChangePasswordForm sessionData={sessionData} />
            )}
          </>
        )}
      </section>
    </>
  );
};

export default AccountDetails;
