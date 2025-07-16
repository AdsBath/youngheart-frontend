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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateBannerMutation,
  useUpdateBannerMutation,
} from "@/redux/api/bannerApi";
import { IBannerFormProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader } from "@tabler/icons-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { z } from "zod";

const bannerFormSchema = z.object({
  title: z.string().optional(),
  imageUrl: z.string({
    message: "Image url is required!",
  }),
  linkUrl: z.string().optional(),
  isActive: z.boolean().default(true),
  description: z.string().default(""),
});

type BannerFormValues = z.infer<typeof bannerFormSchema>;

export default function BannerForm({ bannerData }: IBannerFormProps) {
  const [createBanner, { isLoading: bannerCreateLoading }] =
    useCreateBannerMutation();
  const [updateBanner, { isLoading: bannerUpdateLoading }] =
    useUpdateBannerMutation();

  const form = useForm<BannerFormValues>({
    resolver: zodResolver(bannerFormSchema),
    defaultValues: bannerData,
  });

  useEffect(() => {
    form.reset(
      bannerData || {
        title: "",
        imageUrl: "",
        linkUrl: "",
        isActive: false,
        description: "",
      }
    );
  }, [bannerData, form]);

  async function onSubmit(data: Partial<BannerFormValues>) {
    if (bannerData?.title) {
      const result = await updateBanner({
        id: bannerData.id,
        body: data,
      }).unwrap();
      if (result?.success) {
        toast.success("Banner updated successfully.");
      }
    } else {
      const result = await createBanner(data).unwrap();
      if (result?.success) {
        toast.success("Banner created successfully.");
        form.reset({
          title: "",
          imageUrl: "",
          linkUrl: "",
          isActive: false,
          description: "",
        });
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Banner Title <span className="text-zinc-500">(Optional)</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="c.g banner title" {...field} />
              </FormControl>
              <FormDescription>
                This is the name of your Banner. It can be changed at any time.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="linkUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Product or Category Url{" "}
                <span className="text-zinc-500">(Optional)</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="c.g product or category url" {...field} />
              </FormControl>
              <FormDescription>
                This is the name of your Product Url. It can be changed at any
                time.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Banner Image <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value || ""}
                  onChange={(image) => field.onChange(image)}
                  onRemove={() => field.onChange("")}
                />
              </FormControl>
              <FormDescription>
                This is the image of your banner. The image should be at least
                <strong className="text-blue-600"> 1920x500 pixels.</strong>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Banner Description
                <span className="text-zinc-500">(Optional)</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="c.g. banner description here ..."
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
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Banner Status</FormLabel>
                <FormDescription>
                  Banner status will be visible to users on the frontend.
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
          disabled={bannerCreateLoading || bannerUpdateLoading}
          className="w-full flex justify-center items-center"
          type="submit"
        >
          {bannerData ? (
            <div>
              <div className="w-full h-full flex justify-center items-center">
                {bannerUpdateLoading && (
                  <IconLoader className="animate-spin" size={17} />
                )}
                <p>Update Banner</p>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              {bannerCreateLoading && (
                <IconLoader className="animate-spin" size={17} />
              )}
              <p>Create Banner</p>
            </div>
          )}
        </Button>
      </form>
    </Form>
  );
}
