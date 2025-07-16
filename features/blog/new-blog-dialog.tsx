import BlogForm from "@/app/(dashboard)/dashboard/(storeui)/blog/_components/blog-form";
import CareerForm from "@/app/(dashboard)/dashboard/(storeui)/career/_components/career-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { onNewBlogClose } from "@/redux/features/blog/blogSlice";
import { RootState } from "@/redux/store";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const NewBlogDialog = () => {
  const { isOpen } = useSelector((state: RootState) => state.blog.newBlog);
  const dispatch = useDispatch();

  return (
    <Dialog open={isOpen}>
      <DialogContent style={{ maxWidth: "70vw" }}>
        <DialogHeader className="px-4">
          <DialogTitle>
            New Blog
            <span className="text-sm text-gray-500"> | create</span>
            <Button
              size="sm"
              variant="link"
              onClick={() => dispatch(onNewBlogClose())}
              className="absolute top-2 right-2"
            >
              <X size={14} />
            </Button>
          </DialogTitle>
          <DialogDescription>
            Create a new blog to apply blog.
          </DialogDescription>
        </DialogHeader>

        <BlogForm />
      </DialogContent>
    </Dialog>
  );
};

export default NewBlogDialog;
