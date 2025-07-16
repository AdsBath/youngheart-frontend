"use client";
import { Button } from "@/components/custom/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteBannerMutation } from "@/redux/api/bannerApi";
import { onEditBannerOpen } from "@/redux/features/banner/bannerSlice";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

interface DataTableRowActionsProps {
  row: any;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const dispatch = useDispatch();
  const [deleteBanner] = useDeleteBannerMutation();

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure ?",
    "Do you want to delete this banner ?"
  );

  const handelDelete = async (id: string) => {
    const ok = await confirm();

    if (ok) {
      const res = await deleteBanner(id).unwrap();
      // console.log(res);
      toast.success("Banner deleted successfully!");
    }
  };

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            onClick={() => dispatch(onEditBannerOpen(row.original.id))}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handelDelete(row.original.id)}>
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
