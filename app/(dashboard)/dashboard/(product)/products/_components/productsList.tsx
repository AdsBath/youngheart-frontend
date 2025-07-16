"use client";

import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import { IconBoxSeam } from "@tabler/icons-react";

import Loading from "@/components/loding";
import { DataTable } from "@/components/table/data-table";
import {
  useDeleteMultipleProductMutation,
  useProductsQuery,
} from "@/redux/api/productApi";
import Link from "next/link";
import { toast } from "sonner";
import { columns } from "./columns";
import { priorities, statuses } from "./schema";

const ProductsList = () => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure ?",
    "Do you want to delete this category ?"
  );

  const { data: products, isLoading, refetch } = useProductsQuery({});

  const [deleteMultipleProduct] = useDeleteMultipleProductMutation();

  const handleMultiple = async (items: string[]) => {
    const ok = await confirm();
    if (ok) {
      await deleteMultipleProduct(items);
      refetch();
      toast.success("Product deleted successfully");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <ConfirmDialog />
          <div className="mb-2 md:flex items-center justify-between space-y-2 ">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Product List
              </h2>
              <p className="text-muted-foreground">
                List of all products available in the store and their status.
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/dashboard/products/add-new-product">
                <Button size={"sm"} variant={"default"} className="">
                  <IconBoxSeam size={18} className="mr-2" />
                  New Product
                </Button>
              </Link>
            </div>
          </div>
          <div className="-mx-4 flex-1 px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
            <DataTable
              data={products?.data?.data || []}
              columns={columns}
              filterKey="sku"
              filterPlaceholder="product sku"
              statuses={statuses}
              priorities={priorities}
              handleDeleteMultiple={handleMultiple}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ProductsList;
