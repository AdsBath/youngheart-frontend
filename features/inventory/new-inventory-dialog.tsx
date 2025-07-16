import InventoryForm from "@/app/(dashboard)/dashboard/inventory/_components/inventory-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { onNewInventoryClose } from "@/redux/features/inventory/inventorySlice";
import { RootState } from "@/redux/store";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const NewInventoryDialog = () => {
  const { isOpen, id } = useSelector(
    (state: RootState) => state.inventory.newInventory
  );
  const dispatch = useDispatch();

  return (
    <div>
      <Dialog open={isOpen}>
        <DialogContent style={{ maxWidth: "800px", width: "90%" }}>
          <DialogHeader>
            <DialogTitle>
              Next shipping
              <span className="text-sm text-gray-500"> | Added</span>
              <Button
                size="icon"
                variant="link"
                onClick={() => dispatch(onNewInventoryClose())}
                className="absolute top-2 right-2"
              >
                <X size={14} />
              </Button>
            </DialogTitle>
            <DialogDescription>
              Next shipping inventory will be added to the inventory list.
            </DialogDescription>
          </DialogHeader>

          <InventoryForm id={id} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewInventoryDialog;
