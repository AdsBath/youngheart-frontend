"use client";

import { Button } from "@/components/custom/button";
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
import {
  useCreatePageLinkMutation,
  useUpdatePageLinkMutation,
} from "@/redux/api/pageLinkApi";
import { IPageLinkFormProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader } from "@tabler/icons-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "sonner";

import { z } from "zod";

const pageLinkFormSchema = z.object({
  title: z.string().optional(),
  content: z.string({
    message: "Content is required!",
  }),
  isActive: z.boolean().default(true),
  displayOrder: z
    .preprocess(
      (val) => Number(val),
      z.number().int().positive({
        message: "Dispaly order must be a positive integer.",
      })
    )
    .optional(),
  shortDescription: z.string().optional(),
});

type PageLinkFormValues = z.infer<typeof pageLinkFormSchema>;

export default function PageLinkForm({ pageLinkData }: IPageLinkFormProps) {
  const [createPageLink, { isLoading: pageLinkCreateLoading }] =
    useCreatePageLinkMutation();
  const [updatePageLink, { isLoading: pageLinkUpdateLoading }] =
    useUpdatePageLinkMutation();

  const form = useForm<PageLinkFormValues>({
    resolver: zodResolver(pageLinkFormSchema),
    defaultValues: {
      title: pageLinkData?.title || "",
      content: pageLinkData?.content || "",
      displayOrder: pageLinkData?.displayOrder || 0,
      isActive: pageLinkData?.isActive || false,
      shortDescription: pageLinkData?.shortDescription || "",
    },
  });

  useEffect(() => {
    form.reset(
      pageLinkData || {
        title: "",
        content: "",
        isActive: false,
        displayOrder: 0,
        shortDescription: "",
      }
    );
  }, [pageLinkData, form]);

  async function onSubmit(data: Partial<PageLinkFormValues>) {
    if (pageLinkData?.title) {
      const result = await updatePageLink({
        id: pageLinkData.id,
        body: data,
      });
      // console.log(result, "result");
      if (result?.data?.success) {
        toast.success("Page Link updated successfully.");
      } else {
        toast.error(result?.error as string);
      }
    } else {
      const result = await createPageLink(data);
      if (result?.data?.success) {
        toast.success("Page Link created successfully.");
        form.reset({
          title: "",
          content: "",
          isActive: false,
          displayOrder: 0,
          shortDescription: "",
        });
      } else {
        toast.error(result?.error as string);
      }
    }
  }

  return (
    <Form {...form}>
      <ScrollArea className="h-[500px] w-full p-0 m-0">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Page Link Title <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="c.g page Link title" {...field} />
                </FormControl>
                <FormDescription>
                  This is the name of your Page Link. It can be changed at any
                  time.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="displayOrder"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Display Order <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="c.g display order"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="shortDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Short Description &nbsp;
                  <span className="text-zinc-500">(Optional)</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="c.g. page link description here ..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>

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
                    theme="snow" // or 'bubble'
                    value={field.value}
                    onChange={(content) => {
                      field.onChange(content);
                    }}
                    placeholder="e.g. content is here..."
                    className="custom-quill"
                  />
                </FormControl>
                <FormDescription>
                  A content of the product. This will appear on the page link.
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
                  <FormLabel className="text-base">Page Link Status</FormLabel>
                  <FormDescription>
                    Page Link status will be visible to users on the frontend.
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
          <Button
            disabled={pageLinkCreateLoading || pageLinkUpdateLoading}
            className="w-full flex justify-center items-center"
            type="submit"
          >
            {pageLinkData ? (
              <div>
                <div className="w-full h-full flex justify-center items-center">
                  {pageLinkUpdateLoading && (
                    <IconLoader className="animate-spin" size={17} />
                  )}
                  <p>Update Page Link</p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                {pageLinkCreateLoading && (
                  <IconLoader className="animate-spin" size={17} />
                )}
                <p>Create Page Link</p>
              </div>
            )}
          </Button>
        </form>
      </ScrollArea>
    </Form>
  );
}
