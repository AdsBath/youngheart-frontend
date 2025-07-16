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
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader } from "@tabler/icons-react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import {
  useCreateShippingRuleMutation,
  useUpdateShippingRuleMutation,
} from "@/redux/api/shippingRulesApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const shippingRulesFormSchema = z.object({
  name: z.string().min(3, {
    message: "Name should be at least 3 characters long.",
  }),
  minOrderValue: z.preprocess((val) => Number(val), z.number().default(0)),
  shippingCost: z.preprocess((val) => Number(val), z.number().default(0)),
  status: z.boolean().default(true),
});

type ShippingRulesFormValues = z.infer<typeof shippingRulesFormSchema>;

interface ShippinRulesFormProps {
  shippingRulesData?: {
    id: string;
    name: string;
    minOrderValue: number;
    shippingCost: number;
    status: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

const transformShippingRulesDataToFormValues = (
  data: ShippinRulesFormProps["shippingRulesData"]
): ShippingRulesFormValues => ({
  name: data?.name || "",
  minOrderValue: data?.minOrderValue || 0,
  shippingCost: data?.shippingCost || 0,
  status: data?.status || false,
});

export default function ShippingRulesForm({
  shippingRulesData,
}: ShippinRulesFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [createShippingRule] = useCreateShippingRuleMutation();
  const [updateShippingRule] = useUpdateShippingRuleMutation();

  const form = useForm<ShippingRulesFormValues>({
    resolver: zodResolver(shippingRulesFormSchema),
    defaultValues: transformShippingRulesDataToFormValues(shippingRulesData),
  });

  useEffect(() => {
    form.reset(transformShippingRulesDataToFormValues(shippingRulesData));
  }, [shippingRulesData, form]);

  async function onSubmit(data: Partial<ShippingRulesFormValues>) {
    // console.log(data);
    setIsLoading(true);
    if (shippingRulesData?.id) {
      const result = await updateShippingRule({
        id: shippingRulesData.id,
        body: data,
      }).unwrap();
      if (result?.success) {
        toast.success("coupon updated successfully.");
        setIsLoading(false);
      }
      return;
    } else {
      const result = await createShippingRule(data).unwrap();
      if (result?.success) {
        toast.success("coupon updated successfully.");
        form.reset({
          name: "",
          minOrderValue: 0,
          shippingCost: 0,
          status: false,
        });
        setIsLoading(false);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-4">
          <div className="w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Status &nbsp;</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select variation" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Free Shipping">
                        Free Shipping
                      </SelectItem>
                      <SelectItem value="In-side Dhaka">In-side Dhaka</SelectItem>
                      <SelectItem value="Out-side Dhaka">Out-side Dhaka</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-full">
            <FormField
              control={form.control}
              name="minOrderValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Min Order Value{" "}
                    <span className="text-zinc-500">(optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={0}
                      type="number"
                      placeholder="c.g. min order value etc."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-full">
            <FormField
              control={form.control}
              name="shippingCost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Shipping Cost <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="c.g. Capped price etc."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="w-full">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Shipping Rules Status
                  </FormLabel>
                  <FormDescription>
                    Shipping Rules status will be visible to users on the
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
        </div>

        <Button
          disabled={isLoading}
          className="w-full flex justify-center items-center"
          type="submit"
        >
          {shippingRulesData ? (
            <div className="w-full h-full flex justify-center items-center">
              {isLoading && <IconLoader className="animate-spin" size={17} />}
              <p>Update Shipping Rules</p>
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              {isLoading && <IconLoader className="animate-spin" size={17} />}
              <>Create Shipping Rules</>
            </div>
          )}
        </Button>
      </form>
    </Form>
  );
}
