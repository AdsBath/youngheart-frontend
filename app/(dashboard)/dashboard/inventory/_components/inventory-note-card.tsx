// "use client";
// import { Button } from "@/components/ui/button";
// import { IconEdit } from "@tabler/icons-react";
// import { format } from "date-fns";
// import React from "react";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { useDispatch } from "react-redux";
// import { onEditInventoryOpen } from "@/redux/features/inventory/inventorySlice";
// interface InventoryNoteCardProps {
//   inventoryNoteData: any;
// }

// const InventoryNoteCard = ({ inventoryNoteData }: InventoryNoteCardProps) => {
//   const dispatch = useDispatch();
//   return (
//     <div className="group border p-1 relative">
//       <table className="w-full">
//         <tbody>
//           <tr className="odd:bg-gray-50">
//             <td className="w-5/12">Create Inventory note</td>
//             <td>
//               <span>
//                 :{" "}
//                 {inventoryNoteData?.createdAt
//                   ? format(inventoryNoteData?.createdAt, "PPpp")
//                   : "N/A"}
//               </span>
//             </td>
//           </tr>
//           <tr className="odd:bg-gray-50">
//             <td className="w-5/12">Suppliar Name</td>
//             <td>
//               <span>: {inventoryNoteData?.supplierName ?? "N/A"}</span>
//             </td>
//           </tr>
//           <tr className="odd:bg-gray-50">
//             <td className="w-5/12">Ware House</td>
//             <td>
//               <span>: {inventoryNoteData?.warehouseLocation ?? "N/A"}</span>
//             </td>
//           </tr>
//           <tr className="odd:bg-gray-50">
//             <td className="w-5/12">Stock In Quantity</td>
//             <td>
//               <span>: {inventoryNoteData?.stockInQuantity ?? "N/A"}</span>
//             </td>
//           </tr>
//           <tr className="odd:bg-gray-50">
//             <td className="w-5/12">Stock In Date</td>
//             <td>
//               <span>
//                 :{" "}
//                 {inventoryNoteData?.stockInDate
//                   ? format(inventoryNoteData?.stockInDate, "PPP")
//                   : "N/A"}
//               </span>
//             </td>
//           </tr>
//           <tr className="odd:bg-gray-50">
//             <td className="w-5/12">Restock Quantity</td>
//             <td>
//               <span>: {inventoryNoteData?.restockQuantity ?? "N/A"}</span>
//             </td>
//           </tr>
//           <tr className="odd:bg-gray-50">
//             <td className="w-5/12">Restock Date</td>
//             <td>
//               <span>
//                 :{" "}
//                 {inventoryNoteData?.restockDate
//                   ? format(inventoryNoteData?.restockDate, "PPP")
//                   : "N/A"}
//               </span>
//             </td>
//           </tr>
//           <tr className="odd:bg-gray-50">
//             <td className="w-5/12">Expired Date</td>
//             <td>
//               <span>
//                 :{" "}
//                 {inventoryNoteData?.expireDate
//                   ? format(inventoryNoteData?.expireDate, "PPP")
//                   : "N/A"}
//               </span>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//       <div className="absolute top-2 right-2 group-hover:block hidden z-10">
//         <TooltipProvider delayDuration={100}>
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <Button
//                 onClick={() =>
//                   dispatch(onEditInventoryOpen(inventoryNoteData?.id))
//                 }
//                 size="sm"
//                 variant="outline"
//               >
//                 <IconEdit stroke={2} />
//               </Button>
//             </TooltipTrigger>
//             <TooltipContent>
//               <p>Edit</p>
//             </TooltipContent>
//           </Tooltip>
//         </TooltipProvider>
//       </div>
//     </div>
//   );
// };

// export default InventoryNoteCard;

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { onEditInventoryOpen } from "@/redux/features/inventory/inventorySlice";
import {
  Edit,
  Package,
  Calendar,
  Truck,
  Warehouse,
  AlertTriangle,
} from "lucide-react";
import { format } from "date-fns";
import { useDispatch } from "react-redux";

interface InventoryNote {
  id: string;
  createdAt: string;
  supplierName: string;
  warehouseLocation: string;
  stockInQuantity: number;
  stockInDate: string;
  restockQuantity: number;
  restockDate: string;
  expireDate: string;
}

interface InventoryNoteCardProps {
  inventoryNoteData: InventoryNote;
}

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) => (
  <div className="flex items-center space-x-2 text-sm">
    {icon}
    <span className="font-medium text-muted-foreground">{label}:</span>
    <span>{value}</span>
  </div>
);

const formatDate = (date: string) => {
  try {
    return format(new Date(date), "PPP");
  } catch {
    return "N/A";
  }
};

