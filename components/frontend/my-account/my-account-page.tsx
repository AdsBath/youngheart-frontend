"use client";

import OrderCard from "@/app/(frontend)/my-account/orders/_components/order-card";
import Breadcrumbs from "@/components/breadcrumb";
import BlurImg from "@/components/custom/blur-img";
import { toast } from "@/components/ui/use-toast";
import { useLogoutMutation } from "@/redux/api/authApi";
import { useMyWishlistQuery } from "@/redux/api/wishlistApi";
import { IconAddressBook, IconEdit, IconLogout } from "@tabler/icons-react";
import { format } from "date-fns";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useCookies } from "react-cookie";

interface MyAccountPageProps {
  profile?: any;
}

const MyAccountPage = ({ profile }: MyAccountPageProps) => {
  const { data, isLoading } = useMyWishlistQuery(profile?.id);
  const [cookies, setCookie, removeCookie] = useCookies([
    "refreshToken",
    "sessionId",
  ]);

  // Function to remove a cookie

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    const result: any = await logout({});
    if (result?.data?.success) {
      removeCookie("refreshToken", { path: "/" }); // Ensure the path matches where the cookie was set
      removeCookie("sessionId", { path: "/" });
      toast({
        title: result?.data?.message ?? "Logout successfully 🎉",
        description: format(new Date(), "EEEE, MMMM dd, yyyy 'at' hh:mm a"),
      });
      window.location.replace("/my-account");
    } else {
      toast({
        variant: "destructive",
        title: result.error || "An error occurred",
        description: "Please try again",
      });
    }
  };

  return (
    <>
      <section className="bg-white h-10 mb-3 flex items-center px-4 rounded">
        <Breadcrumbs
          items={[
            {
              label: "Home",
              href: `/`,
            },
            { label: "Overview", href: `/my-account` },
          ]}
        />
      </section>

      <section className="bg-white h-full p-4 mb-4 shadow-md relative rounded">
        <div className="absolute top-3 right-3 p-2 rounded-full cursor-pointer flex gap-5">
          <Link href={"/my-account/account-details"} className="bg-gray-100">
            <IconEdit size={20} />
          </Link>
          <button className="block lg:hidden" onClick={handleLogout}>
            <IconLogout className="text-red-500" />
          </button>
        </div>
        <div className="flex gap-3 items-center  ">
          <BlurImg
            src={profile?.image ? profile?.image : "/placeholder-user.png"}
            alt={profile?.firstName}
            className="rounded-full h-20 w-20"
          />
          <div>
            <h1 className="text-xl font-bold">
              {profile?.firstName + " " + profile?.lastName}
            </h1>
            <p className="text-sm text-gray-500 mt-2">Welcome back</p>
          </div>
        </div>
        <div className="flex gap-5 justify-around items-center py-5">
          <Link href="/my-account/orders" className="group">
            <h1 className="text-lg font-bold text-center">
              {profile?.orders?.length}
            </h1>
            <span className="group-hover:text-blue-500 transition-all duration-150 group-hover:underline">
              Orders
            </span>
          </Link>
          <Link
            href={"/my-account/my-wishlist"}
            className="cursor-pointer flex items-center justify-center flex-col gap-2 group"
          >
            <Heart color="red" size={25} />
            <span className="group-hover:text-blue-500 transition-all duration-150 group-hover:underline">
              Wishlist{" "}
              {isLoading ? "..." : "(" + data?.data?.data?.length + ")"}
            </span>
          </Link>

          <Link
            href="/my-account/addresses"
            className="flex items-center justify-center flex-col gap-2 group"
          >
            <IconAddressBook size={25} />
            <span className="group-hover:text-blue-500 transition-all duration-150 group-hover:underline">
              Address
            </span>
          </Link>
        </div>
      </section>

      <section className="bg-white h-full mb-4 p-4 shadow rounded">
        <OrderCard />
      </section>
    </>
  );
};

export default MyAccountPage;
