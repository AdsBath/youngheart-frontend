import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";

import { Badge } from "@/components/ui/badge";
import { Coupon, statuses } from "./schema";
import { DataTableRowActions } from "./data-table-row-action";

export const couponColumns: ColumnDef<Coupon>[] = [
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
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div className="w-full">
        <span>{row.getValue("title")}</span>
      </div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Code" />
    ),
    cell: ({ row }) => (
      <div className="w-full">
        <p>{row.getValue("code")}</p>
      </div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "price",
    id: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      // Get price and priceType values from row
      const price = row.getValue("price");
      const priceType = row.getValue("priceType");

      // Determine prefix based on priceType
      const prefix = priceType === "fixed" ? "$" : "%";

      return (
        <div className="w-full">
          <p>{`${price}${prefix}`}</p>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "cappedPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Capped Price" />
    ),
    cell: ({ row }) => {
      // Get price and priceType values from row
      const price = row.getValue("cappedPrice");

      return (
        <div className="w-full">
          <p>{`${price}`}</p>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "minSpent",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Min Price" />
    ),
    cell: ({ row }) => {
      // Get price and priceType values from row
      const price = row.getValue("minSpent");

      return (
        <div className="w-full">
          <p>{`${price}`}</p>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "usageLimit",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Usage Limit (order)" />
    ),
    cell: ({ row }) => {
      // Get price and priceType values from row
      const quantity = row.getValue("usageLimit");

      return (
        <div className="w-full">
          <p>{`${quantity}`}</p>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "limitPerUser",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Limit per User (order)" />
    ),
    cell: ({ row }) => {
      // Get price and priceType values from row
      const quantity = row.getValue("limitPerUser");

      return (
        <div className="w-full">
          <p>{`${quantity}`}</p>
        </div>
      );
    },
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
        <div className="flex w-[100px] items-start">
          <Badge variant={status.value ? "secondary" : "destructive"}>
            {status.icon && <status.icon size={15} className="mr-1" />}
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
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created time" />
    ),
    cell: ({ row }) => (
      <div className="w-full">
        <Badge>
          {format(row.getValue("createdAt"), "dd MMM yyyy hh:mm a")}
        </Badge>
      </div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
