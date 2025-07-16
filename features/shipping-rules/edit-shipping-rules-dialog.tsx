"use client";

import ShippingRulesForm from "@/app/(dashboard)/dashboard/(product)/shipping-rules/_components/shipping-rules-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useShippingRuleQuery } from "@/redux/api/shippingRulesApi";
import { onCloseEditShippingRules } from "@/redux/features/shippingRules/shippingRulesSlice";

import { Loader2 } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

const EditShippingRulesSheet = () => {
  const dispatch = useDispatch();
  const { id, isOpen } = useSelector(
    (state: any) => state.shippingRules.editShippingRulesSheet
  );
  const { data: shippingRule, isLoading } = useShippingRuleQuery(id);
  const shippingRulesData = shippingRule?.data;
  return (
    <Sheet
      open={isOpen}
      onOpenChange={() => dispatch(onCloseEditShippingRules())}
    >
      <SheetContent className="space-y-4 h-screen overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            Edit Shipping Rules
            <span className="text-sm text-gray-500">| Update</span>
          </SheetTitle>
          <SheetDescription>
            Edit the Shipping Rules details and update the Shipping Rules.
          </SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-2 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <ShippingRulesForm shippingRulesData={shippingRulesData} />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default EditShippingRulesSheet;
