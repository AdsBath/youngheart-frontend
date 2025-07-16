"use client";

import AdminRegForm from "@/app/(dashboard)/dashboard/(user)/admins/_components/adminForm";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { onCloseAdmin } from "@/redux/features/admin/adminSlice";
import { RootState } from "@/redux/store";

import { useDispatch, useSelector } from "react-redux";

const NewAdminSheet = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: RootState) => state.admin.newAdminSheet.isOpen
  );
  return (
    <Sheet open={isOpen} onOpenChange={() => dispatch(onCloseAdmin())}>
      <SheetContent className="space-y-4 h-screen overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            New Admin <span className="text-sm text-gray-500">| Create</span>
          </SheetTitle>
          <SheetDescription>
            Create a new Admin to manage your products.
          </SheetDescription>
        </SheetHeader>
        {/* Admin reg from */}
        <AdminRegForm />
      </SheetContent>
    </Sheet>
  );
};

export default NewAdminSheet;
