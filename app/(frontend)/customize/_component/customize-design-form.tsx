"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCategoriesQuery } from "@/redux/api/categoriesApi";
import { FancyMultiSelect } from "@/components/multi-select";
import ImageUpload from "@/components/imageUpload";
import { useCreateCustomDesignMutation } from "@/redux/api/customDesignApi";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";

// Define the schema
const formSchema = z.object({
  wantCustomDesign: z.string({ message: "This field is required." }),
  designType: z.string().optional(),
  productDesign: z
    .array(z.object({ id: z.string(), title: z.string() }))
    .default([]),
  numberOfDesigns: z.string().optional(),
  deliveryDate: z.string().optional(),
  hasImage: z.string().optional(),
  designImage: z.any().optional(),
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  phone: z.string().min(1, { message: "Phone number is required." }),
  email: z.string().optional(),
  additionalDetails: z.string().optional(),
});

// Infer the form data type from the schema
type FormData = z.infer<typeof formSchema>;

export function CustomDesignForm() {
  const [loading, setLoading] = useState(false);
  const { data, isLoading } = useCategoriesQuery({});
  const [createCustomDesign, { isLoading: createCustomDesignLoading }] =
    useCreateCustomDesignMutation();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      wantCustomDesign: "",
      designType: "",
      productDesign: [],
      numberOfDesigns: "",
      deliveryDate: "",
      hasImage: "",
      designImage: null,
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      additionalDetails: "",
    },
  });

  function getAllChildren(categories: any[]) {
    let allChildren = [] as any[];

    // Helper function to recursively collect children
    function collectChildren(category: any) {
      if (category?.children?.length) {
        allChildren = [...allChildren, ...category.children];
        category.children.forEach(collectChildren);
      }
    }
    if (categories && categories.length) {
      categories.forEach((category: any) => {
        collectChildren(category);
      });
    }
    return allChildren;
  }
  const allChildren = getAllChildren(data?.data.data);
  const categories = allChildren.map((category: any) => {
    return {
      title: category.title,
      id: category.id,
    };
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setLoading(true);
      const res = await createCustomDesign(data);

      if (res?.data?.statusCode === 200 && res?.data?.success) {
        toast.success("Wait for sometimes confirmation call untill");
        form.reset();
      }

      // console.log(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Want Custom Design Field */}

        <FormField
          control={form.control}
          name="wantCustomDesign"
          render={({ field }) => (
            <FormItem>
              <FormLabel>আপনি কি আপনরা পছন্দমত ডিজাইন করাতে চাচ্ছেন?</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="অপশন নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">
                      হ্যাঁ (কাস্টম ডিজাইন করতে চাই)
                    </SelectItem>
                    <SelectItem value="no">বিস্তারিত কথা বলতে চাই</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Conditional Fields Based on Selection */}
        {form.watch("wantCustomDesign") === "yes" && (
          <>
            {/* Design Type Field */}
            <FormField
              control={form.control}
              name="designType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>কি ধরনের ডিজাইন করাতে চাচ্ছেন?</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="অপশন নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">
                          সিঙ্গেল প্রোডাক্ট ডিজাইন
                        </SelectItem>
                        <SelectItem value="combo">
                          কম্বো প্রোডাক্ট ডিজাইন
                        </SelectItem>
                        <SelectItem value="corporate">
                          কর্পরেট গিফট কম্বো ডিজাইন
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Product Design Field */}

            <FormField
              control={form.control}
              name="productDesign"
              render={({ field }) => (
                <FormItem className="mb-5 h-full">
                  <FormLabel>
                    আপনি কোন প্রোডাক্ট ডিজাইন করাতে চাচ্ছেন?
                  </FormLabel>
                  <FancyMultiSelect
                    selected={field.value}
                    onSelectedChange={(selected) => field.onChange(selected)}
                    data={categories}
                    placeholder="প্রোডাক্ট নির্বাচন করুন"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col sm:flex-row gap-2 flex-1">
              {/* Number of Designs Field */}
              <FormField
                control={form.control}
                name="numberOfDesigns"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>কয়টা ডিজাইন করাতে চাচ্ছেন?</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter number of designs" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Delivery Date Field */}
              <FormField
                control={form.control}
                name="deliveryDate"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>কবে ডেলিভারি নিতে চাচ্ছেন?</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Has Image Field */}
            <FormField
              control={form.control}
              name="hasImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    আপনার কি কোন ছবি আছে যা ডিজাইন করাতে চান?
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="অপশন নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">
                          হ্যাঁ (ছবি আপলোড করতে চাই)
                        </SelectItem>
                        <SelectItem value="no">
                          না (ছবি আপলোড করতে চাই না)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Upload Image Field */}
            {form.watch("hasImage") === "yes" && (
              <FormField
                control={form.control}
                name="designImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ছবিটি আপলোড দিন</FormLabel>
                    <FormControl>
                      <ImageUpload
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
            )}
          </>
        )}
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          {/* Personal Details Fields */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>
                  প্রথম নাম <span className="text-red-500"> *</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="আপনার প্রথম নাম লিখুন" />
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
                  শেষ নাম <span className="text-red-500"> *</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="আপনার শেষ নাম লিখুন" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>
                  ফোন নম্বর <span className="text-red-500"> *</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="আপনার ফোন নম্বর লিখুন" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>ইমেইল</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="আপনার ইমেইল লিখুন" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="additionalDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ডিজাইন নিয়ে যদি কোন কিছু বিস্তারিত বলতে চান</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="আপনার মন্তব্য লিখুন" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={loading || createCustomDesignLoading}
          type="submit"
          variant="destructive"
          size="lg"
        >
          {loading || (createCustomDesignLoading && <Loader2Icon />)}
          Submit
        </Button>
      </form>
    </Form>
  );
}
