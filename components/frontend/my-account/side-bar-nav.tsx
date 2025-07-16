"use client";

import { buttonVariants } from "@/components/custom/button";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useLogoutMutation } from "@/redux/api/authApi";
import { IconLogout } from "@tabler/icons-react";
import { format } from "date-fns";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    icon?: React.ReactNode;
  }[];
}

export default function SidebarNav({
  className,
  items,
  ...props
}: SidebarNavProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [cookies, setCookie, removeCookie] = useCookies([
    "refreshToken",
    "sessionId",
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [val, setVal] = useState(pathname ?? "/settings");

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    console.log({
      refreshToken: cookies.refreshToken,
    });
    setIsLoading(true);
    const result: any = await logout({});
    if (result?.data?.success) {
      removeCookie("refreshToken", { path: "/" }); // Ensure the path matches where the cookie was set
      removeCookie("sessionId", { path: "/" });
      toast({
        title: result?.data?.message ?? "Logout successfully 🎉",
        description: format(new Date(), "EEEE, MMMM dd, yyyy 'at' hh:mm a"),
      });
      setIsLoading(false);
      window.location.replace("/my-account");
    } else {
      toast({
        variant: "destructive",
        title: result.error || "An error occurred",
        description: "Please try again",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setVal(pathname);
  }, [pathname]);

  const handleSelect = (e: string) => {
    setVal(e);
    router.push(e);
  };

  return (
    <>
      <div className=" w-full bg-background py-2 ">
        <h2 className="text-sm font-bold text-black px-4 py-2 hidden md:flex">
          Account
        </h2>
        <nav
          className={cn(" md:flex flex-col lg:space-y-1 hidden ", className)}
          {...props}
        >
          {items?.map((item, i) => (
            <Link key={item.href} href={item.href} passHref>
              <span
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  pathname === item.href
                    ? "bg-muted hover:bg-muted border-l-4 border-[#fd384f] "
                    : "hover:bg-transparent hover:underline",
                  " w-full rounded-none flex justify-between items-center"
                )}
              >
                {item.title}
                {item.icon && <span className="ml-2 text-lg">{item.icon}</span>}
              </span>
            </Link>
          ))}
          <span
            onClick={handleLogout}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "w-full rounded-none flex justify-between items-center  hover:bg-transparent hover:underline cursor-pointer"
            )}
          >
            Log out
            <IconLogout size={18} />
          </span>
        </nav>
      </div>
    </>
  );
}
