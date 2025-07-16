"use client";

import CouponForm from "@/app/(dashboard)/dashboard/(product)/coupon/_components/coupon-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { onCloseCoupon } from "@/redux/features/coupon/couponSlice";

import { useDispatch, useSelector } from "react-redux";

const NewCouponSheet = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: any) => state.coupon.newCoupon.isOpen);

  return (
    <Sheet open={isOpen} onOpenChange={() => dispatch(onCloseCoupon())}>
      <SheetContent className="space-y-4 h-screen overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            New Coupon
            <span className="text-sm text-gray-500">| Create</span>
          </SheetTitle>
          <SheetDescription>
            Create a new coupon by filling the form below.
          </SheetDescription>
        </SheetHeader>
        <CouponForm />
      </SheetContent>
    </Sheet>
  );
};

export default NewCouponSheet;
