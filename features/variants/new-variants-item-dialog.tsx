import VariantsItemForm from "@/app/(dashboard)/dashboard/(product)/variants/_components/variantsItemForm";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { onNewVariantItemClose } from "@/redux/features/variant/variantSlice";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const NewVariantsItemDialog = () => {
  const { isOpen, id } = useSelector(
    (state: any) => state.variant.newVariantItem
  );

  const dispatch = useDispatch();

  return (
    <div>
      <Dialog open={isOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              New Variant Item
              <span className="text-sm text-gray-500"> | Create</span>
              <Button
                size="icon"
                variant="link"
                onClick={() => dispatch(onNewVariantItemClose())}
                className="absolute top-2 right-2"
              >
                <X size={14} />
              </Button>
            </DialogTitle>
            <DialogDescription>Create a new variant item.</DialogDescription>
          </DialogHeader>
          <div>
            <VariantsItemForm id={id} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewVariantsItemDialog;
