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
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateApplicationMutation } from "../../../redux/api/applicationApi";
import { Textarea } from "@/components/ui/textarea";
import { IconLoader } from "@tabler/icons-react";

const formSchema = z.object({
  name: z
    .string({ message: "Name is required!" })
    .min(3, { message: "Minimum character count is 3" }),
  email: z
    .string({ message: "Email is required!" })
    .min(1, { message: "Please enter your email" })
    .email({ message: "Invalid email address" }),
  phone: z
    .string({ message: "Please enter your phone number" })
    .min(11, { message: "Phone number must be at least 11 digits" })
    .regex(/^\d+$/, { message: "Phone number can only contain digits" }),
  expectedSalary: z.preprocess(
    (val) => Number(val),
    z.number().positive({
      message: "Price must be a positive number.",
    })
  ),
  message: z.string().optional(),
  resume: z.any(),
});

export function CareerForm({ designation }: { designation: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [createApplication, { isLoading: applicationLoading }] =
    useCreateApplicationMutation();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      expectedSalary: 0,
      message: "",
      resume: "",
    },
  });

  async function onSubmit(data: any) {
    setIsLoading(true);
    data.designation = designation;
    const result: any = await createApplication(data);
    if (result?.data?.success) {
      toast({
        title: result?.data?.message + " 🎉",
        description: format(new Date(), "EEEE, MMMM dd, yyyy 'at' hh:mm a"),
      });
      setIsLoading(false);
      form.reset();
      // router.push("/my-account/account-details");
    } else {
      toast({
        variant: "destructive",
        title: result.error || "An error occurred",
        description: "Please check your register credentials and try again",
      });
      setErrorMessage(result?.error || "Registration failed");
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("mb-20")}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Name <span className="text-red-500"> *</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="enter your name" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>
                      Email <span className="text-red-500"> *</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Phone/ Mobile <span className="text-red-500"> *</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="enter your number" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expectedSalary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Expected Salary <span className="text-red-500"> *</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="expected salary"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="notes">
                    Message <span className="text-zinc-500">(optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      id="message"
                      rows={5}
                      placeholder="write your message"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-[50%]">
              <FormField
                control={form.control}
                name="resume"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Google drive link <span className="text-red-500"> *</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="enter your resume google drive link"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Must be viewer must be can access be care full
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* <div className="w-[20%]">
              <FormField
                control={form.control}
                name="resume"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Resume Upload <span className="text-red-500"> *</span>
                    </FormLabel>
                    <FormControl>
                      <PdfUpload
                        value={field.value || ""}
                        onChange={(imageUrl) => field.onChange(imageUrl)}
                        onRemove={() => field.onChange("")}
                      />
                    </FormControl>
                    <FormDescription>
                      Please upload your resume as a PDF file.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div> */}

            <Button
              size={"lg"}
              variant={"destructive"}
              className="mt-2 w-[20%]"
              loading={isLoading || applicationLoading}
            >
              {(isLoading || applicationLoading) && (
                <IconLoader className="animate-spin" size={17} />
              )}
              Apply Now
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
