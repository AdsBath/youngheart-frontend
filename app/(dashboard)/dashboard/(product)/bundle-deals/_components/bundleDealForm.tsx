"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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
  useCreateBundleDiscountMutation,
  useUpdateBundleDiscountMutation,
} from "@/redux/api/bundleDiscountApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader } from "@tabler/icons-react";

const BundleDiscountFormSchema = z.object({
  name: z.string().min(3, {
    message: "Name should be at least 4 characters long.",
  }),
  free: z
    .string()
    .optional(),
  buy: z
    .string()
    .optional(),
  image: z.string().optional(),
  bgImage: z.string().optional(),
  status: z.boolean().default(false),
  isActive: z.boolean().default(false),
});

type BundleDiscountFormValues = z.infer<typeof BundleDiscountFormSchema>;

interface BundleDiscountFormProps {
  bundleDiscountData?: {
    id: string;
    name: string;
    free: string;
    buy: string;
    image: string;
    bgImage: string;
    status: boolean;
    isActive: boolean;
  };
}

export default function BundleDealForm({
  bundleDiscountData,
}: BundleDiscountFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [createBundleDiscount, { isLoading: createBundleDiscountLoading }] =
    useCreateBundleDiscountMutation();
  const [updateBundleDiscount, { isLoading: updateBundleDiscountLoading }] =
    useUpdateBundleDiscountMutation();

  const form = useForm<BundleDiscountFormValues>({
    resolver: zodResolver(BundleDiscountFormSchema),
    defaultValues: bundleDiscountData,
  });

  useEffect(() => {
    form.reset(bundleDiscountData);
  }, [bundleDiscountData, form]);

  async function onSubmit(data: Partial<BundleDiscountFormValues>) {
    setIsLoading(true);
    if (bundleDiscountData?.id) {
      const result = await updateBundleDiscount({
        id: bundleDiscountData.id,
        body: data,
      }).unwrap();
      if (result?.success) {
        toast.success("BundleDiscount updated successfully.");
        setIsLoading(false);
      }
      return;
    } else {
      const result = await createBundleDiscount(data).unwrap();
      if (result?.success) {
        toast.success("BundleDiscount created successfully.");
        form.reset({
          name: "",
          free: "",
          buy: "",
          image: "",
          bgImage: "",
          status: false,
          isActive: false,
        });
        setIsLoading(false);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Discount Title <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="c.g. buy 1 get 1 free, 10% off, etc."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter the title of the discount. e.g. Buy 1 get 1 free, 10% off,
                etc.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="buy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Buy item <span className="text-zinc-500">(optional)</span>
              </FormLabel>
              <FormControl>
                <Input placeholder=' e.g. "1" or "2" ...' {...field} />
              </FormControl>
              <FormDescription>
                Enter the number of items to buy to avail the discount.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="free"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Free item <span className="text-zine-500">(optinal)</span>
              </FormLabel>
              <FormControl>
                <Input placeholder=' e.g. "1" or "2 ... ' {...field} />
              </FormControl>
              <FormDescription>
                Enter the number of items to get free after buying the items.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Discount Image <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value || ""}
                  onChange={(imageUrl) => field.onChange(imageUrl)}
                  onRemove={() => field.onChange("")}
                />
              </FormControl>
              <FormDescription>
                Upload a discount image. Recommended size is
                <strong className="text-blue-600"> 100x100 pixels.</strong>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Background Image{" "}
                <span className="text-zinc-500">(optional)</span>
              </FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value || ""}
                  onChange={(imageUrl) => field.onChange(imageUrl)}
                  onRemove={() => field.onChange("")}
                />
              </FormControl>
              <FormDescription>
                Upload a background image. Recommended size is
                <strong className="text-blue-600">1200x1200 pixels.</strong>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Discount Status <span className="text-red-500">*</span>
                </FormLabel>
                <FormDescription>
                  The status of the discount should be active to be visible on
                  the website.
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
        {/* <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  For Image & Bg Image{" "}
                  <span className="text-zinc-500">(optinal)</span>
                </FormLabel>
                <FormDescription>
                  The status on for showing logo & background image in ui and
                  get slug for redirect url.
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
        /> */}
        <Button
          disabled={isLoading}
          className="w-full flex justify-center items-center"
          type="submit"
        >
          {bundleDiscountData ? (
            <div className="w-full h-full flex justify-center items-center">
              {updateBundleDiscountLoading ||
                (isLoading && (
                  <IconLoader className="animate-spin" size={17} />
                ))}
              <p>Update BundleDiscount</p>
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              {createBundleDiscountLoading ||
                (isLoading && (
                  <IconLoader className="animate-spin" size={17} />
                ))}
              <p>Create BundleDiscount</p>
            </div>
          )}
        </Button>
      </form>
    </Form>
  );
}
