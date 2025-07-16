"use client";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/custom/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteAdminMutation } from "@/redux/api/userApi";
import { onEditAdminOpen } from "@/redux/features/admin/adminSlice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

interface DataTableRowActionsProps {
    row: any;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
    const dispatch = useDispatch();
    const [deleteAdmin] = useDeleteAdminMutation();

    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure ?",
        "Do you want to delete this admins ?"
    );

    const handelDelete = async (id: string) => {
        const ok = await confirm();

        if (ok) {
            await deleteAdmin(id).unwrap();
            toast.success("Admin deleted successfully.");
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
                        onClick={() =>
                            dispatch(onEditAdminOpen(row.original.id))
                        }
                    >
                        Edit
                        <DropdownMenuShortcut>
                            <span>⌘</span>
                            <span>E</span>
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>

                    {/* <DropdownMenuItem>Make a copy</DropdownMenuItem> */}

                    {/* <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={task.label}>
                {labels?.map((label) => (
                  <DropdownMenuRadioItem key={label.value} value={label.value}>
                    {label.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator /> */}
                    <DropdownMenuItem
                        onClick={() => handelDelete(row.original.id)}
                    >
                        Delete
                        <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
