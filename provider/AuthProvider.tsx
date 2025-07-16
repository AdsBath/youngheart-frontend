"use client";

import { AuthContext } from "@/context/AuthContext";
import { useGetMeQuery } from "@/redux/api/userApi";
import { ReactNode, useEffect, useState } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { data, isLoading } = useGetMeQuery(undefined);
  useEffect(() => {
    if (data?.statusCode === 200 && data?.success) {
      setUser(data?.data);
    }

    if (!isLoading) {
      setLoading(false);
    }
  }, [data, isLoading]);
  const authInfo: any | null = {
    user,
    loading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
