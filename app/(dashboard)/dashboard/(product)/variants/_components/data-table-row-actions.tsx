"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";

import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteVariantMutation } from "@/redux/api/attributeApi";
import { IconTrashXFilled } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

interface DataTableRowActionsProps {
  row: any;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const dispatch = useDispatch();
  const [deleteVariant] = useDeleteVariantMutation();

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure ?",
    "Do you want to delete this variants ?"
  );

  const handelDelete = async (id: string) => {
    const ok = await confirm();

    if (ok) {
      await deleteVariant(id).unwrap();
      toast.success("Variant deleted successfully");
    }
  };

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <Button
          variant="ghost"
          onClick={() => handelDelete(row.original.id)}
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted "
        >
          <IconTrashXFilled className="h-4 w-4" />
        </Button>
      </DropdownMenu>
    </>
  );
}
