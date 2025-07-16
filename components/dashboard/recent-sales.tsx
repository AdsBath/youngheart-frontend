import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "../ui/skeleton";

export function RecentSales({
    isLoading,
    recentOrders,
}: {
    isLoading: boolean;
    recentOrders: any;
}) {
    return (
        <div className="space-y-8">
            {isLoading
                ? [...Array(4)]?.map((_, index) => (
                      <div className="flex items-center" key={index}>
                          <Skeleton className="h-10 w-10 rounded-full" />
                          <div className="ml-4 space-y-1">
                              <Skeleton className="h-5 w-[150px]" />
                              <Skeleton className="h-4 w-[170px]" />
                          </div>
                          <div className="ml-auto">
                              <Skeleton className="h-4 w-[80px]" />
                          </div>
                      </div>
                  ))
                : recentOrders?.map((order: any, index: number) => (
                      <div key={index} className="flex items-center">
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
                          <div className="ml-4 space-y-1">
                              <p className="text-sm font-medium leading-none">
                                  {order?.user?.firstName +
                                      " " +
                                      order?.user?.lastName}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                  {order?.user?.email}
                              </p>
                          </div>
                          <div className="ml-auto font-medium">
                              ৳{order?.totalAmount}
                          </div>
                      </div>
                  ))}
        </div>
    );
}
