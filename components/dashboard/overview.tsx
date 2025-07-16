"use client";
import { useOrderOverviewQuery } from "@/redux/api/orderApi";
import { useUsersQuery } from "@/redux/api/userApi";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { thousandSeparator } from "@/utils/thousandSeparator";
import { SaleAndRevenueChart } from "./sale-and-revenue-chart";
import { RecentSales } from "./recent-sales";
import MonthChartSkeleton from "../custom/month-chart-skeleton";

const Overview = () => {
  const { data, isLoading } = useUsersQuery({});
  const { data: orderOverview, isLoading: orderOverviewLoading } =
    useOrderOverviewQuery({});
  return (
    <div className="space-y-4">
      <div className="flex gap-4 flex-wrap">
        <Card className="flex-1 flex-shrink basis-[250px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Product</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            {orderOverviewLoading ? (
              <p className="text-sm text-slate-950 dark:text-gray-400 ml-[2px]">
                <span className="animate-pulse">.</span>
                <span className="animate-ping">.</span>
                <span className="animate-ping">.</span>
              </p>
            ) : (
              <div className="text-2xl font-bold">
                {orderOverview?.data?.totalProduct}
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="flex-1 flex-shrink basis-[250px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total user</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-sm text-slate-950 dark:text-gray-400 ml-[2px]">
                <span className="animate-pulse">.</span>
                <span className="animate-ping">.</span>
                <span className="animate-ping">.</span>
              </p>
            ) : (
              <div className="text-2xl font-bold">{data?.data?.total}</div>
            )}
            {/* <p className="text-xs text-muted-foreground">
                    +180.1% from last month
                  </p> */}
          </CardContent>
        </Card>
        <Card className="flex-1 flex-shrink basis-[250px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            {orderOverviewLoading ? (
              <p className="text-sm text-slate-950 dark:text-gray-400 ml-[2px]">
                <span className="animate-pulse">.</span>
                <span className="animate-ping">.</span>
                <span className="animate-ping">.</span>
              </p>
            ) : (
              <div className="text-2xl font-bold">
                {orderOverview?.data?.total}
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="flex-1 flex-shrink basis-[250px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today&apos;s Sales
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            {orderOverviewLoading ? (
              <p className="text-sm text-slate-950 dark:text-gray-400 ml-[2px]">
                <span className="animate-pulse">.</span>
                <span className="animate-ping">.</span>
                <span className="animate-ping">.</span>
              </p>
            ) : (
              <div className="text-2xl font-bold">
                {orderOverview?.data?.todayTotal}
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="flex-1 flex-shrink basis-[250px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today&apos;s Revenue
            </CardTitle>
            ৳
          </CardHeader>
          <CardContent>
            {orderOverviewLoading ? (
              <p className="text-sm text-slate-950 dark:text-gray-400 ml-[2px]">
                <span className="animate-pulse">.</span>
                <span className="animate-ping">.</span>
                <span className="animate-ping">.</span>
              </p>
            ) : (
              <div className="text-2xl font-bold">
                ৳{thousandSeparator(orderOverview?.data?.todayAmount)}
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="flex-1 flex-shrink basis-[250px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            ৳
          </CardHeader>
          <CardContent>
            {orderOverviewLoading ? (
              <p className="text-sm text-slate-950 dark:text-gray-400 ml-[2px]">
                <span className="animate-pulse">.</span>
                <span className="animate-ping">.</span>
                <span className="animate-ping">.</span>
              </p>
            ) : (
              <div className="text-2xl font-bold">
                ৳{thousandSeparator(orderOverview?.data?.totalAmount)}
              </div>
            )}
            {/* <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p> */}
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
        <div className="col-span-1 lg:col-span-4">
          {orderOverviewLoading ? (
            <MonthChartSkeleton />
          ) : (
            <SaleAndRevenueChart chartData={orderOverview?.data?.chartData} />
          )}
        </div>
        <div className="col-span-1 lg:col-span-3 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-[10px] scrollbar-thumb-gray-800 scrollbar-track-gray-300">
          <Card>
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
              <CardDescription>You made 265 sales this month.</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentSales
                isLoading={orderOverviewLoading}
                recentOrders={orderOverview?.data?.recentOrders}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Overview;
