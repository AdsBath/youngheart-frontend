"use client";

import { AdminContext } from "@/context/AdminContext";
import { useAdminProfileQuery } from "@/redux/api/userApi";
import { ReactNode, useEffect, useState } from "react";

interface AdminProviderProps {
  children: ReactNode;
}

const AdminProvider = ({ children }: AdminProviderProps) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { data, isLoading } = useAdminProfileQuery(undefined, {
    refetchOnMountOrArgChange: 30,
  });
  useEffect(() => {
    if (data?.statusCode === 200 && data?.success) {
      setUser(data.data);
    }
    // Set loading to false after the query is done, regardless of success or error
    if (!isLoading) {
      setLoading(false);
    }
  }, [data, isLoading]);
  const authInfo: any | null = {
    user,
    loading,
  };
  return (
    <AdminContext.Provider value={authInfo}>{children}</AdminContext.Provider>
  );
};

export default AdminProvider;
