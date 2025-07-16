"use client";

import ShippingRulesForm from "@/app/(dashboard)/dashboard/(product)/shipping-rules/_components/shipping-rules-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { onCloseShippingRules } from "@/redux/features/shippingRules/shippingRulesSlice";

import { useDispatch, useSelector } from "react-redux";

const NewShippingRulesSheet = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: any) => state.shippingRules.newShippingRulesSheet.isOpen
  );

  return (
    <Sheet open={isOpen} onOpenChange={() => dispatch(onCloseShippingRules())}>
      <SheetContent className="space-y-4 h-screen overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            New Shipping Rules
            <span className="text-sm text-gray-500">| Create</span>
          </SheetTitle>
          <SheetDescription>
            Create a new Shipping Rules by filling the form below.
          </SheetDescription>
        </SheetHeader>
        <ShippingRulesForm />
      </SheetContent>
    </Sheet>
  );
};

export default NewShippingRulesSheet;
