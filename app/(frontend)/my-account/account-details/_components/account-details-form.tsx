"use client";
import { Button } from "@/components/custom/button";
import ProfileUpload from "@/components/profileUpload";
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
import { useUpdateUserMutation } from "@/redux/api/userApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader } from "@tabler/icons-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const addressFormSchema = z.object({
  image: z.string().optional(),
  firstName: z.string().min(2, {
    message: "First Name is Required!",
  }),
  lastName: z.string().min(2, {
    message: "Last Name is Required!",
  }),
  phone: z.string().min(10, {
    message: "Phone number is Required!",
  }),
  email: z.string().email({
    message: "Valid email address is Required!",
  }),
});

type AddressFormValues = z.infer<typeof addressFormSchema>;

const AccountDetailsForm = ({ sessionData }: { sessionData: any }) => {
  const userId = sessionData?.data?.id;
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      image: sessionData?.data?.image || "",
      firstName: sessionData?.data?.firstName,
      lastName: sessionData?.data?.lastName,
      phone: sessionData?.data?.phone,
      email: sessionData?.data?.email,
    },
  });

  async function onSubmit(data: Partial<AddressFormValues>) {
    const userData = {
      id: userId,
      body: {
        image: data.image,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
      },
    };

    const resUser = await updateUser(userData);
    if (resUser?.data?.statusCode === 200 && resUser?.data?.success) {
      toast.success(resUser?.data?.message);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 pb-10 px-4 w-full sm:w-6/12"
      >
        {/* account details */}
        <div className="flex flex-col gap-2">
          <div>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Image &nbsp;</FormLabel>
                  <FormControl>
                    <ProfileUpload
                      value={field.value || ""}
                      onChange={(imageUrl) => field.onChange(imageUrl)}
                      onRemove={() => field.onChange("")}
                    />
                  </FormControl>

                  <FormDescription>
                    This is the image associated with your profile.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-3">
            <div className="w-full">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      First name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="First name" {...field} />
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
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Last name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Last name" {...field} />
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Phone <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Phone" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email address <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email address"
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

        <Button className="mt-3" size="sm" variant="success">
          {isLoading && <IconLoader className="animate-spin" size={17} />}
          Save
        </Button>
      </form>
    </Form>
  );
};

export default AccountDetailsForm;
