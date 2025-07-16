"use client";

import Loading from "@/components/loding";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { IconStackPush } from "@tabler/icons-react";
import { discountBannerColumns } from "./discount-banner-columns";
import { onNewDiscountBannerOpen } from "@/redux/features/discountBanner/discountBannerSlice";
import { useDiscountBannersQuery } from "@/redux/api/discountBannerApi";

const DiscountBannerList = () => {
  const dispatch = useDispatch();
  const { data: discountBanner, isLoading: isBannerLoading } =
    useDiscountBannersQuery({});

  const discountBannerData = discountBanner?.data?.data;
  return (
    <>
      <div className="mb-2 md:flex items-center justify-between space-y-2 ">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Discount Banner List
          </h2>
          <p className="text-muted-foreground">List of Discount Banner</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => dispatch(onNewDiscountBannerOpen())}
            size={"sm"}
            variant={"default"}
            className=""
          >
            <IconStackPush size={18} className="mr-2" />
            New Discount Banner
          </Button>
        </div>
      </div>
      {isBannerLoading ? (
        <Loading />
      ) : (
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <DataTable
            data={discountBannerData || []}
            columns={discountBannerColumns}
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
export default DiscountBannerList;
