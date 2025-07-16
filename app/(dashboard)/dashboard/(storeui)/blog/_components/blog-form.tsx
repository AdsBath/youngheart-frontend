"use client";

import { Button } from "@/components/custom/button";
import ImageUpload from "@/components/imageUpload";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import ImageUploader from "@/lib/imageUpload";

import {
  useCreateBlogMutation,
  useUpdateBlogMutation,
} from "@/redux/api/blogApi";
import {
  onEditBlogClose,
  onNewBlogClose,
} from "@/redux/features/blog/blogSlice";
import { IBlogFormProps } from "@/types";
import { getUserInfo } from "@/utils/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader } from "@tabler/icons-react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import { z } from "zod";

const blogFormSchema = z.object({
  title: z.string({
    message: "Title is required!",
  }),
  shortDescription: z.string().optional(),
  content: z.string({
    message: "content is required!",
  }),

  thumbnail: z.string({
    message: "Thumbnail is required!",
  }),
  isActive: z.boolean().default(true),
  meta_title: z.string({ message: "Meta title is required!!" }),
  meta_description: z.string({ message: "Meta description is required!!" }),
  authorId: z.string().optional(),
});

type BlogFormValues = z.infer<typeof blogFormSchema>;

export default function BlogForm({ blogData: blogData }: IBlogFormProps) {
  const [createBlog, { isLoading: blogCreateLoading }] =
    useCreateBlogMutation();
  const [updateBlog, { isLoading: blogUpdateLoading }] =
    useUpdateBlogMutation();
  const { userId } = getUserInfo() as {
    userId: string;
  };
  const reactQuillRef = useRef<ReactQuill>(null);
  const dispatch = useDispatch();
  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: blogData?.title || "",
      thumbnail: blogData?.thumbnail || "",
      isActive: blogData?.isActive || false,
      shortDescription: blogData?.shortDescription || "",
      content: blogData?.content || "",
    },
  });

  useEffect(() => {
    form.reset(
      blogData || {
        title: "",
        thumbnail: "",
        isActive: false,
        shortDescription: "",
        content: "",
      }
    );
  }, [blogData, form]);

  async function onSubmit(data: Partial<BlogFormValues>) {
    data.authorId = userId;
    if (blogData?.title) {
      const result = await updateBlog({
        id: blogData.id,
        body: data,
      });
      // console.log(result, "result");
      if (result?.data?.success) {
        toast.success(result?.data?.message);
        dispatch(onEditBlogClose());
      } else {
        toast.error(result?.error as string);
      }
    } else {
      const result = await createBlog(data);
      if (result?.data?.success) {
        toast.success(result?.data?.message);
        form.reset({
          title: "",
          thumbnail: "",
          isActive: false,
          shortDescription: "",
          content: "",
        });
        dispatch(onNewBlogClose());
      } else {
        toast.error(result?.error as string);
      }
    }
  }
  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      if (input !== null && input.files !== null) {
        const file = input.files[0];
        const url = await ImageUploader(file);
        const quill = reactQuillRef.current;
        if (quill) {
          const range = quill.getEditorSelection();
          range && quill.getEditor().insertEmbed(range.index, "image", url);
        }
      }
    };
  }, []);
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code-block"],
          [{ header: 1 }, { header: 2 }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ direction: "rtl" }],
          [{ size: ["small", false, "large", "huge"] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }],
          [{ font: [] }],
          [{ align: [] }],
          ["image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    [imageHandler]
  );

  return (
    <Form {...form}>
      <ScrollArea className="h-[80vh] w-full p-0 m-0">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Blog Title <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="c.g blog title" {...field} />
                </FormControl>
                <FormDescription>
                  This is the name of your Blog. It can be changed at any time.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Thumbnail <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value || ""}
                    onChange={(image) => field.onChange(image)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormDescription>
                  This is the thumbnail of your blog. The thumbnail should be at
                  least
                  <strong className="text-blue-600"> 800x800 pixels.</strong>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Content &nbsp;
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <ReactQuill
                    ref={reactQuillRef}
                    theme="snow" // or 'bubble'
                    value={field.value}
                    onChange={(content) => {
                      field.onChange(content);
                    }}
                    modules={modules}
                    placeholder="e.g. content is here..."
                    className="custom-quill"
                    formats={[
                      "header",
                      "font",
                      "size",
                      "bold",
                      "italic",
                      "underline",
                      "strike",
                      "blockquote",
                      "list",
                      "bullet",
                      "indent",
                      "link",
                      "image",
                      "video",
                      "code-block",
                    ]}
                  />
                </FormControl>
                <FormDescription>
                  A content of the career. This will appear on the career.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Blog Status</FormLabel>
                  <FormDescription>
                    Blog status will be visible to users on the frontend.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="meta_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Meta Title <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="e.g. meta title here..." {...field} />
                </FormControl>
                <FormDescription>
                  Maximum length: 60 characters. Minimum length: 50 characters.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="meta_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Meta Description <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g. meta description here..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Maximum length: 155 characters. Minimum length: 70 characters.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={blogCreateLoading || blogUpdateLoading}
            className="w-full flex justify-center items-center"
            type="submit"
          >
            {blogData ? (
              <div>
                <div className="w-full h-full flex justify-center items-center">
                  {blogUpdateLoading && (
                    <IconLoader className="animate-spin" size={17} />
                  )}
                  <p>Update Blog</p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                {blogCreateLoading && (
                  <IconLoader className="animate-spin" size={17} />
                )}
                <p>Create Blog</p>
              </div>
            )}
          </Button>
        </form>
      </ScrollArea>
    </Form>
  );
}
