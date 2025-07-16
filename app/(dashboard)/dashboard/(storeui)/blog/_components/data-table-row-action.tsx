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
import { useDeleteBlogMutation } from "@/redux/api/blogApi";
import { onEditBlogOpen } from "@/redux/features/blog/blogSlice";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

interface DataTableRowActionsProps {
  row: any;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const dispatch = useDispatch();
  const [deleteBlog] = useDeleteBlogMutation();

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure ?",
    "Do you want to delete this blog ?"
  );

  const handelDelete = async (id: string) => {
    const ok = await confirm();

    if (ok) {
      const res = await deleteBlog(id).unwrap();
      // console.log(res);
      toast.success("Blog deleted successfully!");
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
            onClick={() => dispatch(onEditBlogOpen(row.original.id))}
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
