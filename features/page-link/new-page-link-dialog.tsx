import PageLinkForm from "@/app/(dashboard)/dashboard/(storeui)/page-link/_components/page-link-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { onNewPageLinkClose } from "@/redux/features/pageLink/pageLinkSlice";
import { RootState } from "@/redux/store";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const NewPageLinkDialog = () => {
  const { isOpen } = useSelector(
    (state: RootState) => state.pageLink.newPageLink
  );
  const dispatch = useDispatch();

  return (
    <Dialog open={isOpen}>
      <DialogContent style={{ maxWidth: "700px" }}>
        <DialogHeader className="px-4">
          <DialogTitle>
            New Page
            <span className="text-sm text-gray-500"> | create</span>
            <Button
              size="icon"
              variant="link"
              onClick={() => dispatch(onNewPageLinkClose())}
              className="absolute top-2 right-2"
            >
              <X size={14} />
            </Button>
          </DialogTitle>
          <DialogDescription>
            Create a new page to apply page.
          </DialogDescription>
        </DialogHeader>
        <PageLinkForm />
      </DialogContent>
    </Dialog>
  );
};

export default NewPageLinkDialog;
