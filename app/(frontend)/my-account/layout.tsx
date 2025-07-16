"use client";

import SidebarNav from "@/components/frontend/my-account/side-bar-nav";
import Loading from "@/components/loding";
import { useAuth } from "@/context/AuthContext";
import { Role } from "@/types";
import {
  IconAddressBook,
  IconHeartBroken,
  IconLayout,
  IconMenuOrder,
  IconUserCircle,
} from "@tabler/icons-react";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function AccountLayout({ children }: Readonly<RootLayoutProps>) {
  const sidebarNavItems = [
    {
      title: "Overview",
      icon: <IconLayout size={18} />,
      href: `/my-account`,
    },
    {
      title: "Orders",
      icon: <IconMenuOrder size={18} />,
      href: `/my-account/orders`,
    },
    {
      title: "Address",
      icon: <IconAddressBook size={18} />,
      href: `/my-account/addresses`,
    },
    {
      title: "Account details",
      icon: <IconUserCircle size={18} />,
      href: `/my-account/account-details`,
    },
    {
      title: "My wishlist",
      icon: <IconHeartBroken size={18} />,
      href: `/my-account/my-wishlist`,
    },
  ];
  const { user, loading } = useAuth();

  return (
    <div className="md:container mx-auto px-2 flex w-full py-5 lg:flex-row flex-col gap-5">
      {(user?.role === Role.USER || user?.role === Role.GUEST) && (
        <aside className="sticky top-20 md:w-[150px] lg:w-[300px] h-full hidden lg:block">
          {loading ? <Loading /> : <SidebarNav items={sidebarNavItems} />}
        </aside>
      )}
      <div className="flex-1 md:ml-5 min-h-[50vh]">
        <div className="pb-16">{children}</div>
      </div>
    </div>
  );
}
