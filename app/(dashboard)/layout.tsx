import { ThemeProvider } from "@/lib/theme-provider";
import AdminProvider from "@/provider/AdminProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Dashboard",
  description: "Admin Dashboard",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <AdminProvider>{children}</AdminProvider>
    </ThemeProvider>
  );
}