export default function InventoryNoteCard({
  inventoryNoteData,
}: InventoryNoteCardProps) {
  const dispatch = useDispatch();

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary/5 pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold text-primary">
            Inventory Note
          </CardTitle>
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() =>
                    dispatch(onEditInventoryOpen(inventoryNoteData.id))
                  }
                  size="icon"
                  variant="ghost"
                >
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit inventory note</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-xs text-muted-foreground">
          Created on {formatDate(inventoryNoteData.createdAt)}
        </p>
      </CardHeader>
      <CardContent className="pt-4 grid gap-3">
        <InfoRow
          icon={<Truck className="h-4 w-4 text-primary" />}
          label="Supplier"
          value={inventoryNoteData.supplierName || "N/A"}
        />
        <InfoRow
          icon={<Warehouse className="h-4 w-4 text-primary" />}
          label="Warehouse"
          value={inventoryNoteData.warehouseLocation || "N/A"}
        />
        <InfoRow
          icon={<Package className="h-4 w-4 text-primary" />}
          label="Stock In"
          value={`${inventoryNoteData.stockInQuantity || "N/A"} on ${formatDate(
            inventoryNoteData.stockInDate
          )}`}
        />
        <InfoRow
          icon={<Package className="h-4 w-4 text-primary" />}
          label="Restock"
          value={`${inventoryNoteData.restockQuantity || "N/A"} on ${formatDate(
            inventoryNoteData.restockDate
          )}`}
        />
        <InfoRow
          icon={<AlertTriangle className="h-4 w-4 text-warning" />}
          label="Expires"
          value={formatDate(inventoryNoteData.expireDate)}
        />
      </CardContent>
    </Card>
  );
}

// import { useDispatch } from "react-redux";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { onEditInventoryOpen } from "@/redux/features/inventory/inventorySlice";
// import {
//   Edit,
//   Package,
//   Calendar,
//   Truck,
//   Warehouse,
//   AlertTriangle,
// } from "lucide-react";
// import { format } from "date-fns";

// interface InventoryNote {
//   id: string;
//   createdAt: string;
//   supplierName: string;
//   warehouseLocation: string;
//   stockInQuantity: number;
//   stockInDate: string;
//   restockQuantity: number;
//   restockDate: string;
//   expireDate: string;
// }

// interface InventoryNoteCardProps {
//   inventoryNoteData: InventoryNote;
// }

// const InfoRow = ({
//   icon,
//   label,
//   value,
// }: {
//   icon: React.ReactNode;
//   label: string;
//   value: string | number;
// }) => (
//   <div className="flex items-center space-x-2 text-sm">
//     {icon}
//     <span className="font-medium text-muted-foreground">{label}:</span>
//     <span>{value}</span>
//   </div>
// );

// const formatDate = (date: string) => {
//   try {
//     return format(new Date(date), "PPP");
//   } catch {
//     return "N/A";
//   }
// };

// export default function InventoryNoteCard({
//   inventoryNoteData,
// }: InventoryNoteCardProps) {
//   const dispatch = useDispatch();

//   return (
//     <Card className="overflow-hidden">
//       <CardHeader className="bg-primary/5 pb-2">
//         <div className="flex justify-between items-start">
//           <CardTitle className="text-lg font-semibold text-primary">
//             Inventory Note
//           </CardTitle>
//           <TooltipProvider delayDuration={100}>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <Button
//                   onClick={() =>
//                     dispatch(onEditInventoryOpen(inventoryNoteData.id))
//                   }
//                   size="icon"
//                   variant="ghost"
//                 >
//                   <Edit className="h-4 w-4" />
//                   <span className="sr-only">Edit inventory note</span>
//                 </Button>
//               </TooltipTrigger>
//               <TooltipContent>
//                 <p>Edit</p>
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//         </div>
//         <p className="text-xs text-muted-foreground">
//           Created on {formatDate(inventoryNoteData.createdAt)}
//         </p>
//       </CardHeader>
//       <CardContent className="pt-4 grid gap-3">
//         <InfoRow
//           icon={<Truck className="h-4 w-4 text-primary" />}
//           label="Supplier"
//           value={inventoryNoteData.supplierName || "N/A"}
//         />
//         <InfoRow
//           icon={<Warehouse className="h-4 w-4 text-primary" />}
//           label="Warehouse"
//           value={inventoryNoteData.warehouseLocation || "N/A"}
//         />
//         <InfoRow
//           icon={<Package className="h-4 w-4 text-primary" />}
//           label="Stock In"
//           value={`${inventoryNoteData.stockInQuantity || "N/A"} on ${formatDate(
//             inventoryNoteData.stockInDate
//           )}`}
//         />
//         <InfoRow
//           icon={<Package className="h-4 w-4 text-primary" />}
//           label="Restock"
//           value={`${inventoryNoteData.restockQuantity || "N/A"} on ${formatDate(
//             inventoryNoteData.restockDate
//           )}`}
//         />
//         <InfoRow
//           icon={<AlertTriangle className="h-4 w-4 text-warning" />}
//           label="Expires"
//           value={formatDate(inventoryNoteData.expireDate)}
//         />
//       </CardContent>
//     </Card>
//   );
// }
