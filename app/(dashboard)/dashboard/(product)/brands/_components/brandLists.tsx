"use client";
import { useDispatch } from "react-redux";

import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";

import Loading from "@/components/loding";
import { DataTable } from "@/components/table/data-table";
import {
  useBrandsQuery,
  useDeleteMultipleBrandMutation,
} from "@/redux/api/brandApi";

import { onBrandOpen } from "@/redux/features/brand/brandSlice";
import { IconCirclePercentage } from "@tabler/icons-react";
import { toast } from "sonner";
import { columns } from "./columns";
import { statuses } from "./schema";

const BrandList = () => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure ?",
    "Do you want to delete this brand ?"
  );

  const { data, isLoading, refetch } = useBrandsQuery({});
  const dispatch = useDispatch();
  const [deleteBrand] = useDeleteMultipleBrandMutation();

  const handleMultiple = async (items: string[]) => {
    const ok = await confirm();
    if (ok) {
      await deleteBrand(items);
      refetch();
      toast.success("Product collections deleted successfully");
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
              <h2 className="text-2xl font-bold tracking-tight">Brand List</h2>
              <p className="text-muted-foreground">
                List of all brands available
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => dispatch(onBrandOpen())}
                size={"sm"}
                variant={"default"}
                className=""
              >
                <IconCirclePercentage size={18} className="mr-2" />
                New Brand
              </Button>
              {/* <Button size={"sm"} variant={"secondary"} className="">
              <IconTableImport size={18} className="mr-2" /> Import
            </Button> */}
            </div>
          </div>
          <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
            <DataTable
              data={data?.data.data || []}
              columns={columns}
              filterKey="title"
              filterPlaceholder="title "
              statuses={statuses}
              priorities={[]}
              handleDeleteMultiple={handleMultiple}
            />
          </div>
        </>
      )}
    </>
  );
};

export default BrandList;
