import { IconEyeCheck, IconEyeOff } from "@tabler/icons-react";
import { z } from "zod";

export const ShippingRulesSchema = z.object({
  id: z.string(), // Ensure uuid is imported/defined
  name: z.string(),
  minOrderValue: z.number(),
  shippingCost: z.number(),
  status: z.boolean(), // Add other statuses as needed
  createdAt: z.string().default(() => new Date().toISOString()), // Ensure valid ISO date string
  updatedAt: z.string().default(() => new Date().toISOString()), // Ensure valid ISO date string
});

export type Coupon = z.infer<typeof ShippingRulesSchema>;

export const statuses = [
  {
    value: true,
    label: "Active",
    icon: IconEyeCheck,
  },
  {
    value: false,
    label: "In Active",
    icon: IconEyeOff,
  },
];
