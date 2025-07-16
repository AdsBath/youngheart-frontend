import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import BlurImage from "@/components/ui/blur-image";
import { IconMail, IconPhoneCall } from "@tabler/icons-react";

export const customersColumns: ColumnDef<any>[] = [
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
    accessorKey: "image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),

    cell: ({ row }) => (
      <div className="w-10 h-10 aspect-square rounded-full overflow-hidden">
        {/* <BlurImage src={row.getValue("image")} /> */}
        <BlurImage alt="thumbnail" src="/placeholder.png" />
      </div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "firstName",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-full">
          <span>
            {row.getValue("firstName")} {row.original.lastName}
          </span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "role",
    id: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => (
      <div className="w-full">
        <Badge>{row.getValue("role")}</Badge>
      </div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "email",
    id: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <div className="w-full">
        <Badge>
          <IconMail size={16} className="mr-1" /> {row.getValue("email")}
        </Badge>
      </div>
    ),
    enableSorting: false,
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
        <Badge variant="secondary">
          <IconPhoneCall size={16} className="mr-1" /> {row.getValue("phone")}
        </Badge>
      </div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "loginCount",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Login Count" />
    ),
    cell: ({ row }) => (
      <div className="w-full">
        <Badge>{row.getValue("loginCount")}</Badge>
      </div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  // {
  //   accessorKey: "isActive",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Active" />
  //   ),
  //   cell: ({ row }) => {
  //     const isActive = [
  //       { value: true, label: "Active", icon: IconProgressCheck },
  //       { value: false, label: "Inactive", icon: IconCircleDotted },
  //     ];
  //     const status = isActive.find(
  //       (tr) => tr.value === row.getValue("isActive")
  //     );

  //     if (!status) {
  //       return null;
  //     }

  //     return (
  //       <div>
  //         <Badge
  //           className={`${status.value && "text-blue-600"}`}
  //           variant={status.value ? "secondary" : "outline"}
  //         >
  //           {status.icon && <status.icon size={15} />}
  //         </Badge>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
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

  //   {
  //     id: "actions",
  //     cell: ({ row }) => <DataTableRowActions row={row} />,
  //   },
];
