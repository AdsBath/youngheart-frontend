"use client";

import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

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

interface OrderRowData {
  id: string;
  status: OrderStatus;
  [key: string]: any; // additional dynamic fields
}

interface DataTableRowActionsProps {
  row: { original: OrderRowData };
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const dispatch = useDispatch();
  const [deleteOrder, { isLoading: deleting }] = useDeleteOrderMutation();
  const [updateOrderStatus, { isLoading: updating }] = useUpdateOrderStatusMutation();

  // Separate confirmations for clarity of messaging
  const [DeleteConfirmDialog, confirmDelete] = useConfirm(
    "Delete order?",
    "This action can't be undone. The order will be permanently removed."
  );
  const [StatusConfirmDialog, confirmStatus] = useConfirm(
    "Change status?",
    "Do you want to update the status of this order?"
  );

  const order = row.original;

  const statusActions: { label: string; value: OrderStatus }[] = useMemo(
    () => [
      { label: "Confirm", value: OrderStatus.CONFIRMED },
      { label: "Packing", value: OrderStatus.PACKING },
      { label: "Delivered", value: OrderStatus.DELIVERED },
      { label: "Cancel", value: OrderStatus.CANCELED },
      { label: "Exchange", value: OrderStatus.EXCHANGE },
    ],
    []
  );

  const handleDelete = useCallback(async () => {
    const ok = await confirmDelete();
    if (!ok) return;
    try {
      await deleteOrder(order.id).unwrap();
      toast.success("Order deleted successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete order");
    }
  }, [confirmDelete, deleteOrder, order.id]);

  const handleStatusChange = useCallback(
    async (status: OrderStatus) => {
      if (status === order.status) return; // no-op if same
      const ok = await confirmStatus();
      if (!ok) return;
      try {
        const res: any = await updateOrderStatus({
          id: order.id,
          body: { status },
        });
        if (res?.data?.statusCode === 200) {
          toast.success(res.data.message || "Status updated");
        } else {
          toast.error(res?.error?.data?.message || "Failed to update status");
        }
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to update status");
      }
    },
    [confirmStatus, order.id, order.status, updateOrderStatus]
  );

  return (
    <>
      <DeleteConfirmDialog />
      <StatusConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            disabled={deleting || updating}
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[170px]">
          <DropdownMenuItem onClick={() => dispatch(onEditOrderOpen(order))}>
            View
          </DropdownMenuItem>
          {statusActions.map((s) => (
            <DropdownMenuItem
              key={s.value}
              onClick={() => handleStatusChange(s.value)}
              disabled={updating || s.value === order.status}
            >
              {s.label}
            </DropdownMenuItem>
          ))}
          {order.status === OrderStatus.CANCELED && (
            <DropdownMenuItem
              onClick={handleDelete}
              disabled={deleting}
              className="text-red-600 focus:bg-red-50 focus:text-red-700 dark:text-red-500 dark:focus:bg-red-950"
            >
              Delete
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}