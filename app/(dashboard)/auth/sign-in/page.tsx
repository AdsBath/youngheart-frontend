import AdminSignInFrom from "@/components/auth/admin-sign-in-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Dashboard",
  description: "Sign in to your account",
};

export default function SignIn2() {
  return (
    <>
      <AdminSignInFrom />
    </>
  );
}
