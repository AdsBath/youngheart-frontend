"use client";

import BrandForm from "@/app/(dashboard)/dashboard/(product)/brands/_components/brandForm";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useBrandQuery } from "@/redux/api/brandApi";
import { onCloseEditBrand } from "@/redux/features/brand/brandSlice";
import { Loader2 } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

const EditBrandsSheet = () => {
  const dispatch = useDispatch();
  const { id, isOpen } = useSelector(
    (state: any) => state.brand.editBrandSheet
  );
  const { data: brand, isLoading } = useBrandQuery(id);
  const brandData = brand?.data;
  return (
    <Sheet open={isOpen} onOpenChange={() => dispatch(onCloseEditBrand())}>
      <SheetContent className="space-y-4 h-screen overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            Edit Brand
            <span className="text-sm text-gray-500">| Update</span>
          </SheetTitle>
          <SheetDescription>
            Update the brand to apply to your products.
          </SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-2 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <BrandForm brandData={brandData} />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default EditBrandsSheet;
