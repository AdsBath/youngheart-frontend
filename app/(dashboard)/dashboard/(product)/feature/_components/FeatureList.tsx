"use client";
import { useDispatch } from "react-redux";

import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import { IconStackPush } from "@tabler/icons-react";

import Loading from "@/components/loding";
import { DataTable } from "@/components/table/data-table";
import {
  useDeleteMultipleFeatureMutation,
  useFeaturesQuery,
} from "@/redux/api/featureApi";
import { onFeatureOpen } from "@/redux/features/feature/featureSlice";
import { toast } from "sonner";
import { columns } from "./columns";
import { statuses } from "./schema";

const FeaturesList = () => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure ?",
    "Do you want to delete this collection ?"
  );

  const { data, isLoading, refetch } = useFeaturesQuery({});
  console.log({ data });
  const dispatch = useDispatch();
  const [deleteMultpleFeature] = useDeleteMultipleFeatureMutation();
  const handleDeleteMultiple = async (items: string[]) => {
    const ok = await confirm();
    if (ok) {
      await deleteMultpleFeature(items);
      refetch();
      toast.success("Feature successfully");
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
                Product Feature List
              </h2>
              <p className="text-muted-foreground">
                List of all product feature available in the store and their
                status.
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => dispatch(onFeatureOpen())}
                size={"sm"}
                variant={"default"}
                className=""
              >
                <IconStackPush size={18} className="mr-2" />
                New Product Feature
              </Button>
            </div>
          </div>
          <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
            <DataTable
              data={data?.data || []}
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

export default FeaturesList;
