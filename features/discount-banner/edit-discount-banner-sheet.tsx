"use client";

import DiscountBannerForm from "@/app/(dashboard)/dashboard/(storeui)/discount-banner/_components/discount-banner-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useDiscountBannerQuery } from "@/redux/api/discountBannerApi";
import { onEditDiscountBannerClose } from "@/redux/features/discountBanner/discountBannerSlice";
import { RootState } from "@/redux/store";
import { Loader2 } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

const EditDiscountBannerSheet = () => {
  const dispatch = useDispatch();
  const { isOpen, id } = useSelector(
    (state: RootState) => state.discountBanner.editDiscountBanner
  );

  const {
    data: discountBanner,
    isLoading,
    isFetching,
  } = useDiscountBannerQuery(id);
  const discountBannerData = discountBanner?.data;

  return (
    <Sheet
      open={isOpen}
      onOpenChange={() => dispatch(onEditDiscountBannerClose())}
    >
      <SheetContent className="space-y-4 h-screen overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            Update Discount Banner{" "}
            <span className="text-sm text-gray-500">| Update</span>
          </SheetTitle>
          <SheetDescription>
            Update a discount banner ad to apply discount banner.
          </SheetDescription>
        </SheetHeader>
        {isLoading && isFetching ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-2 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <DiscountBannerForm discountBannerData={discountBannerData} />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default EditDiscountBannerSheet;
