"use client";

import CollectionsForm from "@/app/(dashboard)/dashboard/(product)/collections/_components/collectionsForm";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useProductCollectionQuery } from "@/redux/api/productCollectionApi";
import { onCloseEditProductCollection } from "@/redux/features/productCollection/productCollectionSlice";

import { Loader2 } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

const EditCollectionsSheet = () => {
  const dispatch = useDispatch();
  const { id, isOpen } = useSelector(
    (state: any) => state.productCollection.editProductCollectionSheet
  );
  const { data: collection, isLoading } = useProductCollectionQuery(id);
  const collectionsData = collection?.data;
  return (
    <Sheet
      open={isOpen}
      onOpenChange={() => dispatch(onCloseEditProductCollection())}
    >
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
          <CollectionsForm collectionsData={collectionsData} />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default EditCollectionsSheet;
