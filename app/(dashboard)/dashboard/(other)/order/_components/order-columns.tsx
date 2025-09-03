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

// util – simple currency formatter (BDT fallback)
const formatMoney = (v: number | string | null | undefined) => {
    const num = typeof v === "string" ? parseFloat(v) : v ?? 0;
    try {
        return new Intl.NumberFormat("en-BD", {
            style: "currency",
            currency: "BDT",
            minimumFractionDigits: 0,
        }).format(num);
    } catch {
        return `${num}`;
    }
};

// Status & payment meta definitions
export const statuses = [
    { value: "PENDING", label: "Pending", icon: StopwatchIcon },
    { value: "CONFIRMED", label: "Confirmed", icon: CheckCircledIcon },
    { value: "PACKING", label: "Packing", icon: CircleIcon },
    { value: "DELIVERED", label: "Delivered", icon: QuestionMarkCircledIcon },
    { value: "CANCELED", label: "Canceled", icon: CrossCircledIcon },
    { value: "EXCHANGE", label: "Exchange", icon: CrossCircledIcon },
];

export const priorities = [
    { value: "cod", label: "COD", icon: IconCashBanknoteOff },
    { value: "online", label: "Online", icon: IconCashBanknote },
];
export const OrderColumns: ColumnDef<any>[] = [
    // Selection
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
    // Order meta
    {
        accessorKey: "orderId",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Order ID" />
        ),
        cell: ({ row }) => <span className="font-medium">{row.getValue("orderId")}</span>,
        enableHiding: false,
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Created" />
        ),
        cell: ({ row }) => (
            <span className="whitespace-nowrap text-xs">
                {format(row.getValue("createdAt"), "PP p")}
            </span>
        ),
        enableSorting: true,
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const status = statuses.find((s) => s.value === row.getValue("status"));
            if (!status) return null;
            const variant =
                status.value === "PENDING"
                    ? "default"
                    : status.value === "CONFIRMED"
                        ? "secondary"
                        : status.value === "PACKING"
                            ? "outline"
                            : status.value === "DELIVERED"
                                ? "success"
                                : "destructive";
            const Icon = status.icon;
            return (
                <Badge variant={variant} className="flex items-center gap-1">
                    {Icon && <Icon className="h-3.5 w-3.5" />}
                    {status.label}
                </Badge>
            );
        },
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
    },
    {
        accessorKey: "paymentMethod",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Payment" />
        ),
        cell: ({ row }) => {
            const method = priorities.find((p) => p.value === row.getValue("paymentMethod"));
            if (!method) return null;
            const Icon = method.icon;
            return (
                <Badge variant={method.value === "cod" ? "secondary" : "default"} className="flex items-center gap-1">
                    {Icon && <Icon size={14} />}
                    {method.label}
                </Badge>
            );
        },
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
    },
    // Customer info
    {
        id: "customer",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Customer" />
        ),
        cell: ({ row }) => {
            const user = row.original.user;
            if (!user) return <span className="text-xs text-muted-foreground">Guest</span>;
            return (
                <div className="flex flex-col leading-tight">
                    <span className="text-sm font-medium">{user.firstName} {user.lastName}</span>
                    <span className="text-[10px] text-muted-foreground">{user.role}</span>
                </div>
            );
        },
        enableHiding: true,
    },
    {
        id: "phone",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Phone" />
        ),
        cell: ({ row }) => <span className="text-xs">{row.original.user?.phone || "-"}</span>,
        enableHiding: true,
    },
    {
        id: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
        cell: ({ row }) => (
            <span className="text-xs truncate max-w-[160px] inline-block">
                {row.original.user?.email || "-"}
            </span>
        ),
        enableHiding: true,
    },
    // Address
    {
        accessorKey: "billingAddress",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Billing Address" />
        ),
        cell: ({ row }) => {
            const addr = row.original.billingAddress || "";
            const parts = addr.split(",").map((p: string) => p.trim());
            return (
                <div className="text-xs leading-tight">
                    {parts.map((p: string, i: number) => (
                        <span key={i} className={i > 0 ? "before:content-['•'] before:px-1" : ""}>
                            {p}
                        </span>
                    ))}
                </div>
            );
        },
        enableHiding: true,
    },
    {
        accessorKey: "shippingCharge",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Shipping" />
        ),
        cell: ({ row }) => <span className="text-xs">{formatMoney(row.original.shippingCharge)}</span>,
        enableHiding: true,
    },
    // Line items (condensed)
    {
        accessorKey: "orderItems",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Items" />
        ),
        cell: ({ row }) => {
            const items = row.original.orderItems || [];
            return (
                <div className="flex flex-col gap-2 max-w-[340px]">
                    {items.map((item: any) => {
                        const lineSubtotal = (item.price || 0) * (item.quantity || 0);
                        const afterDiscount = lineSubtotal - (item.discountAmmount || 0);
                        return (
                            <div key={item.id} className="flex gap-3 items-start">
                                <div className="h-11 w-11 overflow-hidden rounded-md bg-muted flex-shrink-0">
                                    <BlurImg
                                        src={item.productImage || item.product?.thumbnail}
                                        alt={item.productName || item.product?.name}
                                        className="h-11 w-11 object-cover"
                                    />
                                </div>
                                <div className="flex flex-col text-xs leading-tight min-w-0">
                                    <span className="font-medium truncate">{item.productName || item.product?.name}</span>
                                    <span className="text-[10px] text-muted-foreground">
                                        {item.productSku || item.product?.sku} • Qty {item.quantity}
                                    </span>
                                    <span className="text-[10px]">
                                        {formatMoney(afterDiscount)}
                                        {item.discountAmmount ? (
                                            <span className="text-[10px] text-muted-foreground ml-1 line-through">
                                                {formatMoney(lineSubtotal)}
                                            </span>
                                        ) : null}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
        },
        enableSorting: false,
        enableHiding: true,
    },
    // Financial summary
    {
        id: "itemsTotal",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Items Total" />
        ),
        cell: ({ row }) => {
            const sum = (row.original.orderItems || []).reduce(
                (acc: number, it: any) => acc + (it.price || 0) * (it.quantity || 0),
                0
            );
            return <span className="text-xs">{formatMoney(sum)}</span>;
        },
        enableHiding: true,
    },
    {
        accessorKey: "discountAmmount",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Discount" />
        ),
        cell: ({ row }) => <span className="text-xs text-destructive">-{formatMoney(row.original.discountAmmount)}</span>,
        enableHiding: true,
    },
    {
        accessorKey: "totalAmount",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Total (Incl.)" />
        ),
        cell: ({ row }) => <span className="text-xs font-medium">{formatMoney(row.original.totalAmount)}</span>,
        enableHiding: false,
    },
    {
        id: "finalAmount",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Payable" />
        ),
        cell: ({ row }) => {
            // If backend already provides final in totalAmount, compute fallback anyway
            const itemsTotal = (row.original.orderItems || []).reduce(
                (acc: number, it: any) => acc + (it.price || 0) * (it.quantity || 0),
                0
            );
            const discount = row.original.discountAmmount || 0;
            const shipping = row.original.shippingCharge || 0;
            const computed = itemsTotal - discount + shipping;
            const provided = row.original.totalAmount;
            const finalVal = provided ?? computed;
            return (
                <div className="flex flex-col text-xs">
                    <span className="font-semibold">{formatMoney(finalVal)}</span>
                    {provided !== computed && (
                        <span className="text-[10px] text-muted-foreground">calc {formatMoney(computed)}</span>
                    )}
                </div>
            );
        },
        enableHiding: false,
    },
    // Actions
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
];
