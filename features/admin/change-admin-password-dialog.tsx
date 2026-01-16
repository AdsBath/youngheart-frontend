"use client";

import { Button } from "@/components/custom/button";
import { PasswordInput } from "@/components/custom/password-input";
import {
     Dialog,
     DialogContent,
     DialogDescription,
     DialogFooter,
     DialogHeader,
     DialogTitle,
} from "@/components/ui/dialog";
import {
     Form,
     FormControl,
     FormField,
     FormItem,
     FormLabel,
     FormMessage,
} from "@/components/ui/form";
import { useChangeAdminPasswordMutation } from "@/redux/api/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader } from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const passwordSchema = z
     .object({
          password: z.string().min(8, {
               message: "Password must be at least 8 characters long",
          }),
          confirmPassword: z.string(),
     })
     .refine((data) => data.password === data.confirmPassword, {
          message: "Passwords don't match",
          path: ["confirmPassword"],
     });

type PasswordFormValues = z.infer<typeof passwordSchema>;

interface ChangeAdminPasswordDialogProps {
     open: boolean;
     onOpenChange: (open: boolean) => void;
     adminId: string;
     adminName: string;
}

export function ChangeAdminPasswordDialog({
     open,
     onOpenChange,
     adminId,
     adminName,
}: ChangeAdminPasswordDialogProps) {
     const [isLoading, setIsLoading] = useState(false);
     const [changeAdminPassword] = useChangeAdminPasswordMutation();

     const form = useForm<PasswordFormValues>({
          resolver: zodResolver(passwordSchema),
          defaultValues: {
               password: "",
               confirmPassword: "",
          },
     });

     async function onSubmit(data: PasswordFormValues) {
          setIsLoading(true);
          try {
               const result = await changeAdminPassword({
                    adminId,
                    password: data.password,
               }).unwrap();

               if (result?.success) {
                    toast.success("Admin password changed successfully.");
                    form.reset();
                    onOpenChange(false);
               }
          } catch (error: any) {
               toast.error(error?.data?.message || "Failed to change password.");
          } finally {
               setIsLoading(false);
          }
     }

     return (
          <Dialog open={open} onOpenChange={onOpenChange}>
               <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                         <DialogTitle>Change Admin Password</DialogTitle>
                         <DialogDescription>
                              Change password for <strong>{adminName}</strong>. This action can
                              only be performed by Super Admin.
                         </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                              <FormField
                                   control={form.control}
                                   name="password"
                                   render={({ field }) => (
                                        <FormItem>
                                             <FormLabel>
                                                  New Password <span className="text-red-500">*</span>
                                             </FormLabel>
                                             <FormControl>
                                                  <PasswordInput placeholder="********" {...field} />
                                             </FormControl>
                                             <FormMessage />
                                        </FormItem>
                                   )}
                              />
                              <FormField
                                   control={form.control}
                                   name="confirmPassword"
                                   render={({ field }) => (
                                        <FormItem>
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
                              <DialogFooter>
                                   <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => onOpenChange(false)}
                                   >
                                        Cancel
                                   </Button>
                                   <Button type="submit" disabled={isLoading}>
                                        {isLoading && <IconLoader className="animate-spin mr-2" size={17} />}
                                        Change Password
                                   </Button>
                              </DialogFooter>
                         </form>
                    </Form>
               </DialogContent>
          </Dialog>
     );
}
