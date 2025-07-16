"use client";

import CouponForm from "@/app/(dashboard)/dashboard/(product)/coupon/_components/coupon-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCouponQuery } from "@/redux/api/couponApi";
import { onCloseEditCoupon } from "@/redux/features/coupon/couponSlice";

import { Loader2 } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

const EditCouponsSheet = () => {
  const dispatch = useDispatch();
  const { id, isOpen } = useSelector((state: any) => state.coupon.editCoupon);
  const { data: coupon, isLoading } = useCouponQuery(id);
  const couponsData = coupon?.data;
  return (
    <Sheet open={isOpen} onOpenChange={() => dispatch(onCloseEditCoupon())}>
      <SheetContent className="space-y-4 h-screen overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            Edit Coupon
            <span className="text-sm text-gray-500">| Update</span>
          </SheetTitle>
          <SheetDescription>
            Edit the Coupon details and update the Coupon.
          </SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-2 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <CouponForm couponsData={couponsData} />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default EditCouponsSheet;
