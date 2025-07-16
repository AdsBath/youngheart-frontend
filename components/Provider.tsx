"use client";
import React from "react";
import { SidebarProvider } from "./ui/sidebar";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return <SidebarProvider>{children}</SidebarProvider>;
};

export default Provider;
