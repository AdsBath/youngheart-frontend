import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import ColumnTitle from "./ColumnTitle";
import ColumnItems from "./columnItems";
import { DataTableRowActions } from "./data-table-row-actions";
import { Brand } from "./schema";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";

export const columns: ColumnDef<Brand>[] = [
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Variant name" />
    ),
    cell: ({ row }: any) => (
      <div className="w-full">
        <ColumnTitle title={row.getValue("name")} id={row.original.id} />
      </div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "items",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Variants value" />
    ),
    cell: ({ row }: any) => {
      const items: any = row.getValue("items");
      const id = row.original.id;

      return <ColumnItems items={items} id={id} />;
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
        <span>{format(row.getValue("createdAt"), "dd MMM yyyy hh:mm a")}</span>
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
