"use client";

import { Button } from "@/components/custom/button";
import { PasswordInput } from "@/components/custom/password-input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { useAdmin } from "@/context/AdminContext";
import { useChangePasswordMutation } from "@/redux/api/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const accountFormSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, {
        message: "Please enter your password",
      })
      .min(7, {
        message: "Password must be at least 7 characters long",
      }),
    password: z
      .string()
      .min(1, {
        message: "Please enter your password",
      })
      .min(7, {
        message: "Password must be at least 7 characters long",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

type AccountFormValues = z.infer<typeof accountFormSchema>;

export function AccountForm() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { user } = useAdmin();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof accountFormSchema>) {
    setLoading(true);
    const passwordData = {
      userId: user?.id,
      currentPassword: data?.currentPassword,
      password: data?.password,
    };
    const result: any = await changePassword(passwordData);
    if (result?.data?.success) {
      toast({
        title: "Password change successfully 🎉",
        description: format(new Date(), "EEEE, MMMM dd, yyyy 'at' hh:mm a"),
      });
      setLoading(false);
      form.reset();
    } else {
      toast({
        variant: "destructive",
        title: result.error || "An error occurred",
        description: "Please check your register credentials and try again",
      });
      setErrorMessage(result?.error || "Registration failed");
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="w-full">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>
                  Current Password <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <PasswordInput placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>
                  Password <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <PasswordInput placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full">
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>
                  Confirm Password <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <PasswordInput placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <Button
            size="sm"
            variant="success"
            className="mt-4 py-1"
            loading={isLoading || loading}
          >
            change password
          </Button>
        </div>
      </form>
    </Form>
  );
}
