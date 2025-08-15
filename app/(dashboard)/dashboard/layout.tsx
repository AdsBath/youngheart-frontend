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
    let socket: WebSocket;
    let retryCount = 0;
    const maxRetries = 3;

    const connectWebSocket = () => {
      // Use environment-based WebSocket URL
      const wsUrl = process.env.API_WEB_SOCKET_URL || "ws://localhost:5000";

      console.warn("Attempting WebSocket connection to:", wsUrl);

      socket = new WebSocket(wsUrl);

      const audio = new Audio("/audio/notification.wav");

      socket.onopen = () => {
        console.warn("Connected to WebSocket server");
        retryCount = 0; // Reset retry count on successful connection
      };

      socket.onmessage = (event) => {
        try {
          const notification = JSON.parse(event.data);
          console.warn("WebSocket message received:", notification);

          if (notification.type === "connectionTest") {
            console.warn(
              "WebSocket connection test successful:",
              notification.message
            );
            toast.success("WebSocket Connected", {
              description: "Real-time notifications are now active",
            });
          } else if (notification.type === "orderCreated") {
            // Display the real-time notification
            audio
              .play()
              .catch((err) => console.warn("Audio play failed:", err));

            toast.success("Order Created", {
              description: `Order #${notification.orderId} has been created successfully!`,
            });
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      socket.onclose = () => {
        console.log("Disconnected from WebSocket server");

        // Retry connection if not at max retries
        if (retryCount < maxRetries) {
          retryCount++;
          console.log(
            `Retrying WebSocket connection (${retryCount}/${maxRetries})...`
          );
          setTimeout(connectWebSocket, 2000); // Retry after 2 seconds
        } else {
          console.log("Max WebSocket retry attempts reached");
          toast.error("WebSocket connection failed", {
            description:
              "Unable to establish real-time notifications after multiple attempts",
          });
        }
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    };

    // Initial connection
    connectWebSocket();

    return () => {
      if (socket) {
        socket.close();
      }
    };
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
