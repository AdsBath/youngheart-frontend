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
import {
  useCreateCouponMutation,
  useUpdateCouponMutation,
} from "@/redux/api/couponApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { toast } from "sonner";

const couponFormSchema = z.object({
  title: z.string().min(3, {
    message: "Title should be at least 3 characters long.",
  }),
  code: z.string().min(4, {
    message: "Coupon code should be at least 4 characters long.",
  }),
  price: z.preprocess(
    (val) => Number(val),
    z.number().positive({
      message: "Price must be a positive number.",
    })
  ),
  priceType: z.enum(["percentage", "fixed"]),
  cappedPrice: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().optional()
  ),
  minSpent: z.preprocess(
    (val) => Number(val),
    z.number().positive({
      message: "Minimum spent amount must be a positive number.",
    })
  ),
  usageLimit: z.preprocess(
    (val) => Number(val),
    z.number().int().positive({
      message: "Usage limit must be a positive integer.",
    })
  ),
  limitPerUser: z.preprocess(
    (val) => Number(val),
    z.number().int().positive({
      message: "Limit per user must be a positive integer.",
    })
  ),
  startTime: z.preprocess(
    (val) => new Date(val as string),
    z.date({
      message: "Start time must be provided.",
    })
  ),
  endTime: z.preprocess(
    (val) => new Date(val as string),
    z.date({
      message: "End time must be provided.",
    })
  ),
  status: z.enum(["active", "in-active", "expired"], {
    message: "Status is required!",
  }),
});

type CouponFormValues = z.infer<typeof couponFormSchema>;

interface CouponFormProps {
  couponsData?: {
    id: string;
    title: string;
    code: string;
    price: number;
    priceType: string;
    cappedPrice?: number;
    minSpent: number;
    usageLimit: number;
    limitPerUser: number;
    startTime: Date;
    endTime: Date;
    status: string;
    productId?: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

const transformCouponDataToFormValues = (
  data: CouponFormProps["couponsData"]
): CouponFormValues => ({
  title: data?.title || "",
  code: data?.code || "",
  price: data?.price || 0,
  priceType: (data?.priceType as "percentage" | "fixed") || "percentage",
  cappedPrice: data?.cappedPrice || 0,
  minSpent: data?.minSpent || 0,
  usageLimit: data?.usageLimit || 0,
  limitPerUser: data?.limitPerUser || 0,
  startTime: data?.startTime ? new Date(data.startTime) : new Date(),
  endTime: data?.endTime ? new Date(data.endTime) : new Date(),
  status: (data?.status as "active" | "in-active" | "expired") || "expired",
});

export default function CouponForm({ couponsData }: CouponFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [createCoupon] = useCreateCouponMutation();
  const [updateCoupon] = useUpdateCouponMutation();

  const form = useForm<CouponFormValues>({
    resolver: zodResolver(couponFormSchema),
    defaultValues: transformCouponDataToFormValues(couponsData),
  });

  useEffect(() => {
    form.reset(transformCouponDataToFormValues(couponsData));
  }, [couponsData, form]);

  async function onSubmit(data: Partial<CouponFormValues>) {
    setIsLoading(true);
    if (couponsData?.id) {
      const result = await updateCoupon({
        id: couponsData.id,
        body: data,
      }).unwrap();
      if (result?.success) {
        toast.success("coupon updated successfully.");
        setIsLoading(false);
      }
      return;
    } else {
      const result = await createCoupon(data).unwrap();
      if (result?.success) {
        toast.success("coupon updated successfully.");
        form.reset({
          title: "",
          code: "",
          price: 0,
          priceType: "percentage",
          cappedPrice: 0,
          minSpent: 0,
          usageLimit: 0,
          limitPerUser: 0,
          startTime: new Date(),
          endTime: new Date(),
          status: "expired",
        });
        setIsLoading(false);
      }
    }
  }

  // console.log("coupons data", couponsData?.startTime, couponsData?.endTime);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-4">
          <div className="w-full">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Coupon Title <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="c.g. coupon title etc." {...field} />
                  </FormControl>
                  <FormDescription>
                    Coupon title should. This will be used to identify the
                    copon.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Coupon Code <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="c.g. coupon code etc." {...field} />
                  </FormControl>
                  <FormDescription>
                    Coupon code should be unique. This will be used to identify
                    the coupons.
                  </FormDescription>
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Coupon value
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="c.g. 100Tk or 50% etc."
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
              name="priceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Coupon Type
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Coupon Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage</SelectItem>
                        <SelectItem value="fixed">Fixed</SelectItem>
                      </SelectContent>
                    </Select>
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
              name="cappedPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Coupon Capped Price
                    <span className="text-zinc-500">(optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={0}
                      type="number"
                      placeholder="c.g. Capped price etc."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The capped price is the maximum amount that can be availed
                    from the coupon.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full">
            <FormField
              control={form.control}
              name="minSpent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Minimum Spent Amount
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="c.g. Min price etc."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The minimum amount that needs to be spent to avail the
                    coupon.
                  </FormDescription>
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
              name="usageLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Usage Limit
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="c.g. usage limit etc."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The number of times the coupon can be used.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full">
            <FormField
              control={form.control}
              name="limitPerUser"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Limit per User <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="c.g. Limit per user etc."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The number of times the coupon can be used by a single user.
                  </FormDescription>
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
              name="startTime"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    Start Time &nbsp;
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(new Date(field.value), "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) => {
                          if (date) {
                            field.onChange(date.toISOString());
                          }
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    The start time is used to track coupon.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full">
            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    End Time &nbsp;
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(new Date(field.value), "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) => {
                          if (date) {
                            field.onChange(date.toISOString());
                          }
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    The end time is used to track coupon.
                  </FormDescription>
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
              <FormItem>
                <FormLabel>
                  Status <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="in-active">In-Active</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          disabled={isLoading}
          className="w-full flex justify-center items-center"
          type="submit"
        >
          {couponsData ? (
            <div className="w-full h-full flex justify-center items-center">
              {isLoading && <IconLoader className="animate-spin" size={17} />}
              <p>Update Coupon</p>
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              {isLoading && <IconLoader className="animate-spin" size={17} />}
              <>Create Coupon</>
            </div>
          )}
        </Button>
      </form>
    </Form>
  );
}
