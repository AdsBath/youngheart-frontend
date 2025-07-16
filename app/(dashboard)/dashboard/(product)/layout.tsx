import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Products",
  description: "Manage Products Page Description",
};

export default function ProductsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      {/* <SheetProvider /> */}
      {children}
    </div>
  );
}
