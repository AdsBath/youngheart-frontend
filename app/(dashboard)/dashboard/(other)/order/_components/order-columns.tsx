import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import BlurImg from "@/components/custom/blur-img";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import {
    CheckCircledIcon,
    CrossCircledIcon,
    QuestionMarkCircledIcon,
    StopwatchIcon,
} from "@radix-ui/react-icons";
import { IconCashBanknote, IconCashBanknoteOff } from "@tabler/icons-react";
import { CircleIcon } from "lucide-react";
import { DataTableRowActions } from "./data-table-row-actions";

export const statuses = [
    {
        value: "PENDING",
        label: "Pending",
        icon: StopwatchIcon,
    },
    {
        value: "CONFIRMED",
        label: "Confirmed",
        icon: CheckCircledIcon,
    },
    {
        value: "PACKING",
        label: "Packing",
        icon: CircleIcon,
    },
    {
        value: "DELIVERED",
        label: "Delivered",
        icon: QuestionMarkCircledIcon,
    },
    {
        value: "CANCELED",
        label: "Canceled",
        icon: CrossCircledIcon,
    },
    {
        value: "EXCHANGE",
        label: "Exchange",
        icon: CrossCircledIcon,
    },
];

export const priorities = [
    {
        value: "cod",
        label: "COD",
        icon: IconCashBanknoteOff,
    },
    {
        value: "online",
        label: "Online",
        icon: IconCashBanknote,
    },
];

export const OrderColumns: ColumnDef<any>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "orderId",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Order Id" />
        ),
        cell: ({ row }) => (
            <div className="w-full">
                <span>{row.getValue("orderId")}</span>
            </div>
        ),
        enableSorting: false,
        enableHiding: true,
    },
    {
        accessorKey: "paymentMethod",
        id: "paymentMethod",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Payment Method" />
        ),
        cell: ({ row }) => {
            const priority = priorities.find(
                (priority) => priority.value === row.getValue("paymentMethod")
            );
            if (!priority) {
                return null;
            }

            return (
                <div className=" w-full text-sm">
                    <Badge
                        variant={
                            priority.value === "cod" ? "secondary" : "default"
                        }
                    >
                        {priority.icon && (
                            <priority.icon size={15} className="mr-1" />
                        )}
                        {priority.label}
                    </Badge>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },

    {
        accessorKey: "billingAddress",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Address" />
        ),
        cell: ({ row }) => (
            <div className="w-full">
                <span>
                    {row.original.billingAddress.split(",")[2]},{" "}
                    {row.original.billingAddress.split(",")[3]}
                </span>
                <br />
                <span>
                    {row.original.billingAddress.split(",")[0]},{" "}
                    {row.original.billingAddress.split(",")[1]}
                </span>
            </div>
        ),
        enableSorting: false,
        enableHiding: true,
    },

    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const status = statuses.find(
                (status) => status.value === row.getValue("status")
            );

            if (!status) {
                return null;
            }

            return (
                <div className=" w-full ">
                    <Badge
                        variant={
                            status.value === "PENDING"
                                ? "default"
                                : status.value === "CONFIRMED"
                                ? "secondary"
                                : status.value === "PACKING"
                                ? "outline"
                                : status.value === "DELIVERED"
                                ? "success"
                                : "destructive"
                        }
                    >
                        {status.icon && (
                            <status.icon size={15} className="mr-1" />
                        )}
                        {status.label}
                    </Badge>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },

    {
        accessorKey: "orderItems",
        id: "orderItems",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Order Items" />
        ),
        cell: ({ row }) => {
            const cartItems = row.original.orderItems;
            return (
                <div className="w-full flex flex-col gap-2">
                    {cartItems?.map((item: any) => {
                        return (
                            <div
                                key={item.id}
                                className="flex gap-4 items-center"
                            >
                                <div className=" bg-gray-300 rounded-md">
                                    <BlurImg
                                        src={item.product?.thumbnail}
                                        alt={item.product?.name}
                                        className="w-11 h-11"
                                    />
                                </div>
                                <div className="flex flex-col  ">
                                    <span className="text-sm leading-none">
                                        {item.product?.name}
                                    </span>
                                    <span className="text-[11px] leading-none mt-[4px] font-bold">
                                        {item.color} | {item.size} x{" "}
                                        {item.quantity}
                                    </span>
                                </div>
                                {/* <span className="text-[11px] leading-none font-semibold">
                  {item.product?.price} x {item.quantity} ={" "}
                  {item.product?.price * item.quantity}
                </span> */}
                            </div>
                        );
                    })}
                </div>
            );
        },
        enableSorting: false,
        enableHiding: true,
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Created time" />
        ),
        cell: ({ row }) => (
            <div className="w-full">
                <span>{format(row.getValue("createdAt"), "PPpp")}</span>
            </div>
        ),
        enableSorting: true,
        enableHiding: true,
    },
    // {
    //   accessorKey: "updatedAt",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Updated time" />
    //   ),
    //   cell: ({ row }) => (
    //     <div className="w-full">
    //       <span>{format(row.getValue("updatedAt"), "PPpp")}</span>
    //     </div>
    //   ),
    //   enableSorting: true,
    //   enableHiding: true,
    // },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
];
