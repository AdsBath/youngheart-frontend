import CareerForm from "@/app/(dashboard)/dashboard/(storeui)/career/_components/career-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { onNewCareerClose } from "@/redux/features/career/careerSlice";
import { RootState } from "@/redux/store";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const NewCareerDialog = () => {
  const { isOpen } = useSelector((state: RootState) => state.career.newCareer);
  const dispatch = useDispatch();

  return (
    <Dialog open={isOpen}>
      <DialogContent style={{ maxWidth: "800px" }}>
        <DialogHeader className="px-4">
          <DialogTitle>
            New Career
            <span className="text-sm text-gray-500"> | create</span>
            <Button
              size="sm"
              variant="link"
              onClick={() => dispatch(onNewCareerClose())}
              className="absolute top-2 right-2"
            >
              <X size={14} />
            </Button>
          </DialogTitle>
          <DialogDescription>
            Create a new career to apply career.
          </DialogDescription>
        </DialogHeader>

        <CareerForm />
      </DialogContent>
    </Dialog>
  );
};

export default NewCareerDialog;
