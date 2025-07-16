import VariantsForm from "@/app/(dashboard)/dashboard/(product)/variants/_components/variantsForm";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useVariantQuery } from "@/redux/api/attributeApi";
import { onEditVariantClose } from "@/redux/features/variant/variantSlice";
import { Loader2, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const EditVariantsDialog = () => {
  const { isOpen, id } = useSelector((state: any) => state.variant.editVariant);
  const dispatch = useDispatch();
  const { data, isLoading } = useVariantQuery(id);
  const variantData = data?.data;
  return (
    <div>
      <Dialog open={isOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Edit Variant
              <span className="text-sm text-gray-500"> | Update</span>
              <Button
                size="icon"
                variant="link"
                onClick={() => dispatch(onEditVariantClose())}
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
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="size-2 text-muted-foreground animate-spin" />
              </div>
            ) : (
              <VariantsForm variantsData={variantData} />
            )}
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

export default EditVariantsDialog;
