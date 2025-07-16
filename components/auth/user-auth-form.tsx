"use client";

import {
  useAdminForgetPasswordMutation,
  useAdminLoginMutation,
} from "@/redux/api/authApi";
import { format } from "date-fns";
import { HTMLAttributes, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Input } from "@/components/ui/input";
import { useAdmin } from "@/context/AdminContext";
import { cn } from "@/lib/utils";
import { IResult } from "@/types";
import { storeUserInfo } from "@/utils/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader } from "@tabler/icons-react";
import { useCookies } from "react-cookie";
import { toast } from "../ui/use-toast";

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  email: z.string().min(1, { message: "Please enter your email." }).email(),
  password: z
    .string()
    .min(1, {
      message: "Please enter your password.",
    })
    .min(7, {
      message: "Password must be at least 7 characters long",
    }),
});

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  // Initialize cookies
  const [cookies, setCookie, removeCookie] = useCookies([
    "user",
    "refreshToken",
    "sessionId",
  ]);
  const { user, loading } = useAdmin();
  const [adminForgotPassword, { isLoading: adminForgotPasswordLoading }] =
    useAdminForgetPasswordMutation();

  const [adminSingIn] = useAdminLoginMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { watch } = form;

  const watchValues = watch();
  const email = watchValues.email;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    const result: IResult = await adminSingIn(data);
    if (result?.data) {
      toast({
        title: "You have successfully logged 🎉",
        description: format(new Date(), "EEEE, MMMM dd, yyyy 'at' hh:mm a"),
      });
      setIsLoading(false);
      form.reset();
      storeUserInfo({ accessToken: result?.data?.data.accessToken });
      setCookie("refreshToken", result?.data?.data.refreshToken, {
        path: "/",
        maxAge: result?.data?.data.maxAge,
      });
      setCookie("sessionId", result?.data?.data.sessionId, {
        path: "/",
        maxAge: result?.data?.data.maxAge,
      });
      window.location.replace("/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: result.error || "An error occurred",
        description: "Please check your login credentials and try again",
      });
      setErrorMessage(result?.error || "Login failed");
      setIsLoading(false);
    }
  };

  const handleForgetPassword = async () => {
    if (!email) {
      setErrorMessage("Please fill the email field for forget password");
      return;
    }

    const res = await adminForgotPassword({ email });
    if (res?.data?.statusCode === 200) {
      toast({
        title: res?.data?.message as string,
        description: format(new Date(), "EEEE, MMMM dd, yyyy 'at' hh:mm a"),
      });
    } else {
      toast({
        title: res?.error as string,
        description: format(new Date(), "EEEE, MMMM dd, yyyy 'at' hh:mm a"),
      });
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage>
                    {errorMessage === "Admin not found" &&
                      "Please check your login credentials and try again"}
                  </FormMessage>
                  {errorMessage && (
                    <p className="text-sm text-red-500">{errorMessage}</p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <button
                      type="button"
                      onClick={handleForgetPassword}
                      disabled={adminForgotPasswordLoading}
                      className="text-sm font-medium text-red-600 underline hover:opacity-75 to flex gap-1"
                    >
                      {adminForgotPasswordLoading && (
                        <IconLoader className="animate-spin" size={17} />
                      )}
                      Lost your password?
                    </button>
                  </div>
                  <FormControl>
                    <PasswordInput placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage>
                    {errorMessage === "Password is incorrect" &&
                      "please check your password and try again"}
                  </FormMessage>
                </FormItem>
              )}
            />
            <Button className="mt-2" loading={isLoading}>
              Login
            </Button>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  or custom login
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* <Button
                variant="outline"
                className="w-full"
                type="button"
                loading={isLoading}
                leftSection={<IconBrandGithub className="h-4 w-4" />}
              >
                GitHub
              </Button>
              <Button
                variant="outline"
                className="w-full"
                type="button"
                loading={isLoading}
                leftSection={<IconBrandFacebook className="h-4 w-4" />}
              >
                Facebook
              </Button> */}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
