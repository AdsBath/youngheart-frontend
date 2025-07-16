import InventoryForm from "@/app/(dashboard)/dashboard/inventory/_components/inventory-form";
import Loading from "@/components/loding";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useInventoryNoteQuery } from "@/redux/api/inventoryApi";
import { onEditInventoryClose } from "@/redux/features/inventory/inventorySlice";
import { RootState } from "@/redux/store";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const EditInventoryDialog = () => {
  const { isOpen, id } = useSelector(
    (state: RootState) => state.inventory.editInventory
  );

  const { data, isLoading } = useInventoryNoteQuery(id);
  const dispatch = useDispatch();

  return (
    <div>
      <Dialog open={isOpen}>
        <DialogContent style={{ maxWidth: "800px", width: "90%" }}>
          <DialogHeader>
            <DialogTitle>
              Edit Inventory
              <span className="text-sm text-gray-500"> | Update</span>
              <Button
                size="icon"
                variant="link"
                onClick={() => dispatch(onEditInventoryClose())}
                className="absolute top-2 right-2"
              >
                <X size={14} />
              </Button>
            </DialogTitle>
            <DialogDescription>
              Update inventory details here.
            </DialogDescription>
          </DialogHeader>
          <div>
            {isLoading && <Loading />}
            <InventoryForm id={id} inventoryData={data?.data} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditInventoryDialog;
