import { Layout, LayoutBody, LayoutHeader } from "@/components/custom/layout";
import { TopNav } from "@/components/top-nav";
import dynamic from "next/dynamic";
import DashboardTabs from "./dashboard-tabs";

// Dynamic imports to reduce initial JS bundle & speed up first paint
const NotificationShow = dynamic(
  () =>
    import("@/components/dashboard/notification-show").then(
      (m) => m.NotificationShow
    ),
  {
    loading: () => (
      <div className="h-6 w-6 animate-pulse rounded bg-muted/40" aria-hidden />
    ),
  }
);

const UserNav = dynamic(
  () => import("@/components/user-nav").then((m) => m.UserNav),
  {
    loading: () => (
      <div
        className="h-8 w-8 rounded-full bg-muted/40 animate-pulse"
        aria-hidden
      />
    ),
  }
);

// Categories not critical for first paint -> load after hydration (ssr:false)
const CategoryApia = dynamic(
  () => import("@/components/api/catagory").then((m) => m.CategoryApia),
  {
    ssr: false,
    loading: () => (
      <div className="px-4 py-2 text-xs text-muted-foreground">Loading categories…</div>
    ),
  }
);

export default function Dashboard() {
  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        <TopNav links={topNav} />
        <div className="ml-auto flex items-center space-x-4">
          {/* <Search /> */}
          {/* <SearchComponent /> */}
          <NotificationShow />
          <UserNav />
        </div>
      </LayoutHeader>
      <CategoryApia />
      {/* ===== Main ===== */}
      <LayoutBody className="space-y-4">
        {/* Lazy + on-demand mounted tabs (see DashboardTabs.tsx) */}
        <DashboardTabs />
      </LayoutBody>
    </Layout>
  );
}

const topNav = [
  {
    title: "Overview",
    href: "dashboard",
    isActive: true,
  },
  {
    title: "Customers",
    href: "dashboard/registered-customer",
    isActive: false,
  },
  {
    title: "Products",
    href: "dashboard/products",
    isActive: false,
  },
  {
    title: "Settings",
    href: "dashboard/settings",
    isActive: false,
  },
];
