"use client";

import BannerAdForm from "@/app/(dashboard)/dashboard/(storeui)/banner-ad/_components/banner-ad-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useBannerAdQuery } from "@/redux/api/bannerAdApi";
import { onEditBannerAdClose } from "@/redux/features/bannerAd/bannerAdSlice";
import { RootState } from "@/redux/store";
import { Loader2 } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

const EditBannerAdSheet = () => {
  const dispatch = useDispatch();
  const { isOpen, id } = useSelector(
    (state: RootState) => state.bannerAd.editBannerAd
  );

  const { data: bannerAd, isLoading, isFetching } = useBannerAdQuery(id);
  const bannerAdData = bannerAd?.data;

  return (
    <Sheet open={isOpen} onOpenChange={() => dispatch(onEditBannerAdClose())}>
      <SheetContent className="space-y-4 h-screen overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            Update Banner Ad{" "}
            <span className="text-sm text-gray-500">| Update</span>
          </SheetTitle>
          <SheetDescription>
            Update a banner ad to apply banner ad.
          </SheetDescription>
        </SheetHeader>
        {isLoading && isFetching ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-2 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <BannerAdForm bannerAdData={bannerAdData} />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default EditBannerAdSheet;
