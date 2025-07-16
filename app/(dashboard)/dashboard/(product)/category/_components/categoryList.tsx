"use client";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import {
  useCategoriesQuery,
  useDeleteCategoryMutation,
} from "@/redux/api/categoriesApi";

import Loading from "@/components/loding";
import {
  onCategoryOpen,
  onEditCategoryOpen,
} from "@/redux/features/category/categorySlice";
import { IconCategoryPlus } from "@tabler/icons-react";
import RecursiveCategory from "../RecursiveCategory";

const CategoryList = () => {
  const { data: categories, isLoading, refetch } = useCategoriesQuery({});
  const [deleteCategory] = useDeleteCategoryMutation();
  const categoriesList: any = categories?.data?.data;
  console.log({ categoriesList });

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure ?",
    "Do you want to delete this category ?"
  );

  const dispatch = useDispatch();

  const handelDelete = async (id: string) => {
    const ok = await confirm();
    if (ok) {
      await deleteCategory(id);
      refetch();
      toast.success("Category deleted successfully");
    }
  };

  return (
    <>
      <ConfirmDialog />
      {isLoading && <Loading />}
      <div className="mb-2 md:flex items-center justify-between space-y-2 ">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Category Management
          </h2>
          <p className="text-muted-foreground">
            Manage your product categories here and add new categories.
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => dispatch(onCategoryOpen())}
            size={"sm"}
            variant={"default"}
            className=""
          >
            <IconCategoryPlus size={18} className="mr-2" /> Add New Category
          </Button>
          {/* <Button size={"sm"} variant={"secondary"} className="">
            <IconTableImport size={18} className="mr-2" /> Import
          </Button> */}
        </div>
      </div>
      <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
        <div className="space-y-4 border-l-[3px] border-gray-600">
          {/* 1 */}
          {categoriesList?.map((category: any) => (
            <RecursiveCategory
              key={category.id}
              category={category}
              onEditCategoryOpen={onEditCategoryOpen}
              handleDelete={handelDelete}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryList;

function BackpackIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
      <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
      <path d="M8 21v-5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v5" />
      <path d="M8 10h8" />
      <path d="M8 18h8" />
    </svg>
  );
}

function ShoppingBagIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
