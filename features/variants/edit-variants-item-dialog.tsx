"use client";

import VariantsItemForm from "@/app/(dashboard)/dashboard/(product)/variants/_components/variantsItemForm";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useConfirm } from "@/hooks/use-confirm";
import {
    useDeleteVariantItemMutation,
    useVariantItemQuery,
} from "@/redux/api/attributeApi";
import { onEditVariantItemClose } from "@/redux/features/variant/variantSlice";
import { IconCopy } from "@tabler/icons-react";
import { Loader2, X } from "lucide-react";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const EditVariantsItemDialog = () => {
  const [color, setColor] = useState("#000000");
  const [isOpenCopy, setIsOpenCopy] = useState(false);
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure ?",
    "Do you want to delete this category ?"
  );
  const [deleteVariantItem] = useDeleteVariantItemMutation();
  const { isOpen, id } = useSelector(
    (state: any) => state.variant.editVariantItem
  );
  const dispatch = useDispatch();
  const { data, isLoading } = useVariantItemQuery(id);
  const variantData = data?.data;

  const handelDelete = async (id: string) => {
    const ok = await confirm();
    if (ok) {
      await deleteVariantItem(id).unwrap();
      dispatch(onEditVariantItemClose());
      toast.success("Variants value deleted successfully");
    }
  };

  const handleColorChange = (event: any) => {
    setIsOpenCopy(true);
    setColor(event.target.value);
  };

  const copyColorCode = () => {
    navigator.clipboard
      .writeText(color)
      .then(() => {
        toast.success(
          <span>
            Color code copied successfully{" "}
            <span
              style={{
                backgroundColor: color,
              }}
              className=" h-1 w-1"
            >
              {color}
            </span>
          </span>
        );
      })
      .catch(() => {
        toast.error("Failed to copy color code");
      });
    setIsOpenCopy(false);
  };

  return (
    <div>
      <ConfirmDialog />
      <Dialog open={isOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Edit Variant Item
              <span className="text-sm text-gray-500"> | Update</span>
              <Button
                size="icon"
                variant="link"
                onClick={() => dispatch(onEditVariantItemClose())}
                className="absolute top-2 right-2"
              >
                <X size={14} />
              </Button>
            </DialogTitle>
            <DialogDescription>
              Update the variant item details
            </DialogDescription>
          </DialogHeader>
          <div>
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="size-2 text-muted-foreground animate-spin" />
              </div>
            ) : (
              <VariantsItemForm variantsData={variantData} />
            )}
          </div>
          <DialogFooter className="sm:justify-start flex justify-between">
            <Button
              type="button"
              variant="delete"
              onClick={() => handelDelete(id)}
            >
              Delete Variant Item
            </Button>
            <div>
              {isOpenCopy && (
                <Button size="icon" onClick={copyColorCode}>
                  <IconCopy size={17} />
                </Button>
              )}
              <Button size="icon" onClick={copyColorCode}>
                <input
                  type="color"
                  value={color}
                  onChange={handleColorChange}
                />
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditVariantsItemDialog;
