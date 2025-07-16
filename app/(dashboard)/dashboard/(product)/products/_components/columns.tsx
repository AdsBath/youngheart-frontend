import { Badge } from "@/components/ui/badge";
import BlurImage from "@/components/ui/blur-image";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ProductItem, priorities, statuses } from "./schema";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<ProductItem>[] = [
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
    accessorKey: "thumbnail",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),

    cell: ({ row }) => {
      return (
        <div className="w-10 h-10 aspect-square rounded-lg overflow-hidden">
          <BlurImage alt="thumbnail" src={row.getValue("thumbnail")} />
        </div>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "isAvailable",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Is-Stock" />
    ),
    cell: ({ row }) => {
      // const isAvailable = row.getValue("isAvailable");
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("isAvailable")
      );
      if (!priority) {
        return null;
      }
      return (
        <div className="max-w-full ">
          {/* <span>{row.original.isAvailable}</span> */}
          <Badge
            variant={
              priority.value === "inStock"
                ? "default"
                : priority.value === "outOfStock"
                ? "outline"
                : "secondary"
            }
          >
            {priority.icon && (
              <priority.icon
                className={`mr-1 h-4 w-4 ${
                  priority.value === "outOfStock" ? "text-red-500" : ""
                }`}
              />
            )}
            {priority.label}
          </Badge>
          {/* <Badge variant={isAvailable ? "secondary" : "destructive"}>
            {isAvailable ? "Available" : "Unavailable"}
          </Badge> */}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "sku",
    id: "sku",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SKU" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-full">
          <span>{row.getValue("sku")}</span>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "name",
    id: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-full">
          <span>{row.getValue("name")}</span>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "category.title",
    id: "category.title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      const category = row.getValue("category.title");
      return (
        <div className="w-full">
          <>{category}</>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "stock",
    id: "stock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stock" />
    ),
    cell: ({ row }) => {
      const qtyInStock: string = row.getValue("stock");
      return (
        <div className="w-full">
          <Badge variant="outline">{qtyInStock}</Badge>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Selling(৳)" />
    ),
    cell: ({ row }) => (
      <div className="w-full">
        <Badge variant="outline">{row.getValue("price")}</Badge>
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "discountPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Offered(৳)" />
    ),
    cell: ({ row }) => (
      <div className="w-full">
        <Badge variant="secondary">{row.getValue("discountPrice")}</Badge>
      </div>
    ),
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
        <div className="flex w-[100px] items-center">
          <Badge
            variant={
              status.value === "archived"
                ? "secondary"
                : status.value === "published"
                ? "default"
                : "destructive"
            }
          >
            {status.icon && <status.icon className={`mr-1 h-4 w-4`} />}
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
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) => (
      <div className="w-full">
        <span>
          {format(new Date(row.getValue("createdAt")), "dd MMM hh aa")}
        </span>
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },

  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
