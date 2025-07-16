"use client";

import AppShell from "@/components/app-shell-layout";
import Loading from "@/components/loding";
import { useAdmin } from "@/context/AdminContext";
import { SheetProvider } from "@/lib/sheet-provider";
import { Role } from "@/types";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
    const socket = new WebSocket("wss://babu-bangla-server-seven.vercel.app/");

    const audio = new Audio("/audio/notification.wav");

    socket.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    socket.onmessage = (event) => {
      const notification = JSON.parse(event.data);

      if (notification.type === "orderCreated") {
        // Display the real-time notification
        audio.play();

        toast.success("order created", {
          description: `Order #${notification.orderId} has been created successfully!`,
        });
        // Optionally update your state or UI to reflect the new notification
      }
    };

    socket.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    return () => socket.close();
  }, []);

  const { user, loading } = useAdmin();
  if (!user && loading) return <Loading />;
  if (
    !user &&
    !loading &&
    !(
      user?.role === Role.ADMIN ||
      user?.role === Role.SUPER_ADMIN ||
      user?.role === Role.EMPLOYEE ||
      user?.role === Role.MANAGER ||
      user?.role === Role.USER ||
      user?.role === Role.GUEST
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
