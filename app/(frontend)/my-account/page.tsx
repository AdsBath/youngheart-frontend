"use client";
import { FronLoginForm } from "@/components/frontend/auth/fron-login-form";
import { FronRegisterForm } from "@/components/frontend/auth/fron-register-form";
import MyAccountPage from "@/components/frontend/my-account/my-account-page";
import Loading from "@/components/loding";
import { useAuth } from "@/context/AuthContext";

const MyAccount = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {user ? (
        <MyAccountPage profile={user} />
      ) : (
        <section className="flex flex-col lg:flex-row lg:gap-32 py-20">
          {/* Login */}
          <div className="lg:w-[40%] ">
            <h2 className="text-2xl font-semibold text-start mb-6">Login</h2>
            <FronLoginForm />
          </div>
          {/* Register */}
          <div className="lg:w-[60%] ">
            <h2 className="text-2xl font-semibold text-start mb-6">Register</h2>
            <FronRegisterForm />
          </div>
        </section>
      )}
    </>
  );
};

export default MyAccount;
