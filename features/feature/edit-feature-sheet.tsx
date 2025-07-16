"use client";

import FeatureForm from "@/app/(dashboard)/dashboard/(product)/feature/_components/FeatureForm";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useFeatureQuery } from "@/redux/api/featureApi";
import { onCloseEditFeature } from "@/redux/features/feature/featureSlice";

import { Loader2 } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

const EditFeatureSheet = () => {
  const dispatch = useDispatch();
  const { id, isOpen } = useSelector(
    (state: any) => state.feature.editFeatureSheet
  );
  const { data: collection, isLoading } = useFeatureQuery(id);
  const featureData = collection?.data;
  return (
    <Sheet open={isOpen} onOpenChange={() => dispatch(onCloseEditFeature())}>
      <SheetContent className="space-y-4 h-screen overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            Edit Collection
            <span className="text-sm text-gray-500">| Update</span>
          </SheetTitle>
          <SheetDescription>
            Edit the collection details and update the collection.
          </SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-2 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <FeatureForm featureData={featureData} />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default EditFeatureSheet;
