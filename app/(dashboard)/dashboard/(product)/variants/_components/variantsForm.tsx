"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCreateVariantMutation,
  useUpdateVariantMutation,
} from "@/redux/api/attributeApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader } from "@tabler/icons-react";

const variantsFormSchema = z.object({
  name: z.string().min(3, {
    message: "Title should be at least 4 characters long.",
  }),
});

type VariantsFormValues = z.infer<typeof variantsFormSchema>;

interface VariantsFormProps {
  variantsData?: {
    id: string;
    name: string;
  };
}

export default function VariantsForm({ variantsData }: VariantsFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const [createVariant] = useCreateVariantMutation();
  const [updateVariant] = useUpdateVariantMutation();

  const form = useForm<VariantsFormValues>({
    resolver: zodResolver(variantsFormSchema),
    defaultValues: variantsData,
  });

  useEffect(() => {
    form.reset(variantsData);
  }, [variantsData, form]);

  async function onSubmit(data: Partial<VariantsFormValues>) {
    setIsLoading(true);
    if (variantsData?.id) {
      const result = await updateVariant({
        id: variantsData.id,
        body: data,
      }).unwrap();
      if (result?.success) {
        toast.success("Variant updated successfully.");
        setIsLoading(false);
      }
      return;
    } else {
      const result = await createVariant(data).unwrap();
      if (result?.success) {
        toast.success("Variant created successfully.");
        form.reset({
          name: "",
        });
        setIsLoading(false);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Product Variant Title <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="c.g. size, color, etc." {...field} />
              </FormControl>
              <FormDescription>
                This will be displayed as the title of the variant. It should be
                a short and descriptive title.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Status &nbsp;</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select variation" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Color">Color</SelectItem>
                  <SelectItem value="Size">Size</SelectItem>
                  <SelectItem value="Age">Age</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isLoading}
          className="w-full flex justify-center items-center"
          type="submit"
        >
          {variantsData ? (
            <div className="w-full h-full flex justify-center items-center">
              {isLoading && <IconLoader className="animate-spin" size={17} />}
              <p>Update Variant</p>
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              {isLoading && <IconLoader className="animate-spin" size={17} />}
              <>Create Variant</>
            </div>
          )}
        </Button>
      </form>
    </Form>
  );
}
