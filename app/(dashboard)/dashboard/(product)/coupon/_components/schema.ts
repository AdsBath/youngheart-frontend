import { IconEyeCheck, IconEyeOff } from "@tabler/icons-react";
import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const couponSchema = z.object({
  id: z.string(), // Ensure uuid is imported/defined
  title: z.string(),
  code: z.string(),
  price: z.number(),
  priceType: z.enum(["percentage", "fixed"]),
  cappedPrice: z.number().optional(),
  minSpent: z.number(),
  usageLimit: z.number(),
  limitPerUser: z.number(),
  startTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }), // Ensure valid ISO date string
  endTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }), // Ensure valid ISO date string
  status: z.enum(["active", "inactive", "expired"]), // Add other statuses as needed
  productId: z.string().uuid().optional(),
  timesUsed: z.number().default(0),
  createdAt: z.string().default(() => new Date().toISOString()), // Ensure valid ISO date string
  updatedAt: z.string().default(() => new Date().toISOString()), // Ensure valid ISO date string
});

export type Coupon = z.infer<typeof couponSchema>;

export const statuses = [
  {
    value: "active",
    label: "Active",
    icon: IconEyeCheck,
  },
  {
    value: "in-active",
    label: "In Active",
    icon: IconEyeOff,
  },
  {
    value: "expired",
    label: "Expired",
    icon: IconEyeOff,
  },
];
