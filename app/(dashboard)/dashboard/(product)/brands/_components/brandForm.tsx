"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Switch } from "@/components/ui/switch";
import {
  useCreateBrandMutation,
  useUpdateBrandMutation,
} from "@/redux/api/brandApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
// import { collectionData, ICollectionData } from "@/data/product-collection";
import ImageUpload from "@/components/imageUpload";
import { Input } from "@/components/ui/input";
import {
  onCloseBrand,
  onCloseEditBrand,
} from "@/redux/features/brand/brandSlice";
import { toast } from "sonner";

const brandFormSchema = z.object({
  name: z.string({
    message: "Title should be at least 4 characters long.",
  }),
  displayOrder: z.preprocess(
    (val) => Number(val),
    z.number().int().positive({
      message: "Dispaly order must be a positive integer.",
    })
  ),
  imageUrl: z.string({
    message: "Title should be at least 4 characters long.",
  }),
  status: z.boolean().default(false),
});

type CollectionsFormValues = z.infer<typeof brandFormSchema>;

interface CollectionsFormProps {
  brandData?: {
    id: string;
    name: string;
    status: boolean;
    imageUrl: string;
  };
}

export default function CollectionsForm({ brandData }: CollectionsFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [createBrand, { isLoading: createBrandLoading }] =
    useCreateBrandMutation();
  const [updateBrand, { isLoading: updateBrandLoading }] =
    useUpdateBrandMutation();
  const dispatch = useDispatch();

  const form = useForm<CollectionsFormValues>({
    resolver: zodResolver(brandFormSchema),
    defaultValues: brandData,
  });

  useEffect(() => {
    form.reset(brandData);
  }, [brandData, form]);

  async function onSubmit(data: Partial<CollectionsFormValues>) {
    setIsLoading(true);
    if (brandData?.id) {
      const result = await updateBrand({
        id: brandData.id,
        body: data,
      });
      if (result?.data?.success) {
        toast.success("Product Collection updated successfully.");
        setIsLoading(false);
        dispatch(onCloseEditBrand());
      } else {
        toast.error(result?.error as string);
        setIsLoading(false);
      }
      return;
    } else {
      const result = await createBrand(data);
      if (result?.data?.success) {
        toast.success("Product Collection created successfully.");
        form.reset({
          name: "",
          displayOrder: 0,
          status: false,
          imageUrl: "",
        });
        setIsLoading(false);
        dispatch(onCloseBrand());
      } else {
        toast.error(result?.error as string);
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
                Brand Name <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="c.g collection name" {...field} />
              </FormControl>
              <FormDescription>
                This is the name of your category. It can be changed at any
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
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Brand Image <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value || ""}
                  onChange={(image) => field.onChange(image)}
                  onRemove={() => field.onChange("")}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Product Collection Title <span className="text-red-500">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select collection" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {collectionData?.map(
                    (collectionItem: ICollectionData, index: number) => (
                      <SelectItem key={index} value={collectionItem?.value}>
                        {collectionItem?.label}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              <FormDescription>
                Product collection title should be unique. This will be used to
                identify the collection.
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
                  Active Brand <span className="text-red-500">*</span>
                </FormLabel>
                <FormDescription>
                  Enable or disable the brand. Disabled brand will not be
                  available for use.
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
          disabled={createBrandLoading || updateBrandLoading || isLoading}
          className="w-full flex justify-center items-center"
          type="submit"
        >
          {brandData ? (
            <div className="w-full h-full flex justify-center items-center">
              {updateBrandLoading && isLoading && (
                <IconLoader className="animate-spin" size={17} />
              )}
              <p>Update Brand</p>
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              {createBrandLoading && isLoading && (
                <IconLoader className="animate-spin" size={17} />
              )}
              <p>Create Brand</p>
            </div>
          )}
        </Button>
      </form>
    </Form>
  );
}
