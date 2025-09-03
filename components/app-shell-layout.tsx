"use client";
import useIsCollapsed from "@/hooks/use-is-collapsed";
import { useEffect, useState } from "react";
import Sidebar from "./sidebar";

export default function AppShell({
  role,
  children,
}: Readonly<{ children: React.ReactNode; role: any }>) {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed();

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) {
    return null;
  }

  return (
    <div className="relative h-full bg-background">
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        role={role}
      />
      <main
        id="content"
        className={`transition-[margin] md:pt-0 ${isCollapsed ? "md:ml-14" : "md:ml-64"
          } h-full`}
      >
        {children}
      </main>
    </div>
  );
}
