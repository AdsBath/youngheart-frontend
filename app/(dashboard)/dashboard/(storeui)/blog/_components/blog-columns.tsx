import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import BlurImage from "@/components/ui/blur-image";
import { DataTableRowActions } from "./data-table-row-action";

export const blogColumns: ColumnDef<any>[] = [
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
    accessorKey: "thumbnail",
    id: "thumbnail",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Thumbnail" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-10 h-10 aspect-square rounded-lg overflow-hidden">
          <BlurImage
            alt="thumbnail"
            className="w-[200px] h-[50px]"
            src={row.getValue("thumbnail")}
          />
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "author",
    id: "author",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="author" />
    ),
    cell: ({ row }) => (
      <div className="w-full">
        <p>
          {row.original.author.firstName ?? "N/A"}{" "}
          {row.original.author.lastName ?? "N/A"}
        </p>
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "title",
    id: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div className="w-full">
        <p>{row.getValue("title") ?? "N/A"}</p>
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "isActive",
    id: "isActive",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <div className="w-full">
        <p>{row.getValue("isActive") ? "Active" : "In-Active"}</p>
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "createdAt",
    id: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CreatedAt" />
    ),
    cell: ({ row }) => (
      <div className="w-full">
        <Badge>
          <span>
            {format(row.getValue("createdAt"), "dd MMM yyyy hh:mm a")}
          </span>
        </Badge>
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
