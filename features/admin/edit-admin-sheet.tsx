"use client";

import AdminRegForm from "@/app/(dashboard)/dashboard/(user)/admins/_components/adminForm";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useAdminQuery } from "@/redux/api/userApi";
import { onCloseEditAdmin } from "@/redux/features/admin/adminSlice";
import { RootState } from "@/redux/store";

import { Loader2 } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

const EditAdminSheet = () => {
  const dispatch = useDispatch();
  const { id, isOpen } = useSelector(
    (state: RootState) => state.admin.editAdminSheet
  );
  const { data, isLoading } = useAdminQuery(id);
  const adminData = data?.data;
  return (
    <Sheet open={isOpen} onOpenChange={() => dispatch(onCloseEditAdmin())}>
      <SheetContent className="space-y-4 h-screen overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            Edit Shipping Rule{" "}
            <span className="text-sm text-gray-500">| Update</span>
          </SheetTitle>
          <SheetDescription>
            Edit the Shipping rule to apply to your products.
          </SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-2 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <AdminRegForm adminData={adminData} />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default EditAdminSheet;
