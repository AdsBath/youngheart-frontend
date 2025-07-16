"use client";

import BundleDealForm from "@/app/(dashboard)/dashboard/(product)/bundle-deals/_components/bundleDealForm";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { onCloseBundleDiscount } from "@/redux/features/bundleDiscount/bundleDiscountSlice";
import { useDispatch, useSelector } from "react-redux";

const NewBundleDealSheet = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: any) => state.bundleDeal.newBundleDiscountSheet.isOpen
  );

  return (
    <Sheet open={isOpen} onOpenChange={() => dispatch(onCloseBundleDiscount())}>
      <SheetContent className="space-y-4 h-screen overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            New Bundle Discount
            <span className="text-sm text-gray-500">| Create</span>
          </SheetTitle>
          <SheetDescription>
            Create a new bundle discount to apply to your products.
          </SheetDescription>
        </SheetHeader>
        {/* Tax rule from */}
        <BundleDealForm />
      </SheetContent>
    </Sheet>
  );
};

export default NewBundleDealSheet;
