"use client";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { districts } from "@/data/districts";
import { ICity, citys } from "@/data/citys";
import { useCreateAddressMutation } from "@/redux/api/addressApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader } from "@tabler/icons-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const addressFormSchema = z.object({
  // houseNumber: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  district: z.string().optional(),
  zip: z.string().optional(),
});

type AddressFormValues = z.infer<typeof addressFormSchema>;

const AddressForm = ({
  addressData,
  sessionData,
}: {
  addressData: any;
  sessionData: any;
}) => {
  const userId = sessionData?.data?.id;
  const [createAddress, { isLoading }] = useCreateAddressMutation();

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      // houseNumber: addressData?.data?.houseNumber || "",
      address: addressData?.data?.address || "",
      city: addressData?.data?.city || "",
      district: addressData?.data?.district || "",
      zip: addressData?.data?.zip || "",
    },
  });

  const { watch } = form;
  const watchValues = watch();
  const district = watchValues?.district;

  const districtData = districts?.find(
    (districtItem: any) => districtItem?.name === district
  );

  let upazilaData: ICity[] = [];
  if (citys) {
    upazilaData = citys?.filter(
      (upazilaItem: ICity) => upazilaItem?.district_id === districtData?.id
    );
  }

  async function onSubmit(data: Partial<AddressFormValues>) {
    const addressData = {
      userId: userId,
      // houseNumber: data?.houseNumber,
      apartment: data?.address,
      city: data?.city,
      zip: data?.zip,
      district: data?.district,
    };

    const resAddress = await createAddress(addressData);
    if (resAddress?.data?.statusCode === 200 && resAddress?.data?.success) {
      toast.success(resAddress?.data?.message);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 pb-10 px-4 w-full sm:w-6/12"
      >
        {/* shipping details */}
        <div className="flex flex-col gap-2">
          <div className="w-full">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Address
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Apartment, suite, unit etc."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full">
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    District <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select collection" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {districts?.map((district: any, index: number) => (
                        <SelectItem key={index} value={district?.name}>
                          {district?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    City <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select collection" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {upazilaData?.map((upazila: any, index: number) => (
                        <SelectItem key={index} value={upazila?.name}>
                          {upazila?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full">
            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Postcode / ZIP <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Postcode / ZIP" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button className="mt-3" size="sm" variant="success">
          {isLoading && <IconLoader className="animate-spin" size={17} />}
          Save
        </Button>
      </form>
    </Form>
  );
};

export default AddressForm;
