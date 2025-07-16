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
import { Input } from "@/components/ui/input";
import {
  useCreateVariantItemMutation,
  useUpdateVariantItemMutation,
} from "@/redux/api/attributeApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader } from "@tabler/icons-react";

const variantsFormSchema = z.object({
  name: z.string().min(1, {
    message: "variant item name ",
  }),
});

type VariantsFormValues = z.infer<typeof variantsFormSchema>;

interface VariantsFormProps {
  variantsData?: {
    id: string;
    name: string;
  };
  id?: string;
}

export default function VariantsItemForm({
  variantsData,
  id,
}: VariantsFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const [createVariantItem] = useCreateVariantItemMutation();
  const [updateVariant] = useUpdateVariantItemMutation();

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
      // console.log({
      //   attributeId: id,
      //   ...data,
      // });
      const result = await createVariantItem({
        attributeId: id,
        ...data,
      }).unwrap();
      if (result?.success) {
        toast.success("Variant item created successfully.");
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
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Variant item title <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="c.g. large, green, etc." {...field} />
              </FormControl>
              <FormDescription>
                variant item like Size[ Large, Medium , Small ] or Color[Red,
                Green, Blue] etc.
              </FormDescription>
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
            <div>
              <div className="w-full h-full flex justify-center items-center">
                {isLoading && <IconLoader className="animate-spin" size={17} />}
                <p>Update Variant</p>
              </div>
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
