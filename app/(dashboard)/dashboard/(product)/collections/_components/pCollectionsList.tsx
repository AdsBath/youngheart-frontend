"use client";
import { useDispatch } from "react-redux";

import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import { IconStackPush } from "@tabler/icons-react";

import Loading from "@/components/loding";
import { DataTable } from "@/components/table/data-table";
import {
  useDeleteMultipleProductCollectionMutation,
  useProductCollectionsQuery,
} from "@/redux/api/productCollectionApi";
import { onProductCollectionOpen } from "@/redux/features/productCollection/productCollectionSlice";
import { toast } from "sonner";
import { columns } from "./columns";
import { statuses } from "./schema";

const CollectionsList = () => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure ?",
    "Do you want to delete this category ?"
  );

  const { data, isLoading, refetch } = useProductCollectionsQuery({});
  const dispatch = useDispatch();
  const [deleteMultpleProductCollection] =
    useDeleteMultipleProductCollectionMutation();
  const handleDeleteMultiple = async (items: string[]) => {
    const ok = await confirm();
    if (ok) {
      await deleteMultpleProductCollection(items);
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
              <h2 className="text-2xl font-bold tracking-tight">
                Product Collections List
              </h2>
              <p className="text-muted-foreground">
                List of all product collections available in the store and their
                status.
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => dispatch(onProductCollectionOpen())}
                size={"sm"}
                variant={"default"}
                className=""
              >
                <IconStackPush size={18} className="mr-2" />
                New Product Collection
              </Button>
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
              handleDeleteMultiple={handleDeleteMultiple}
            />
          </div>
        </>
      )}
    </>
  );
};

export default CollectionsList;
