"use client";

import FeatureForm from "@/app/(dashboard)/dashboard/(product)/feature/_components/FeatureForm";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { onCloseFeature } from "@/redux/features/feature/featureSlice";

import { useDispatch, useSelector } from "react-redux";

const NewFeatureSheet = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: any) => state.feature.newFeatureSheet.isOpen
  );

  return (
    <Sheet open={isOpen} onOpenChange={() => dispatch(onCloseFeature())}>
      <SheetContent className="space-y-4 h-screen overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            New Feature
            <span className="text-sm text-gray-500">| Create</span>
          </SheetTitle>
          <SheetDescription>
            Create a new feature by filling the form below.
          </SheetDescription>
        </SheetHeader>
        <FeatureForm />
      </SheetContent>
    </Sheet>
  );
};

export default NewFeatureSheet;
