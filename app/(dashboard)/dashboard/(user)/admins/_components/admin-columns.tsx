import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  IconMail,
  IconPhoneCall,
  IconUserCheck,
  IconUserCircle,
  IconUserCode,
  IconUserHexagon,
  IconUserOff,
} from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTableRowActions } from "./data-table-row-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const statuses = [
  {
    value: true,
    label: "Active",
    icon: IconUserCheck,
  },
  {
    value: false,
    label: "Inactive",
    icon: IconUserOff,
  },
];

export const roles = [
  {
    value: "SUPER_ADMIN",
    label: "Super Admin",
    icon: IconUserCode,
  },
  {
    value: "ADMIN",
    label: "Admin",
    icon: IconUserCode,
  },
  {
    value: "MANAGER",
    label: "Manager",
    icon: IconUserCircle,
  },
  {
    value: "EMPLOYEE",
    label: "Employee",
    icon: IconUserHexagon,
  },
];

export const adminColumns: ColumnDef<any>[] = [
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
        <Avatar>
          <AvatarImage
            src={row.getValue("image")}
            alt={row.original.firstName}
          />
          <AvatarFallback>
            {row.original.firstName.charAt(0) + row.original.lastName.charAt(0)}
          </AvatarFallback>
        </Avatar>
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
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const role = roles.find(
        (priority) => priority.value === row.getValue("role")
      );

      if (!role) {
        return null;
      }

      return (
        <div className="flex items-center">
          {role.icon && (
            <role.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{role.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
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
          {" "}
          <IconMail size={16} className="mr-1" /> {row.getValue("email")}
        </Badge>
      </div>
    ),
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
        <Badge variant="secondary">
          <IconPhoneCall size={16} className="mr-1" /> {row.getValue("phone")}
        </Badge>
      </div>
    ),
    enableSorting: true,
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
            {/* {status.icon && <status.icon size={15} className="mr-1" />} */}
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
    accessorKey: "lastLogin",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Login" />
    ),
    cell: ({ row }) => (
      <div className="w-full">
        <span>{format(row.getValue("lastLogin"), "hh:mm a dd MMM ")}</span>
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created time" />
    ),
    cell: ({ row }) => (
      <div className="w-full">
        <span>{format(row.getValue("createdAt"), "dd MMM hh:mm a")}</span>
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
