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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateBannerAdMutation,
  useUpdateBannerAdMutation,
} from "@/redux/api/bannerAdApi";
import { useTopLevelsCategoriesQuery } from "@/redux/api/categoriesApi";
import { IBannerAdFormProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader } from "@tabler/icons-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { z } from "zod";

const bannerAdFormSchema = z.object({
  title: z.string().optional(),
  imageUrl: z.string({
    message: "Image url is required!",
  }),
  categoryId: z.string({
    message: "Category Id is required!",
  }),
  isActive: z.boolean().default(true),
  displayOrder: z.preprocess(
    (val) => Number(val),
    z.number().int().positive({
      message: "Dispaly order must be a positive integer.",
    })
  ),
  description: z.string().optional(),
});

type BannerAdFormValues = z.infer<typeof bannerAdFormSchema>;

export default function BannerAdForm({ bannerAdData }: IBannerAdFormProps) {
  const { data: categories, isLoading } = useTopLevelsCategoriesQuery({});
  const [createBannerAd, { isLoading: bannerAdCreateLoading }] =
    useCreateBannerAdMutation();
  const [updateBannerAd, { isLoading: bannerAdUpdateLoading }] =
    useUpdateBannerAdMutation();

  const categoriesList: any = categories?.data?.data;

  const form = useForm<BannerAdFormValues>({
    resolver: zodResolver(bannerAdFormSchema),
    defaultValues: {
      title: bannerAdData?.title || "",
      imageUrl: bannerAdData?.imageUrl || "",
      categoryId: bannerAdData?.categoryId || "",
      displayOrder: bannerAdData?.displayOrder || 0,
      isActive: bannerAdData?.isActive || false,
      description: bannerAdData?.description || "",
    },
  });

  useEffect(() => {
    form.reset(
      bannerAdData || {
        title: "",
        imageUrl: "",
        categoryId: "",
        isActive: false,
        displayOrder: 0,
        description: "",
      }
    );
  }, [bannerAdData, form]);

  async function onSubmit(data: Partial<BannerAdFormValues>) {
    if (bannerAdData?.title) {
      const result = await updateBannerAd({
        id: bannerAdData.id,
        body: data,
      });
      // console.log(result, "result");
      if (result?.data?.success) {
        toast.success("Banner ad updated successfully.");
      } else {
        toast.error(result?.error as string);
      }
    } else {
      const result = await createBannerAd(data);
      if (result?.data?.success) {
        toast.success("Banner ad created successfully.");
        form.reset({
          title: "",
          imageUrl: "",
          categoryId: "",
          isActive: false,
          displayOrder: 0,
          description: "",
        });
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Banner Ad Title{" "}
                <span className="text-zinc-500">(Optional)</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="c.g banner ad title" {...field} />
              </FormControl>
              <FormDescription>
                This is the name of your Banner ad. It can be changed at any
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
          disabled={isLoading}
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Category <span className="text-red-500">*</span>
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value || ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categoriesList?.map((category: any) => (
                    <SelectItem key={category?.id} value={category?.id}>
                      {category?.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                If you have a category, you can select it here. This will help
                users navigate your category more easily.
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
                Banner Ad Image <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value || ""}
                  onChange={(image) => field.onChange(image)}
                  onRemove={() => field.onChange("")}
                />
              </FormControl>
              <FormDescription>
                This is the image of your banner ad. The image should be at
                least
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
                Banner Ad Description
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
                <FormLabel className="text-base">Banner Ad Status</FormLabel>
                <FormDescription>
                  Banner Ad status will be visible to users on the frontend.
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
          disabled={bannerAdCreateLoading || bannerAdUpdateLoading}
          className="w-full flex justify-center items-center"
          type="submit"
        >
          {bannerAdData ? (
            <div>
              <div className="w-full h-full flex justify-center items-center">
                {bannerAdUpdateLoading && (
                  <IconLoader className="animate-spin" size={17} />
                )}
                <p>Update Banner Ad</p>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              {bannerAdCreateLoading && (
                <IconLoader className="animate-spin" size={17} />
              )}
              <p>Create Banner Ad</p>
            </div>
          )}
        </Button>
      </form>
    </Form>
  );
}
