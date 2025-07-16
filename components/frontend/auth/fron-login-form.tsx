"use client";

import {
  useForgetPasswordMutation,
  useLoginMutation,
} from "@/redux/api/authApi";
import { format } from "date-fns";
import { HTMLAttributes, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/custom/button";
import { PasswordInput } from "@/components/custom/password-input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  email: z.string().optional(),
  password: z
    .string()
    .min(7, { message: "Password must be at least 7 characters long" }),
});
// .refine((data) => data.email || data.phone, {
//   message: "Either email or phone is required",
//   path: ["email"],
// });

export function FronLoginForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const [forgetPassword, { isLoading: forgetLoading }] =
    useForgetPasswordMutation();
  const [cookies, setCookie, removeCookie] = useCookies([
    "user",
    "refreshToken",
    "sessionId",
  ]);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      // phone: "",
    },
  });

  const { watch } = form;

  const watchValues = watch();
  const email = watchValues.email;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const result: any = await login(data);
    if (result?.data?.success) {
      toast({
        title: result?.data?.message + " 🎉",
        description: format(new Date(), "EEEE, MMMM dd, yyyy 'at' hh:mm a"),
      });
      setCookie("refreshToken", result?.data?.data.refreshToken, {
        path: "/",
        maxAge: result?.data?.data.maxAge,
      });
      setCookie("sessionId", result?.data?.data.sessionId, {
        path: "/",
        maxAge: result?.data?.data.maxAge,
      });
      setIsLoading(false);
      form.reset();
      window.location.replace("/");
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

    const res = await forgetPassword({ email });
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
                  <FormLabel>Email or Phone</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Remember me */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center">
                <Checkbox id="remember-me" />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
            </div>

            <Button
              size="lg"
              className=" w-1/2 bg-brand hover:bg-bandBlack"
              loading={isLoading || loginLoading}
            >
              Login
            </Button>

            <button
              type="button"
              onClick={handleForgetPassword}
              disabled={forgetLoading}
              className="text-sm font-medium text-brand underline hover:opacity-75 mt-4 mr-auto flex gap-1"
            >
              {forgetLoading && (
                <IconLoader className="animate-spin" size={17} />
              )}
              Lost your password?
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}
