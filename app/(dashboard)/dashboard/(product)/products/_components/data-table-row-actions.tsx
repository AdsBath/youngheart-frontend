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
import { useDeleteProductMutation } from "@/redux/api/productApi";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

interface DataTableRowActionsProps {
    row: any;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
    const dispatch = useDispatch();
    const [deleteProduct] = useDeleteProductMutation();

    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure ?",
        "Do you want to delete this product ?"
    );

    const handelDelete = async (id: string) => {
        const ok = await confirm();

        if (ok) {
            const res = await deleteProduct(id).unwrap();
            toast.success("Product deleted successfully.");
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
                    <Link
                        href={`/dashboard/products/edit-product/${row.original.id}`}
                    >
                        <DropdownMenuItem>
                            Edit
                            <DropdownMenuShortcut>
                                <span>⌘</span>
                                <span>E</span>
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
                    {/* <DropdownMenuItem
            onClick={() => dispatch(onNewInventoryOpen(row.original.id))}
          >
            Next Shipment
          </DropdownMenuItem> */}
                    <Link href={`/product/${row.original.slug}`}>
                        <DropdownMenuItem>
                            View
                            <DropdownMenuShortcut>
                                <span>⌘</span>
                                <span>V</span>
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
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
