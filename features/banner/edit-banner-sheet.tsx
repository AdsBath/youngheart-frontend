"use client";

import BannerForm from "@/app/(dashboard)/dashboard/(storeui)/banner/_components/banner-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useBannerQuery } from "@/redux/api/bannerApi";
import { onEditBannerClose } from "@/redux/features/banner/bannerSlice";
import { RootState } from "@/redux/store";
import { Loader2 } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

const EditBannerSheet = () => {
  const dispatch = useDispatch();
  const { isOpen, id } = useSelector(
    (state: RootState) => state.banner.editBanner
  );

  const { data: banner, isLoading } = useBannerQuery(id);
  const bannerData = banner?.data;

  return (
    <Sheet open={isOpen} onOpenChange={() => dispatch(onEditBannerClose())}>
      <SheetContent className="space-y-4 h-screen overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            Update Banner{" "}
            <span className="text-sm text-gray-500">| Update</span>
          </SheetTitle>
          <SheetDescription>Update a banner to apply banner.</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-2 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <BannerForm bannerData={bannerData} />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default EditBannerSheet;
