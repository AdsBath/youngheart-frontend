"use client";

import BannerAdForm from "@/app/(dashboard)/dashboard/(storeui)/banner-ad/_components/banner-ad-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { onNewBannerAdClose } from "@/redux/features/bannerAd/bannerAdSlice";
import { RootState } from "@/redux/store";

import { useDispatch, useSelector } from "react-redux";

const NewBannerAdSheet = () => {
  const dispatch = useDispatch();

  const { isOpen } = useSelector(
    (state: RootState) => state.bannerAd.newBannerAd
  );

  return (
    <Sheet open={isOpen} onOpenChange={() => dispatch(onNewBannerAdClose())}>
      <SheetContent className="space-y-4 h-screen overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            New Banner Ad{" "}
            <span className="text-sm text-gray-500">| Create</span>
          </SheetTitle>
          <SheetDescription>
            Create a new banner ad to apply banner.
          </SheetDescription>
        </SheetHeader>
        <BannerAdForm />
      </SheetContent>
    </Sheet>
  );
};

export default NewBannerAdSheet;
