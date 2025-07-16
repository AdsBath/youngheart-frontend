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
import {
  useCreateDiscountBannerMutation,
  useUpdateDiscountBannerMutation,
} from "@/redux/api/discountBannerApi";
import { onEditDiscountBannerClose, onNewDiscountBannerClose } from "@/redux/features/discountBanner/discountBannerSlice";
import { IDiscountBannerFormProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader } from "@tabler/icons-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { z } from "zod";

const discountBannerFormSchema = z.object({
  name: z.string().optional(),
  logo: z.string({
    message: "Logo is required!",
  }),
  banner: z.string({
    message: "Banner is required!",
  }),
  bgImage: z.string({
    message: "Background Image is required!",
  }),
  status: z.boolean().default(false),
});

type DiscountBannerFormValues = z.infer<typeof discountBannerFormSchema>;

export default function DiscountBannerForm({
  discountBannerData,
}: IDiscountBannerFormProps) {
  const [createDiscountBanner, { isLoading: discountBannerCreateLoading }] =
    useCreateDiscountBannerMutation();
  const [updateDiscountBanner, { isLoading: discountBannerUpdateLoading }] =
    useUpdateDiscountBannerMutation();

  const form = useForm<DiscountBannerFormValues>({
    resolver: zodResolver(discountBannerFormSchema),
    defaultValues: {
      name: discountBannerData?.name || "",
      logo: discountBannerData?.logo || "",
      banner: discountBannerData?.banner || "",
      bgImage: discountBannerData?.bgImage || "",
      status: discountBannerData?.status || false,
    },
  });

  useEffect(() => {
    form.reset(
      discountBannerData || {
        name: "",
        logo: "",
        banner: "",
        bgImage: "",
        status: false,
      }
    );
  }, [discountBannerData, form]);

  async function onSubmit(data: Partial<DiscountBannerFormValues>) {
    if (discountBannerData?.name) {
      const result = await updateDiscountBanner({
        id: discountBannerData.id,
        body: data,
      });
      // console.log(result, "result");
      if (result?.data?.success) {
        toast.success("Discount Banner updated successfully.");
        onEditDiscountBannerClose();
      } else {
        toast.error(result?.error as string);
      }
    } else {
      const result = await createDiscountBanner(data);
      if (result?.data?.success) {
        toast.success("Discount Banner created successfully.");
        form.reset({
          name: "",
          logo: "",
          banner: "",
          bgImage: "",
          status: false,
        });
        onNewDiscountBannerClose();
      } else {
        toast.error(result?.error as string);
      }
    }
  }

  // console.log(bannerAdData, "BannerAdData");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Discount Banner Name <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="c.g banner name" {...field} />
              </FormControl>
              <FormDescription>
                This is the name of your Discount Banner. It can be changed at
                any time.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Discount Banner Logo <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value || ""}
                  onChange={(image) => field.onChange(image)}
                  onRemove={() => field.onChange("")}
                />
              </FormControl>
              <FormDescription>
                This is the image of your discount banner. The image should be
                at least
                <strong className="text-blue-600"> 300x300 pixels.</strong>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="banner"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Discount Banner <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value || ""}
                  onChange={(image) => field.onChange(image)}
                  onRemove={() => field.onChange("")}
                />
              </FormControl>
              <FormDescription>
                This is the image of your discount banner. The image should be
                at least
                <strong className="text-blue-600"> 1920x500 pixels.</strong>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bgImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Discount Banner bg Image <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value || ""}
                  onChange={(image) => field.onChange(image)}
                  onRemove={() => field.onChange("")}
                />
              </FormControl>
              <FormDescription>
                This is the image of your discount banner. The image should be
                at least
                <strong className="text-blue-600"> 1920x500 pixels.</strong>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Discout Banner Status
                </FormLabel>
                <FormDescription>
                  Discount Banner status will be visible to users on the
                  frontend.
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
          disabled={discountBannerCreateLoading || discountBannerUpdateLoading}
          className="w-full flex justify-center items-center"
          type="submit"
        >
          {discountBannerData ? (
            <div>
              <div className="w-full h-full flex justify-center items-center">
                {discountBannerUpdateLoading && (
                  <IconLoader className="animate-spin" size={17} />
                )}
                <p>Update Banner</p>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              {discountBannerCreateLoading && (
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
