"use client";

import { Button } from "@/components/custom/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useGetAllNotificationQuery,
  useMarkAsReadMutation,
} from "@/redux/api/notificationApi";
import { IconBell } from "@tabler/icons-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatTimeDifference } from "@/utils/formatTimeDifference";
import Link from "next/link";

import Loading from "../loding";
import { ScrollArea } from "../ui/scroll-area";

export function NotificationShow() {
  const { data, isLoading } = useGetAllNotificationQuery({});
  const [markAsRead] = useMarkAsReadMutation();

  const handleMarkAsRead = async () => {
    try {
      await markAsRead({});
    } catch (error) {
      console.error("markAsRead error:", error);
    }
  };

  return (
    <DropdownMenu onOpenChange={(open) => open && handleMarkAsRead()}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <IconBell className="h-[1.2rem] w-[1.2rem] transition-all" />
          <span className="sr-only">Toggle bell</span>
          {!isLoading &&
            data?.data?.filter((item: any) => !item?.read)?.length > 0 && (
              <span className="absolute -top-2 -right-3 w-7 h-7 rounded-full flex items-center justify-center bg-red-500 text-white bg-opacity-80">
                {data?.data?.filter((item: any) => !item?.read)?.length}
              </span>
            )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="scroll p-0">
        {isLoading ? (
          <DropdownMenuItem className="h-[500px]">
            <Loading />
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem className="p-0">
            <Card className={cn("w-[400px] border-none shadow-none p-0  ")}>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  You have{" "}
                  {data?.data?.filter((item: any) => !item?.read)?.length}{" "}
                  unread messages.
                </CardDescription>
              </CardHeader>
              <ScrollArea className="h-[500px]">
                <CardContent className="grid gap-3 h-[500px]  pb-0 px-2">
                  {data?.data?.map((order: any, index: number) => (
                    <Link
                      href="/dashboard/order"
                      key={index}
                      className="py-1 rounded grid grid-cols-[25px_1fr] items-start last:mb-0 last:pb-0 hover:bg-zinc-300 dark:hover:bg-slate-600 cursor-pointer px-2"
                    >
                      {!order?.read && (
                        <span className="flex h-1 w-1 translate-y-1 rounded-full bg-green-500" />
                      )}
                      <div className="space-y-1 flex gap-2 items-start">
                        <Avatar>
                          <AvatarImage
                            src={order?.user?.image || ""}
                            alt={order?.user?.firstName}
                          />
                          <AvatarFallback>
                            {order?.user?.firstName?.charAt(0) +
                              order?.user?.lastName?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium">
                            {order?.user?.firstName +
                              " " +
                              order?.user?.lastName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {order?.user?.email}
                          </p>
                          <span className="space-x-2 mt-1 w-full font-normal">
                            OrderId:{" "}
                            <span className="font-semibold">
                              {" "}
                              {order?.order?.orderId}
                            </span>
                            <span>৳{order?.order?.totalAmount}</span>
                          </span>
                          <p className="mt-2">
                            {formatTimeDifference(order?.createdAt)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </ScrollArea>
            </Card>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
