import { IconEyeCheck, IconEyeOff } from "@tabler/icons-react";
import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const brandsSchema = z.object({
  name: z.string(),
  image: z.string(),
  description: z.string(),
});

export type Brand = z.infer<typeof brandsSchema>;

export const statuses = [
  {
    value: true,
    label: "Published",
    icon: IconEyeCheck,
  },
  {
    value: false,
    label: "Draft",
    icon: IconEyeOff,
  },
];
