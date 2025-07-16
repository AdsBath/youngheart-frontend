"use client";

import { Button } from "@/components/custom/button";
import ImageUpload from "@/components/imageUpload";
import { Checkbox } from "@/components/ui/checkbox";
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
  useAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/redux/api/categoriesApi";
import { onCloseEditCategory } from "@/redux/features/category/categorySlice";
import { ICategoryFormProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import { z } from "zod";

const categoryFormSchema = z.object({
  title: z.string().min(2, {
    message: "Category name must be at least 2 characters.",
  }),
  image: z.string().optional(),
  featured: z.boolean().optional(),
  status: z.boolean().optional(),
  elementor: z.boolean().default(false),
  elementorImage: z.string().optional(),
  showInFooter: z.boolean().optional(),
  description: z.string().default(""),
  parentId: z.nullable(z.string()).optional() || z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

type CategoryFormValues = z.infer<typeof categoryFormSchema>;

export default function CategoryForm({ categoryData }: ICategoryFormProps) {
  const { data: categories, isLoading } = useAllCategoriesQuery({});

  const [isParent, setIsParent] = useState(false);
  const [createCategory, { isLoading: createCategoryLoading }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: updateCategoryLoading }] =
    useUpdateCategoryMutation();
  const dispatch = useDispatch();

  const categoriesList: any = categories?.data?.data;

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: categoryData,
  });

  useEffect(() => {
    form.reset(
      categoryData || {
        title: "",
        image: "",
        featured: false,
        elementor: false,
        elementorImage: "",
        status: false,
        showInFooter: false,
        description: "",
        parentId: null,
        metaTitle: "",
        metaDescription: "",
      }
    );
  }, [categoryData, form]);

  async function onSubmit(data: Partial<CategoryFormValues>) {
    if (categoryData?.title) {
      const result = await updateCategory({
        id: categoryData.id,
        body: data,
      }).unwrap();
      if (result?.success) {
        toast.success("Category updated successfully.");
        dispatch(onCloseEditCategory());
      }
    } else {
      const result = await createCategory(data).unwrap();
      if (result?.success) {
        toast.success("Category created successfully.");
        form.reset({
          title: "",
          image: "",
          featured: false,
          elementor: false,
          elementorImage: "",
          status: false,
          showInFooter: false,
          description: "",
          parentId: null,
          metaTitle: "",
          metaDescription: "",
        });
        dispatch(onCloseEditCategory());
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
                Category Name <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="c.g category name" {...field} />
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
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Image</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value || ""}
                  onChange={(imageUrl) => field.onChange(imageUrl)}
                  onRemove={() => field.onChange("")}
                />
              </FormControl>
              <FormDescription>
                This is the image of your category. The image should be at least
                <strong className="text-blue-600"> 300x300 pixels.</strong>
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
                Category Description{" "}
                <span className="text-zinc-500">(Optional)</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="c.g. category description here ..."
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
          name="status"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Category Status</FormLabel>
                <FormDescription>
                  Category status will be visible to users on the frontend.
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
          name="featured"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Show in Featured Categories
                </FormLabel>
                <FormDescription>
                  Featured categories will be displayed on the homepage.
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
          name="metaTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Meta Title <span className="text-zinc-500">(optional)</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="meta title here" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="metaDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Meta Description{" "}
                <span className="text-zinc-500">(optional)</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="meta description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mb-2"
            onClick={() => setIsParent(!isParent)}
          >
            {isParent ? "Remove" : "Add"} Parent Category
          </Button>

          {isParent && (
            <FormField
              disabled={isLoading}
              control={form.control}
              name="parentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Parent Category{" "}
                    <span className="text-zinc-500">(Optional)</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a parent category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categoriesList?.map((category: any) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    If you have a parent category, you can select it here. This
                    will help users navigate your category more easily.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        <FormField
          control={form.control}
          name="showInFooter"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Show in top nav menu on the frontend</FormLabel>
                <FormDescription>
                  If you want to show this category in the top nav menu on the
                  frontend, check this box.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <Button
          disabled={createCategoryLoading || updateCategoryLoading}
          className="w-full flex justify-center items-center"
          type="submit"
        >
          {categoryData ? (
            <div className="w-full h-full flex justify-center items-center">
              {updateCategoryLoading && (
                <IconLoader className="animate-spin" size={17} />
              )}
              <p>Update Category</p>
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              {createCategoryLoading && (
                <IconLoader className="animate-spin" size={17} />
              )}
              <p>Create Category</p>
            </div>
          )}
        </Button>
      </form>
    </Form>
  );
}
