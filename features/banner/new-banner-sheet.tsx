"use client";

import BannerForm from "@/app/(dashboard)/dashboard/(storeui)/banner/_components/banner-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { onNewBannerClose } from "@/redux/features/banner/bannerSlice";
import { RootState } from "@/redux/store";

import { useDispatch, useSelector } from "react-redux";

const NewBannerSheet = () => {
  const dispatch = useDispatch();

  const { isOpen } = useSelector((state: RootState) => state.banner.newBanner);

  return (
    <Sheet open={isOpen} onOpenChange={() => dispatch(onNewBannerClose())}>
      <SheetContent className="space-y-4 h-screen overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            New Banner <span className="text-sm text-gray-500">| Create</span>
          </SheetTitle>
          <SheetDescription>
            Create a new banner to apply banner.
          </SheetDescription>
        </SheetHeader>
        <BannerForm />
      </SheetContent>
    </Sheet>
  );
};

export default NewBannerSheet;
