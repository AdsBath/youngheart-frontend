"use client";

import DiscountBannerForm from "@/app/(dashboard)/dashboard/(storeui)/discount-banner/_components/discount-banner-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { onNewDiscountBannerClose } from "@/redux/features/discountBanner/discountBannerSlice";
import { RootState } from "@/redux/store";

import { useDispatch, useSelector } from "react-redux";

const NewDiscountBannerSheet = () => {
  const dispatch = useDispatch();

  const { isOpen } = useSelector(
    (state: RootState) => state.discountBanner.newDiscountBanner
  );

  return (
    <Sheet
      open={isOpen}
      onOpenChange={() => dispatch(onNewDiscountBannerClose())}
    >
      <SheetContent className="space-y-4 h-screen overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            New Discount Banner{" "}
            <span className="text-sm text-gray-500">| Create</span>
          </SheetTitle>
          <SheetDescription>
            Create a discount banner ad to apply discount banner.
          </SheetDescription>
        </SheetHeader>
        <DiscountBannerForm />
      </SheetContent>
    </Sheet>
  );
};

export default NewDiscountBannerSheet;
