"use client";
import { useDispatch } from "react-redux";

import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import { IconStackPush } from "@tabler/icons-react";

import Loading from "@/components/loding";
import { DataTable } from "@/components/table/data-table";
import { useCouponsQuery } from "@/redux/api/couponApi";
import { onCouponOpen } from "@/redux/features/coupon/couponSlice";
import { shippingRulesColumns } from "./shipping-rules-columns";
import { statuses } from "./schema";
import { useShippingRulesQuery } from "@/redux/api/shippingRulesApi";
import { onShippingRulesOpen } from "@/redux/features/shippingRules/shippingRulesSlice";

const ShippingRulesList = () => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure ?",
    "Do you want to delete this category ?"
  );

  const { data: shippingRules, isLoading } = useShippingRulesQuery({});
  const dispatch = useDispatch();
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
                Shipping Rules List
              </h2>
              <p className="text-muted-foreground">
                List of all Shipping list available in the store and their
                status.
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => dispatch(onShippingRulesOpen())}
                size={"sm"}
                variant={"default"}
                className=""
              >
                <IconStackPush size={18} className="mr-2" />
                New Shipping Rule
              </Button>
            </div>
          </div>
          <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
            <DataTable
              data={shippingRules?.data?.data || []}
              columns={shippingRulesColumns}
              filterKey="title"
              filterPlaceholder="title "
              statuses={statuses}
              priorities={[]}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ShippingRulesList;
