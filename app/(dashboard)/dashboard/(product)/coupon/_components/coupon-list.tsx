"use client";
import { useDispatch } from "react-redux";

import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import { IconStackPush } from "@tabler/icons-react";

import Loading from "@/components/loding";
import { DataTable } from "@/components/table/data-table";
import {
  useCouponsQuery,
  useDeleteMultipleCouponMutation,
} from "@/redux/api/couponApi";
import { onCouponOpen } from "@/redux/features/coupon/couponSlice";
import { toast } from "sonner";
import { couponColumns } from "./coupon-columns";
import { statuses } from "./schema";

const CouponList = () => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure ?",
    "Do you want to delete this category ?"
  );
  const { data: coupon, isLoading, refetch } = useCouponsQuery({});
  const [deleteMultipleCoupon] = useDeleteMultipleCouponMutation();
  const dispatch = useDispatch();
  const handleMultiple = async (items: string[]) => {
    const ok = await confirm();
    if (ok) {
      await deleteMultipleCoupon(items);
      refetch();
      toast.success("Coupon deleted successfully");
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
              <h2 className="text-2xl font-bold tracking-tight">Coupon List</h2>
              <p className="text-muted-foreground">
                List of all coupon list available in the store and their status.
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => dispatch(onCouponOpen())}
                size={"sm"}
                variant={"default"}
                className=""
              >
                <IconStackPush size={18} className="mr-2" />
                New Coupon
              </Button>
            </div>
          </div>
          <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
            <DataTable
              data={coupon?.data?.data || []}
              columns={couponColumns}
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

export default CouponList;
