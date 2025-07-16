import VariantsForm from "@/app/(dashboard)/dashboard/(product)/variants/_components/variantsForm";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { onNewVariantClose } from "@/redux/features/variant/variantSlice";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const NewVariantsDialog = () => {
  const { isOpen } = useSelector((state: any) => state.variant.newVariant);

  const dispatch = useDispatch();

  return (
    <div>
      <Dialog open={isOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              New Variant
              <span className="text-sm text-gray-500"> | Create</span>
              <Button
                size="icon"
                variant="link"
                onClick={() => dispatch(onNewVariantClose())}
                className="absolute top-2 right-2"
              >
                <X size={14} />
              </Button>
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to create a new variant?
            </DialogDescription>
          </DialogHeader>
          <div>
            <VariantsForm />
          </div>
          {/* <DialogFooter className="sm:justify-start">
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogFooter> */}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewVariantsDialog;
