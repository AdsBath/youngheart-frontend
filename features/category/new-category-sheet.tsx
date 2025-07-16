"use client";

import CategoryForm from "@/app/(dashboard)/dashboard/(product)/category/_components/categoryForm";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { onCloseCategory } from "@/redux/features/category/categorySlice";
import { RootState } from "@/redux/store";

import { useDispatch, useSelector } from "react-redux";

const NewCategorySheet = () => {
  const dispatch = useDispatch();

  const { isOpen } = useSelector(
    (state: RootState) => state.category.newCategorySheet
  );

  return (
    <Sheet open={isOpen} onOpenChange={() => dispatch(onCloseCategory())}>
      <SheetContent className="space-y-4 h-screen overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            New Category <span className="text-sm text-gray-500">| Create</span>
          </SheetTitle>
          <SheetDescription>
            Create a new category to apply to your products.
          </SheetDescription>
        </SheetHeader>
        <CategoryForm />
      </SheetContent>
    </Sheet>
  );
};

export default NewCategorySheet;
