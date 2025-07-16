"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  useGetDailyDataForMonthQuery,
  useOrderAnalyticsQuery,
} from "@/redux/api/orderApi";
import { MonthlyRevenueChart } from "./monthly-revenue-chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getLast12Months, MonthYear } from "@/utils/getLast12Months";
import YearChartSkeleton from "../custom/year-chart-skeleton";

const Analytics = () => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const [month, setMonth] = useState<number>(1);
  const [year, setYear] = useState<number>(2024);
  const last12Months: MonthYear[] = getLast12Months();
  const [selectedMonth, setSelectedMonth] = useState<string>(
    `${currentMonth},${currentYear}`
  );
  const [selectedValue, setSelectedValue] = useState<string>(`all`);

  const {
    data: orderAnalytics,
    isLoading: orderAnalyticsLoading,
    isFetching,
  } = useOrderAnalyticsQuery({ value: selectedValue });
  const { data: dailyData, isLoading: dailyDataLoading } =
    useGetDailyDataForMonthQuery({ year, month });
  //   console.log(orderAnalytics, "oder analytics data");
  useEffect(() => {
    if (selectedMonth) {
      const [month, year] = selectedMonth.split(",");
      setMonth(Number(month));
      setYear(Number(year));
      // console.log(`Selected Month: ${month}, Year: ${year}`);
      // Perform your data fetching or filtering here
    }
  }, [selectedMonth]);
  // console.log(dailyData, "daily data");
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center border rounded-md px-5 py-1">
        <h3 className="font-semibold">Order statistics</h3>
        <Select
          value={selectedValue}
          onValueChange={(value) => setSelectedValue(value)}
        >
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select any value" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="last_week">Last week</SelectItem>
            <SelectItem value="last_month">Last month</SelectItem>
            <SelectItem value="last_year">Last year</SelectItem>
            <SelectItem value="all">All</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-4 flex-wrap">
        <Card className="flex-1 flex-shrink basis-[250px] max-w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Order cancelled
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
            {orderAnalyticsLoading || isFetching ? (
              <p className="text-sm text-slate-950 dark:text-gray-400 ml-[2px]">
                <span className="animate-pulse">.</span>
                <span className="animate-ping">.</span>
                <span className="animate-ping">.</span>
              </p>
            ) : (
              <div className="text-2xl font-bold">
                {orderAnalytics?.data?.orderCancelled}
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="flex-1 flex-shrink basis-[250px] max-w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending orders
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
            {orderAnalyticsLoading || isFetching ? (
              <p className="text-sm text-slate-950 dark:text-gray-400 ml-[2px]">
                <span className="animate-pulse">.</span>
                <span className="animate-ping">.</span>
                <span className="animate-ping">.</span>
              </p>
            ) : (
              <div className="text-2xl font-bold">
                {orderAnalytics?.data?.orderPending}
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="flex-1 flex-shrink basis-[250px] max-w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Confirmed Orders
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
            {orderAnalyticsLoading || isFetching ? (
              <p className="text-sm text-slate-950 dark:text-gray-400 ml-[2px]">
                <span className="animate-pulse">.</span>
                <span className="animate-ping">.</span>
                <span className="animate-ping">.</span>
              </p>
            ) : (
              <div className="text-2xl font-bold">
                {orderAnalytics?.data?.orderConfirmed}
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="flex-1 flex-shrink basis-[250px] max-w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On the way</CardTitle>
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
            {orderAnalyticsLoading || isFetching ? (
              <p className="text-sm text-slate-950 dark:text-gray-400 ml-[2px]">
                <span className="animate-pulse">.</span>
                <span className="animate-ping">.</span>
                <span className="animate-ping">.</span>
              </p>
            ) : (
              <div className="text-2xl font-bold">
                {orderAnalytics?.data?.orderPacking}
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="flex-1 flex-shrink basis-[250px] max-w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivered</CardTitle>
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
            {orderAnalyticsLoading || isFetching ? (
              <p className="text-sm text-slate-950 dark:text-gray-400 ml-[2px]">
                <span className="animate-pulse">.</span>
                <span className="animate-ping">.</span>
                <span className="animate-ping">.</span>
              </p>
            ) : (
              <div className="text-2xl font-bold">
                {orderAnalytics?.data?.orderDelivered}
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="flex-1 flex-shrink basis-[250px] max-w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exchange</CardTitle>
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
            {orderAnalyticsLoading || isFetching ? (
              <p className="text-sm text-slate-950 dark:text-gray-400 ml-[2px]">
                <span className="animate-pulse">.</span>
                <span className="animate-ping">.</span>
                <span className="animate-ping">.</span>
              </p>
            ) : (
              <div className="text-2xl font-bold">
                {orderAnalytics?.data?.orderExchange}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between items-center border rounded-md px-5 py-1">
        <h3 className="font-semibold">Monthly Sales & Revenue</h3>
        <Select
          value={selectedMonth}
          onValueChange={(value) => setSelectedMonth(value)}
        >
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a month" />
          </SelectTrigger>
          <SelectContent>
            {last12Months?.map(({ month, year }) => (
              <SelectItem key={`${month},${year}`} value={`${month},${year}`}>
                {new Date(year, month - 1).toLocaleString("default", {
                  month: "long",
                })}
                , {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        {dailyDataLoading ? (
          <YearChartSkeleton />
        ) : (
          <MonthlyRevenueChart chartData={dailyData?.data?.chartData} />
        )}
      </div>
    </div>
  );
};

export default Analytics;
