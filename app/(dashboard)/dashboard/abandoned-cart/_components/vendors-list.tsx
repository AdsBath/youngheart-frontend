"use client";

import { useConfirm } from "@/hooks/use-confirm";

import Loading from "@/components/loding";
import { DataTable } from "@/components/table/data-table";
import { useAbandonedCartsQuery } from "@/redux/api/abandonedCartApi";
import { abandonedCartColumns } from "./abandoned-cart-columns";

const AbandonedCartList = () => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure ?",
    "Do you want to delete this category ?"
  );
  const { data, isLoading } = useAbandonedCartsQuery({});

  // console.log(data?.data?.data);

  return (
    <>
      <ConfirmDialog />
      <div className="mb-2 md:flex items-center justify-between space-y-2 ">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Abandoned Cart</h2>
          <p className="text-muted-foreground">List of all abandoned cart.</p>
        </div>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <DataTable
            data={data?.data?.data || []}
            columns={abandonedCartColumns}
            filterKey="title"
            filterPlaceholder="title"
            statuses={[]}
            priorities={[]}
          />
        </div>
      )}
    </>
  );
};

export default AbandonedCartList;
