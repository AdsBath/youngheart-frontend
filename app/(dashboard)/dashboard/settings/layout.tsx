"use client";
import { Layout, LayoutBody, LayoutHeader } from "@/components/custom/layout";
import { ThemeSwitch } from "@/components/theme-switch";
import { UserNav } from "@/components/user-nav";
import { Separator } from "@radix-ui/react-dropdown-menu";
import {
  IconBrowserCheck,
  IconExclamationCircle,
  IconNotification,
  IconPalette,
  IconTool,
  IconUser,
} from "@tabler/icons-react";

import SidebarNav from "./components/sidebar-nav";
import Search from "@/components/search";
import { NotificationShow } from "@/components/dashboard/notification-show";

export default function SettingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Layout fadedBelow fixedHeight>
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        {/* <Search /> */}
        <div className="ml-auto flex items-center space-x-4">
          <NotificationShow />
           {/* */}
          <UserNav />
        </div>
      </LayoutHeader>

      <LayoutBody className="flex flex-col" fixedHeight>
        <div className="space-y-0.5">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-1 flex-col space-y-8 overflow-auto lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="sticky top-0 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="w-full p-1 pr-4 lg:max-w-xl">
            <div className="pb-16">{children}</div>
          </div>
        </div>
      </LayoutBody>
    </Layout>
  );
}

const sidebarNavItems = [
  {
    title: "Profile",
    icon: <IconUser size={18} />,
    href: "/dashboard/settings/profile",
  },
  {
    title: "Account",
    icon: <IconTool size={18} />,
    href: "/dashboard/settings/account",
  },
  {
    title: "Appearance",
    icon: <IconPalette size={18} />,
    href: "/dashboard/settings/appearance",
  },
  {
    title: "Notifications",
    icon: <IconNotification size={18} />,
    href: "/dashboard/settings/notifications",
  },
  {
    title: "Display",
    icon: <IconBrowserCheck size={18} />,
    href: "/dashboard/settings/display",
  },
  {
    title: "Error Example",
    icon: <IconExclamationCircle size={18} />,
    href: "/dashboard/settings/error-example",
  },
];
