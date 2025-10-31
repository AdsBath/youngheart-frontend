import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { DataTableRowActions } from "./data-table-row-actions";

export const customDesignColumns: ColumnDef<any>[] = [
  // Single consolidated card with Customer, Order and Product Design
  {
    id: "request",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Custom Design Request" />
    ),
    cell: ({ row }) => {
      const original = row.original as any;
      const pd = original?.productDesign || {};

      const fullName =
        [original?.firstName, original?.lastName].filter(Boolean).join(" ") ||
        "N/A";
      const delivery = original?.deliveryDate
        ? format(new Date(original.deliveryDate), "dd MMM yyyy")
        : "N/A";
      const created = original?.createdAt
        ? format(new Date(original.createdAt), "dd MMM yyyy hh:mm a")
        : "N/A";

      const designItems: Array<{ label: string; value: any }> = [
        { label: "Product Type", value: pd.productType },
        { label: "Leather Color", value: pd.leatherColor },
        { label: "Leather Type", value: pd.leatherType },
        { label: "Lining Type", value: pd.liningType },
        { label: "Lining Color", value: pd.liningColor },
        { label: "Metal Color", value: pd.metalColor },
        { label: "Stitching Color", value: pd.stitchingColor },
        { label: "Personalization", value: pd.personalizationType },
        { label: "Personalization Text", value: pd.personalizationText },
        { label: "Size", value: pd.size },
        { label: "Price Range", value: pd.priceRange },
        {
          label: "Delivery Date",
          value: pd.deliveryDate
            ? format(new Date(pd.deliveryDate), "dd MMM yyyy")
            : undefined,
        },
        { label: "Strap Type", value: pd.strapType },
        { label: "Eco Friendly", value: pd.ecoFriendly ? "Yes" : "No" },
        { label: "Other Details", value: pd.otherDetails },
      ];

      return (
        <div className="w-full rounded-md border p-3 bg-background">
          {/* Customer */}
          <div className="flex flex-col gap-1">
            <div className="font-semibold text-base">{fullName}</div>
            <div className="text-sm text-muted-foreground">
              {original?.email || "N/A"}
            </div>
            <div>
              <Badge variant="secondary">{original?.phone || "N/A"}</Badge>
            </div>
          </div>

          {/* Order meta */}
          <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-4">
            <div className="text-sm">
              <div className="text-muted-foreground">Design Type</div>
              <div className="font-medium">{original?.designType || "N/A"}</div>
            </div>
            <div className="text-sm">
              <div className="text-muted-foreground">Quantity</div>
              <div className="font-medium">
                {original?.numberOfDesigns || "N/A"}
              </div>
            </div>
            <div className="text-sm">
              <div className="text-muted-foreground">Delivery</div>
              <div className="font-medium">{delivery}</div>
            </div>
            <div className="text-sm">
              <div className="text-muted-foreground">Created</div>
              <div className="font-medium">{created}</div>
            </div>
          </div>

          {/* Product Design */}
          <div className="mt-4">
            <div className="text-sm font-semibold mb-2">Product Design</div>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
              {designItems.map((item) => (
                <div key={item.label} className="text-sm">
                  <div className="text-muted-foreground">{item.label}</div>
                  <div className="font-medium break-words">
                    {item.value ?? "—"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    },
    enableSorting: false,
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
