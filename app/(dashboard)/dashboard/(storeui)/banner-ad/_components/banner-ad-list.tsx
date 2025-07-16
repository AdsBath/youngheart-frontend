"use client";

import Loading from "@/components/loding";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { IconStackPush } from "@tabler/icons-react";
import { onNewBannerOpen } from "@/redux/features/banner/bannerSlice";
import { bannerAdColumns } from "./banner-ad-columns";
import { useBannerAdsQuery } from "@/redux/api/bannerAdApi";
import { onNewBannerAdOpen } from "@/redux/features/bannerAd/bannerAdSlice";

const BannerAdList = () => {
  const dispatch = useDispatch();
  const { data: bannerAd, isLoading: isBannerLoading } = useBannerAdsQuery({});

  const BannerAdData = bannerAd?.data?.data;
  return (
    <>
      <div className="mb-2 md:flex items-center justify-between space-y-2 ">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Banner Ad List</h2>
          <p className="text-muted-foreground">List of Banner Ads</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => dispatch(onNewBannerAdOpen())}
            size={"sm"}
            variant={"default"}
            className=""
          >
            <IconStackPush size={18} className="mr-2" />
            New Banner Ad
          </Button>
        </div>
      </div>
      {isBannerLoading ? (
        <Loading />
      ) : (
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <DataTable
            data={BannerAdData || []}
            columns={bannerAdColumns}
            filterKey="title"
            filterPlaceholder="title"
            statuses={[]}
            priorities={[]}
          />
        </div>
      )}
    </>
  );
};
export default BannerAdList;
