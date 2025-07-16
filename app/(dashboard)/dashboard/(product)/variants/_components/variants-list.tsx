"use client";
import { useDispatch } from "react-redux";

import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import { IconBoxAlignTopRight } from "@tabler/icons-react";

import Loading from "@/components/loding";
import { DataTable } from "@/components/table/data-table";
import {
  useDeleteMultipleVariantItemMutation,
  useVariantsQuery,
} from "@/redux/api/attributeApi";
import { onNewVariantOpen } from "@/redux/features/variant/variantSlice";
import { toast } from "sonner";
import { columns } from "./columns";
import { statuses } from "./schema";

const VariantsList = () => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure ?",
    "Do you want to delete this category ?"
  );

  const { data: attribute, isLoading, refetch } = useVariantsQuery({});
  const dispatch = useDispatch();
  const [deleteMultipleVariant] = useDeleteMultipleVariantItemMutation();

  const handleMultiple = async (items: string[]) => {
    const ok = await confirm();
    if (ok) {
      await deleteMultipleVariant(items);
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
                Product variants list
              </h2>
              <p className="text-muted-foreground">
                List of all product variants
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => dispatch(onNewVariantOpen())}
                size={"sm"}
                variant={"default"}
                className=""
              >
                <IconBoxAlignTopRight size={18} className="mr-2" />
                New variants
              </Button>
              {/* <Button size={"sm"} variant={"secondary"} className="">
              <IconTableImport size={18} className="mr-2" /> Import
            </Button> */}
            </div>
          </div>
          <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
            <DataTable
              data={attribute?.data?.data || []}
              columns={columns}
              filterKey="title"
              filterPlaceholder="title"
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

export default VariantsList;
