"use client";

import AppShell from "@/components/app-shell-layout";
import Loading from "@/components/loding";
import { useAdmin } from "@/context/AdminContext";
import { SheetProvider } from "@/lib/sheet-provider";
import { Role } from "@/types";
import { redirect } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { user, loading } = useAdmin();
  if (!user && loading) return <Loading />;
  if (
    !user &&
    !loading &&
    !(
      user?.role === Role.ADMIN ||
      user?.role === Role.SUPER_ADMIN ||
      user?.role === Role.EMPLOYEE ||
      user?.role === Role.MANAGER
    )
  ) {
    return redirect("/auth/sign-in");
  }

  return (
    <AppShell role={user?.role}>
      <SheetProvider />
      {children}
    </AppShell>
  );
}
