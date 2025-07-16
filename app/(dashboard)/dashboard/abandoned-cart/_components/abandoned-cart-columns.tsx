import BlurImg from "@/components/custom/blur-img";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { IconMail, IconPhoneCall } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTableRowActions } from "./data-table-row-actions";

// {
//   id: 'e2e9432c-0791-42ca-8332-fe3fab90fd1a',
//   userId: 'd911ee0e-7daa-44de-91e4-292ee9d268ce',
//   firstName: 'FAYSAL',
//   lastName: 'HOSSAIN',
//   email: 'f4faysals@gmail.com',
//   phone: '01865600004',
//   district: 'Pabna',
//   apartment: 'ishwardi bazar',
//   status: true,
//   createdAt: '2024-06-29T03:46:55.340Z',
//   updatedAt: '2024-06-29T10:52:02.157Z',
//   abandonedCartItems: [
//     {
//       id: '03a7591d-1eea-48a7-85f3-614b96922d87',
//       quantity: 3,
//       color: 'Black',
//       size: 'Large',
//       createdAt: '2024-06-29T10:52:02.163Z',
//       updatedAt: '2024-06-29T10:52:02.163Z',
//       abandonedCartId: 'e2e9432c-0791-42ca-8332-fe3fab90fd1a',
//       productId: '3655cac2-6670-4b36-8e2d-4867f664899d'
//     },
//     {
//       id: '6ec63faf-e2e0-416b-96b7-9d4afa5432ca',
//       quantity: 8,
//       color: 'Black',
//       size: 'Large',
//       createdAt: '2024-06-29T10:52:02.163Z',
//       updatedAt: '2024-06-29T10:52:02.163Z',
//       abandonedCartId: 'e2e9432c-0791-42ca-8332-fe3fab90fd1a',
//       productId: '3e91ad8c-a4b5-4b7a-8ab0-ccf31c206ed9'
//     },
//     {
//       id: 'd2b4e243-5e38-480e-a813-9b4bfba997f4',
//       quantity: 1,
//       color: 'Black',
//       size: 'Large',
//       createdAt: '2024-06-29T10:52:02.163Z',
//       updatedAt: '2024-06-29T10:52:02.163Z',
//       abandonedCartId: 'e2e9432c-0791-42ca-8332-fe3fab90fd1a',
//       productId: '35dc9028-0b4a-4eb9-81b0-2658fa6b7640'
//     }
//   ]
// },

export const abandonedCartColumns: ColumnDef<any>[] = [
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
        accessorKey: "email",
        id: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
        cell: ({ row }) => (
            <div className="w-full">
                <Badge>
                    {row.original.email && (
                        <>
                            <IconMail size={16} className="mr-1" />{" "}
                            {row.getValue("email")}
                        </>
                    )}
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
                    {row.original.phone && (
                        <>
                            <IconPhoneCall size={16} className="mr-1" />{" "}
                            {row.getValue("phone")}
                        </>
                    )}
                </Badge>
            </div>
        ),
        enableSorting: false,
        enableHiding: true,
    },
    {
        accessorKey: "apartment",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Address" />
        ),
        cell: ({ row }) => {
            return (
                <div className="w-full capitalize">
                    <span>
                        {row.getValue("apartment")}
                        {row.original.district && ","} {row.original.district}
                    </span>
                </div>
            );
        },
        enableSorting: false,
        enableHiding: true,
    },
    {
        accessorKey: "abandonedCartItems",
        id: "abandonedCartItems",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Cart Items" />
        ),
        cell: ({ row }) => {
            const cartItems = row.original.abandonedCartItems;
            // console.log(cartItems, "cartItems");
            return (
                <div className="w-full flex flex-col gap-2">
                    {cartItems?.map((item: any) => {
                        return (
                            <div
                                key={item.id}
                                className="flex gap-2 items-center"
                            >
                                <BlurImg
                                    src={item.product?.thumbnail}
                                    alt="item.product?.image"
                                    className="w-11 h-11 rounded-md"
                                />

                                <div className="flex flex-col w-fit ">
                                    <span className="text-[12px] font-semibold leading-none w-fit">
                                        {item.product?.name.slice(0, 20) + ".."}
                                    </span>
                                    <span className="text-[10px] leading-none mt-[2px]">
                                        {item.color} | {item.size}
                                    </span>
                                    <span className="text-[10px] leading-none mt-[3px] font-bold">
                                        {format(
                                            item.createdAt,
                                            "dd MMM yyyy hh:mm a"
                                        )}
                                    </span>
                                </div>
                                <span className="text-[11px] leading-none font-semibold">
                                    {item.product?.price} x {item.quantity} ={" "}
                                    {item.product?.price * item.quantity}
                                </span>
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
                <span>
                    {format(row.getValue("createdAt"), "dd MMM yy hh:mm")}
                </span>
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
    //       <span>{format(row.getValue("updatedAt"), "dd MMM yyyy hh:mm a")}</span>
    //     </div>
    //   ),
    //   enableSorting: true,
    //   enableHiding: true,
    // },
    {
        accessorKey: "isUser",
        id: "user.isUser",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Role" />
        ),
        cell: ({ row }) => (
            <div className="w-full">
                <Badge>{row.original.user.isUser ? "User" : "Guest"}</Badge>
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
