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

import {
  useDeleteOrderMutation,
  useUpdateOrderStatusMutation,
} from "@/redux/api/orderApi";
import { onEditOrderOpen } from "@/redux/features/order/orderSlice";
import { OrderStatus } from "@/types";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

interface DataTableRowActionsProps {
  row: any;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const dispatch = useDispatch();
  const [DeleteOrder] = useDeleteOrderMutation();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure ?",
    "Do you want to delete this brand ?"
  );

  const handelDelete = async (id: string) => {
    const ok = await confirm();

    if (ok) {
      await DeleteOrder(id).unwrap();
      toast.success("Order deleted successfully");
    }
  };

  const handelUpdateOrderStaus = async (id: string, status: OrderStatus) => {
    const ok = await confirm();

    if (ok) {
      const statusData = {
        id,
        body: {
          status,
        },
      };

      const res = await updateOrderStatus(statusData);
      if (res?.data?.statusCode === 200) {
        toast.success(res?.data?.message);
      } else {
        toast.success(res?.error as string);
      }
      // console.log(res);
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
            onClick={() => dispatch(onEditOrderOpen(row.original))}
          >
            View
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              handelUpdateOrderStaus(row.original.id, OrderStatus.CONFIRMED)
            }
          >
            Confirm
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              handelUpdateOrderStaus(row.original.id, OrderStatus.PACKING)
            }
          >
            Packing
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              handelUpdateOrderStaus(row.original.id, OrderStatus.DELIVERED)
            }
          >
            Delivered
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              handelUpdateOrderStaus(row.original.id, OrderStatus.CANCELED)
            }
          >
            Cancel
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              handelUpdateOrderStaus(row.original.id, OrderStatus.EXCHANGE)
            }
          >
            Exchange
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
