import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";

import { Badge } from "@/components/ui/badge";
import { DataTableRowActions } from "./data-table-row-action";
import { Coupon, statuses } from "./schema";

export const shippingRulesColumns: ColumnDef<Coupon>[] = [
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
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="w-full">
        <span>{row.getValue("name")}</span>
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "shippingCost",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Shipping Cost" />
    ),
    cell: ({ row }) => {
      const price = row.getValue("shippingCost");

      return (
        <div className="w-full">
          <p>{`${price}`}</p>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "minOrderValue",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Min Order Value" />
    ),
    cell: ({ row }) => {
      // Get price and priceType values from row
      const price = row.getValue("minOrderValue");

      return (
        <div className="w-full">
          <p>{`${price}`}</p>
        </div>
      );
    },
    enableSorting: true,
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
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
