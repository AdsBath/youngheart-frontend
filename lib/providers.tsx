"use client";
import NextTopLoader from "nextjs-toploader";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";

import { Toaster } from "@/components/ui/toaster";

import { store } from "@/redux/store";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Provider store={store}>
      <Toaster />
      <NextTopLoader />
      {children}
    </Provider>
  );
};

export default Providers;
