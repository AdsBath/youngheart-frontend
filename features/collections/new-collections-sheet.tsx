"use client";

import CollectionsForm from "@/app/(dashboard)/dashboard/(product)/collections/_components/collectionsForm";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { onCloseProductCollection } from "@/redux/features/productCollection/productCollectionSlice";

import { useDispatch, useSelector } from "react-redux";

const NewCollectionsSheet = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: any) => state.productCollection.newProductCollectionSheet.isOpen
  );

  return (
    <Sheet
      open={isOpen}
      onOpenChange={() => dispatch(onCloseProductCollection())}
    >
      <SheetContent className="space-y-4 h-screen overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            New Collections
            <span className="text-sm text-gray-500">| Create</span>
          </SheetTitle>
          <SheetDescription>
            Create a new collection by filling the form below.
          </SheetDescription>
        </SheetHeader>
        <CollectionsForm />
      </SheetContent>
    </Sheet>
  );
};

export default NewCollectionsSheet;
