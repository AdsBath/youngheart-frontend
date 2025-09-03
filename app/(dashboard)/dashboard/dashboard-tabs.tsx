"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Overview = dynamic(() => import("@/components/dashboard/overview"), {
     loading: () => <SectionSkeleton title="Overview" />,
});
const Analytics = dynamic(
     () => import("@/components/dashboard/analytics"),
     {
          loading: () => <SectionSkeleton title="Analytics" />,
          ssr: false,
     }
);
const Reports = dynamic(
     () => import("@/components/dashboard/reports"),
     {
          loading: () => <SectionSkeleton title="Reports" />,
          ssr: false,
     }
);

export default function DashboardTabs() {
     const [value, setValue] = React.useState("overview");
     const mounted = React.useRef<Set<string>>(new Set(["overview"]));

     const handleChange = (val: string) => {
          setValue(val);
          mounted.current.add(val);
     };

     return (
          <Tabs
               orientation="vertical"
               defaultValue="overview"
               value={value}
               onValueChange={handleChange}
               className="space-y-4"
          >
               <div className="w-full overflow-x-auto pb-2">
                    <TabsList>
                         <TabsTrigger value="overview">Overview</TabsTrigger>
                         <TabsTrigger value="analytics">Analytics</TabsTrigger>
                         <TabsTrigger value="reports">Reports</TabsTrigger>
                    </TabsList>
               </div>
               <TabsContent value="overview" className="space-y-4">
                    {mounted.current.has("overview") && <Overview />}
               </TabsContent>
               <TabsContent value="analytics" className="space-y-4">
                    {mounted.current.has("analytics") && value === "analytics" && <Analytics />}
               </TabsContent>
               <TabsContent value="reports" className="space-y-4">
                    {mounted.current.has("reports") && value === "reports" && <Reports />}
               </TabsContent>
          </Tabs>
     );
}

function SectionSkeleton({ title }: { title: string }) {
     return (
          <div className="space-y-3 rounded border bg-card p-4">
               <div className="flex items-center justify-between">
                    <div className="h-5 w-32 animate-pulse rounded bg-muted/40" />
                    <div className="h-5 w-14 animate-pulse rounded bg-muted/40" />
               </div>
               <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                         <div
                              key={i}
                              className="h-24 animate-pulse rounded-md border bg-muted/30"
                         />
                    ))}
               </div>
               <p className="text-xs text-muted-foreground">Loading {title}…</p>
          </div>
     );
}
