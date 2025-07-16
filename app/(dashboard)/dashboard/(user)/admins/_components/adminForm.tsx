"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useCreateAdminMutation } from "@/redux/api/authApi";
import { useUpdateUserMutation } from "@/redux/api/userApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader } from "@tabler/icons-react";
import { toast } from "sonner";

const adminFormSchema = z.object({
  phone: z.string().optional(),
  email: z.string().email().min(1, {
    message: "Email is required and must be a valid email address",
  }),
  firstName: z.string().min(1, {
    message: "First Name is required",
  }),
  lastName: z.string().min(1, {
    message: "Last Name is required",
  }),
  displayName: z.string().optional(),
  image: z.string().url().optional(),
  role: z
    .string()
    .min(1, {
      message: "Role is required",
    })
    .refine((value) => ["ADMIN", "MANAGER", "EMPLOYEE"].includes(value), {
      message: "Role is required and must be defined",
    }),
  status: z.boolean().default(false),
  // partition: z.string().min(1, {
  //   message: "Partition is required",
  // }),
});

type AdminFormValues = z.infer<typeof adminFormSchema>;

interface AdminDataFormValues {
  adminData?: {
    id: string;
    phone: string;
    email: string;
    role: string;
    image: string;
    status: boolean;
    firstName: string;
    lastName: string;
    displayName: string;
  };
}

export default function AdminRegForm({ adminData }: AdminDataFormValues) {
  const [isLoading, setIsLoading] = useState(false);

  const [createdAdmin] = useCreateAdminMutation();
  const [updatedAdmin] = useUpdateUserMutation();

  const form = useForm<AdminFormValues>({
    resolver: zodResolver(adminFormSchema),
    defaultValues: {
      status: adminData?.status || false,
      phone: adminData?.phone || "",
      email: adminData?.email || "",
      role: adminData?.role || "",
      image: adminData?.image || "",
      firstName: adminData?.firstName || "",
      lastName: adminData?.lastName || "",
      displayName: adminData?.displayName || "",
    },
  });

  useEffect(() => {
    form.reset({
      status: adminData?.status || false,
      phone: adminData?.phone || "",
      email: adminData?.email || "",
      role: adminData?.role || "",
      image: adminData?.image || "",
      firstName: adminData?.firstName || "",
      lastName: adminData?.lastName || "",
      displayName: adminData?.displayName || "",
    });
  }, [adminData, form]);

  async function onSubmit(data: Partial<AdminFormValues>) {
    setIsLoading(true);
    if (adminData?.id) {
      const result = await updatedAdmin({
        id: adminData.id,
        body: data,
      }).unwrap();
      if (result?.success) {
        toast.success("Admin updated successfully.");
        setIsLoading(false);
      }
      return;
    } else {
      const result = await createdAdmin(data).unwrap();
      if (result?.success) {
        toast.success("Admin created successfully.");
        form.reset();
        setIsLoading(false);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem
              className={`flex flex-row items-center justify-between rounded-lg border p-4 ${
                field.value ? "border-green-500" : "border-red-500"
              }`}
            >
              <div className="space-y-0.5 ">
                <FormLabel className="text-base">
                  Status | (
                  <span className={`${field.value && "text-green-500"}`}>
                    Active{" "}
                  </span>
                  /
                  <span className={`${!field.value && "text-red-500"}`}>
                    {" "}
                    Inactive
                  </span>
                  )
                </FormLabel>
                <FormDescription>
                  If admin is inactive, they will not be able to log in to the
                  admin panel.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  className={`${
                    field.value ? "data-[state=checked]:bg-green-500" : ""
                  }`}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 123-456-7890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="e.g., admin@example.com"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This email address will be used to log in to the admin panel. It
                will also be used to send admin panel log in password.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* role */}
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Role <span className="text-red-500">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="c.g., manager , employee" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="MANAGER">Manager</SelectItem>
                  <SelectItem value="EMPLOYEE">Employee</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Specify the role of the admin user.
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
              <FormLabel>Profile Image</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value || ""}
                  onChange={(imageUrl) => field.onChange(imageUrl)}
                  onRemove={() => field.onChange("")}
                />
              </FormControl>
              <FormDescription>
                This is the image of your category. The image should be at least
                <strong className="text-blue-600"> 200x200 pixels.</strong>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  First Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Last Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input placeholder="Display Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          {/* <h3 className="mb-4 text-lg font-medium">
            Permissions base access control
          </h3> */}
          {/* <div className="space-y-4">
            <FormField
              control={form.control}
              name=""
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Communication emails
                    </FormLabel>
                    <FormDescription>
                      Receive emails about your account activity.
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
              name=""
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Marketing emails
                    </FormLabel>
                    <FormDescription>
                      Receive emails about new products, features, and more.
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
              name=""
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Social emails</FormLabel>
                    <FormDescription>
                      Receive emails for friend requests, follows, and more.
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
              name=""
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Security emails</FormLabel>
                    <FormDescription>
                      Receive emails about your account activity and security.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled
                      aria-readonly
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div> */}
        </div>

        <Button
          disabled={isLoading}
          className="w-full flex justify-center items-center"
          type="submit"
        >
          {adminData ? (
            <div className="w-full h-full flex justify-center items-center">
              {isLoading && <IconLoader className="animate-spin" size={17} />}
              <p>Update Admin</p>
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              {isLoading && <IconLoader className="animate-spin" size={17} />}
              <>Create Admin</>
            </div>
          )}
        </Button>
      </form>
    </Form>
  );
}
