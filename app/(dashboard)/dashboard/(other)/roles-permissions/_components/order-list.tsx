"use client";

import { useConfirm } from "@/hooks/use-confirm";

import Loading from "@/components/loding";
import { DataTable } from "@/components/table/data-table";
import { useProductCollectionsQuery } from "@/redux/api/productCollectionApi";
import { OrderColumns } from "./order-columns";

const OrderList = () => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure ?",
    "Do you want to delete this category ?"
  );

  const { data, isLoading } = useProductCollectionsQuery({});

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
                Orders List
              </h2>
              <p className="text-muted-foreground">
                List of all Orders in the system.
              </p>
            </div>
          </div>
          <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
            <DataTable
              data={[]}
              columns={OrderColumns}
              filterKey="title"
              filterPlaceholder="title "
              statuses={[]}
              priorities={[]}
            />
          </div>
        </>
      )}
    </>
  );
};

export default OrderList;
