import BlogForm from "@/app/(dashboard)/dashboard/(storeui)/blog/_components/blog-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useBlogQuery } from "@/redux/api/blogApi";
import { onEditBlogClose } from "@/redux/features/blog/blogSlice";
import { Loader2, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const EditBlogDialog = () => {
  const { isOpen, id } = useSelector((state: any) => state.blog.editBlog);
  const dispatch = useDispatch();
  const { data, isLoading } = useBlogQuery(id);
  const blogData = data?.data;
  // hello
  return (
    <Dialog open={isOpen}>
      <DialogContent style={{ maxWidth: "70vw" }}>
        <DialogHeader className="px-4">
          <DialogTitle>
            Edit Blog
            <span className="text-sm text-gray-500"> | Update</span>
            <Button
              size="icon"
              variant="link"
              onClick={() => dispatch(onEditBlogClose())}
              className="absolute top-2 right-2"
            >
              <X size={14} />
            </Button>
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to create a update blog?
          </DialogDescription>
        </DialogHeader>
        <div>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-2 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <BlogForm blogData={blogData} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditBlogDialog;
