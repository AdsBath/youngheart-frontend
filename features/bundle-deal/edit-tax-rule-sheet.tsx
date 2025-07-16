"use client";

import BundleDealForm from "@/app/(dashboard)/dashboard/(product)/bundle-deals/_components/bundleDealForm";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useBundleDiscountQuery } from "@/redux/api/bundleDiscountApi";
import { onCloseEditBundleDiscount } from "@/redux/features/bundleDiscount/bundleDiscountSlice";
import { Loader2 } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

const EditBundleDealsSheet = () => {
  const dispatch = useDispatch();
  const { id, isOpen } = useSelector(
    (state: any) => state.bundleDeal.editBundleDiscountSheet
  );
  const { data: bundleDiscount, isLoading } = useBundleDiscountQuery(id);
  const bundleDiscountData = bundleDiscount?.data;
  return (
    <Sheet
      open={isOpen}
      onOpenChange={() => dispatch(onCloseEditBundleDiscount())}
    >
      <SheetContent className="space-y-4 h-screen overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            Edit Bundle Discount
            <span className="text-sm text-gray-500">| Update</span>
          </SheetTitle>
          <SheetDescription>
            Update the bundle discount to apply to your products.
          </SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-2 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <BundleDealForm bundleDiscountData={bundleDiscountData} />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default EditBundleDealsSheet;
