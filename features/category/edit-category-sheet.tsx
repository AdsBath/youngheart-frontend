"use client";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import CategoryForm from "@/app/(dashboard)/dashboard/(product)/category/_components/categoryForm";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCategoryQuery } from "@/redux/api/categoriesApi";
import { onCloseEditCategory } from "@/redux/features/category/categorySlice";

const EditCategorySheet = () => {
  const dispatch = useDispatch();
  const { id, isOpen } = useSelector(
    (state: any) => state.category.editCategorySheet
  );

  const { data: category, isLoading } = useCategoryQuery(id);
  const categoryData = category?.data;

  return (
    <Sheet open={isOpen} onOpenChange={() => dispatch(onCloseEditCategory())}>
      <SheetContent className="space-y-4 h-screen overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            Edit Category&nbsp;
            <span className="text-sm text-gray-500">| Update</span>
          </SheetTitle>
          <SheetDescription>
            Update the category details and click on the save button to save the
            changes.
          </SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-2 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <CategoryForm categoryData={categoryData} />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default EditCategorySheet;
