import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { DataTableRowActions } from "./data-table-row-actions";
import BlurImage from "@/components/ui/blur-image";

export const customDesignColumns: ColumnDef<any>[] = [
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
    accessorKey: "designImage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),

    cell: ({ row }) => {
      return (
        <div className="w-10 h-10 aspect-square rounded-lg overflow-hidden">
          <BlurImage
            alt="designImage"
            src={row.getValue("designImage") ?? ""}
          />
        </div>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "firstName",
    id: "firstName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="w-full">
        <p>{row.getValue("firstName") ?? "N/A"}</p>
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "email",
    id: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-full">
          <p>{row.getValue("email") ?? "N/A"}</p>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "phone",
    id: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => (
      <div className="w-full">
        <Badge variant="secondary">{row.getValue("phone") ?? "N/A"}</Badge>
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "designType",
    id: "designType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Design Type" />
    ),
    cell: ({ row }) => (
      <div className="w-full">
        <p>{row.getValue("designType") ?? "N/A"}</p>
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "numberOfDesigns",
    id: "numberOfDesigns",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row }) => (
      <div className="w-full">
        <p>{row.getValue("numberOfDesigns") ?? "N/A"}</p>
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "deliveryDate",
    id: "deliveryDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Delivery Date" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("deliveryDate");

      return (
        <div className="w-full">
          <Badge>
            {(date as string) && (
              <span>
                {format(
                  new Date(row.getValue("deliveryDate")),
                  "dd MMM yyyy hh:mm a"
                )}
              </span>
            )}
          </Badge>
        </div>
      );
    },
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
