import PageLinkForm from "@/app/(dashboard)/dashboard/(storeui)/page-link/_components/page-link-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePageLinkQuery } from "@/redux/api/pageLinkApi";
import { onEditPageLinkClose } from "@/redux/features/pageLink/pageLinkSlice";
import { Loader2, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const EditPageLinkDialog = () => {
  const { isOpen, id } = useSelector(
    (state: any) => state.pageLink.editPageLink
  );
  const dispatch = useDispatch();
  const { data, isLoading } = usePageLinkQuery(id);
  const pageLinkData = data?.data;
  return (
    <div>
      <Dialog open={isOpen}>
        <DialogContent style={{ maxWidth: "800px" }}>
          <DialogHeader className="px-4">
            <DialogTitle>
              Edit Page
              <span className="text-sm text-gray-500"> | Update</span>
              <Button
                size="icon"
                variant="link"
                onClick={() => dispatch(onEditPageLinkClose())}
                className="absolute top-2 right-2"
              >
                <X size={14} />
              </Button>
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to create a update page?
            </DialogDescription>
          </DialogHeader>
          <div>
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="size-2 text-muted-foreground animate-spin" />
              </div>
            ) : (
              <PageLinkForm pageLinkData={pageLinkData} />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditPageLinkDialog;
