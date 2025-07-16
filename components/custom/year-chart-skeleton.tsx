import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const YearChartSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="w-[100px] h-5" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="w-[120px] h-4" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between gap-5 min-h-[300px]">
          <div className="flex items-end gap-2">
            <Skeleton className="w-5 h-[200px]" />
            <Skeleton className="w-5 h-[300px]" />
          </div>
          <div className="flex items-end gap-2">
            <Skeleton className="w-5 h-[280px]" />
            <Skeleton className="w-5 h-[220px]" />
          </div>
          <div className="flex items-end  gap-2">
            <Skeleton className="w-5 h-[100px]" />
            <Skeleton className="w-5 h-[200px]" />
          </div>
          <div className="flex items-end  gap-2">
            <Skeleton className="w-5 h-[300px]" />
            <Skeleton className="w-5 h-[180px]" />
          </div>
          <div className="flex items-end  gap-2">
            <Skeleton className="w-5 h-[180px]" />
            <Skeleton className="w-5 h-[300px]" />
          </div>
          <div className="flex items-end  gap-2">
            <Skeleton className="w-5 h-[100px]" />
            <Skeleton className="w-5 h-[200px]" />
          </div>
          <div className="flex items-end  gap-2">
            <Skeleton className="w-5 h-[250px]" />
            <Skeleton className="w-5 h-[200px]" />
          </div>
          <div className="flex items-end  gap-2">
            <Skeleton className="w-5 h-[50px]" />
            <Skeleton className="w-5 h-[300px]" />
          </div>
          <div className="flex items-end  gap-2">
            <Skeleton className="w-5 h-[100px]" />
            <Skeleton className="w-5 h-[50px]" />
          </div>
          <div className="flex items-end  gap-2">
            <Skeleton className="w-5 h-[300px]" />
            <Skeleton className="w-5 h-[200px]" />
          </div>
          <div className="flex items-end  gap-2">
            <Skeleton className="w-5 h-[180px]" />
            <Skeleton className="w-5 h-[200px]" />
          </div>
          <div className="flex items-end gap-2">
            <Skeleton className="w-5 h-[200px]" />
            <Skeleton className="w-5 h-[300px]" />
          </div>
          <div className="flex items-end gap-2">
            <Skeleton className="w-5 h-[280px]" />
            <Skeleton className="w-5 h-[220px]" />
          </div>
          <div className="flex items-end  gap-2">
            <Skeleton className="w-5 h-[100px]" />
            <Skeleton className="w-5 h-[200px]" />
          </div>
          <div className="flex items-end  gap-2">
            <Skeleton className="w-5 h-[300px]" />
            <Skeleton className="w-5 h-[180px]" />
          </div>
          <div className="flex items-end  gap-2">
            <Skeleton className="w-5 h-[180px]" />
            <Skeleton className="w-5 h-[300px]" />
          </div>
          <div className="flex items-end  gap-2">
            <Skeleton className="w-5 h-[100px]" />
            <Skeleton className="w-5 h-[200px]" />
          </div>
          <div className="flex items-end  gap-2">
            <Skeleton className="w-5 h-[250px]" />
            <Skeleton className="w-5 h-[200px]" />
          </div>
          <div className="flex items-end  gap-2">
            <Skeleton className="w-5 h-[50px]" />
            <Skeleton className="w-5 h-[300px]" />
          </div>
          <div className="flex items-end  gap-2">
            <Skeleton className="w-5 h-[100px]" />
            <Skeleton className="w-5 h-[50px]" />
          </div>
          <div className="flex items-end  gap-2">
            <Skeleton className="w-5 h-[300px]" />
            <Skeleton className="w-5 h-[200px]" />
          </div>
          <div className="flex items-end  gap-2">
            <Skeleton className="w-5 h-[180px]" />
            <Skeleton className="w-5 h-[200px]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default YearChartSkeleton;
