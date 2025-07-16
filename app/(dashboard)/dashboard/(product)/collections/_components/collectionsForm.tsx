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
  useCreateProductCollectionMutation,
  useUpdateProductCollectionMutation,
} from "@/redux/api/productCollectionApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
// import { collectionData, ICollectionData } from "@/data/product-collection";
import ImageUpload from "@/components/imageUpload";
import { Input } from "@/components/ui/input";
import {
  onCloseEditProductCollection,
  onCloseProductCollection,
} from "@/redux/features/productCollection/productCollectionSlice";
import { toast } from "sonner";

const collectionsFormSchema = z.object({
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

type CollectionsFormValues = z.infer<typeof collectionsFormSchema>;

interface CollectionsFormProps {
  collectionsData?: {
    id: string;
    name: string;
    status: boolean;
    imageUrl: string;
  };
}

export default function CollectionsForm({
  collectionsData,
}: CollectionsFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [
    createProductCollection,
    { isLoading: createProductCollectionLoading },
  ] = useCreateProductCollectionMutation();
  const [
    updateProductCollection,
    { isLoading: updateProductCollectionLoading },
  ] = useUpdateProductCollectionMutation();
  const dispatch = useDispatch();

  const form = useForm<CollectionsFormValues>({
    resolver: zodResolver(collectionsFormSchema),
    defaultValues: collectionsData,
  });

  useEffect(() => {
    form.reset(collectionsData);
  }, [collectionsData, form]);

  async function onSubmit(data: Partial<CollectionsFormValues>) {
    setIsLoading(true);
    if (collectionsData?.id) {
      const result = await updateProductCollection({
        id: collectionsData.id,
        body: data,
      });
      if (result?.data?.success) {
        toast.success("Product Collection updated successfully.");
        setIsLoading(false);
        dispatch(onCloseEditProductCollection());
      } else {
        toast.error(result?.error as string);
        setIsLoading(false);
      }
      return;
    } else {
      const result = await createProductCollection(data);
      if (result?.data?.success) {
        toast.success("Product Collection created successfully.");
        form.reset({
          name: "",
          displayOrder: 0,
          status: false,
          imageUrl: "",
        });
        setIsLoading(false);
        dispatch(onCloseProductCollection());
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
                Collection Name <span className="text-red-500">*</span>
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
                  Active Collection <span className="text-red-500">*</span>
                </FormLabel>
                <FormDescription>
                  Enable or disable the collection. Disabled collection will not
                  be available for use.
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
          disabled={
            createProductCollectionLoading ||
            updateProductCollectionLoading ||
            isLoading
          }
          className="w-full flex justify-center items-center"
          type="submit"
        >
          {collectionsData ? (
            <div className="w-full h-full flex justify-center items-center">
              {updateProductCollectionLoading && isLoading && (
                <IconLoader className="animate-spin" size={17} />
              )}
              <p>Update Collection</p>
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              {createProductCollectionLoading && isLoading && (
                <IconLoader className="animate-spin" size={17} />
              )}
              <p>Create Collection</p>
            </div>
          )}
        </Button>
      </form>
    </Form>
  );
}
