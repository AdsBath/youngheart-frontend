"use client";

import Loading from "@/components/loding";
import { DataTable } from "@/components/table/data-table";
import { useUsersQuery } from "@/redux/api/userApi";
import { bannerColumns } from "./banner-columns";
import { useBannersQuery } from "@/redux/api/bannerApi";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { IconStackPush } from "@tabler/icons-react";
import { onNewBannerOpen } from "@/redux/features/banner/bannerSlice";

const BannerList = () => {
  const dispatch = useDispatch();
  const { data: banner, isLoading: isBannerLoading } = useBannersQuery({});

  const BannerData = banner?.data?.data;
  return (
    <>
      <div className="mb-2 md:flex items-center justify-between space-y-2 ">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Banner List</h2>
          <p className="text-muted-foreground">List of Banners</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => dispatch(onNewBannerOpen())}
            size={"sm"}
            variant={"default"}
            className=""
          >
            <IconStackPush size={18} className="mr-2" />
            New Banner
          </Button>
          {/* <Button size={"sm"} variant={"secondary"} className="">
              <IconTableImport size={18} className="mr-2" /> Import
            </Button> */}
        </div>
      </div>
      {isBannerLoading ? (
        <Loading />
      ) : (
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <DataTable
            data={BannerData || []}
            columns={bannerColumns}
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
export default BannerList;
