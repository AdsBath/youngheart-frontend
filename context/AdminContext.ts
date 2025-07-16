import { createContext, useContext } from "react";

interface AdminContextType {
  user: any | null;
  loading: boolean;
}

export const AdminContext = createContext<AdminContextType | undefined>(
  undefined
);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
