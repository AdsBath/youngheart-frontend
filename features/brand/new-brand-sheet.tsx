"use client";

import BrandForm from "@/app/(dashboard)/dashboard/(product)/brands/_components/brandForm";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { onCloseBrand } from "@/redux/features/brand/brandSlice";
import { useDispatch, useSelector } from "react-redux";

const NewBrandSheet = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: any) => state.brand.newBrandSheet.isOpen);

  return (
    <Sheet open={isOpen} onOpenChange={() => dispatch(onCloseBrand())}>
      <SheetContent className="space-y-4 h-screen overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            New Brand
            <span className="text-sm text-gray-500">| Create</span>
          </SheetTitle>
          <SheetDescription>
            Create a new brand to apply to your products.
          </SheetDescription>
        </SheetHeader>
        {/* Tax rule from */}
        <BrandForm />
      </SheetContent>
    </Sheet>
  );
};

export default NewBrandSheet;
