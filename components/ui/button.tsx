import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-brand text-destructive-foreground hover:bg-brand/90",
        outline:
          "border border-brand bg-background hover:bg-accent hover:text-accent-foreground",

        success:
          "border-transparent bg-bandBlack  text-success-foreground hover:bg-bandBlack/80",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        edit: "text-[#4285F5] dark:bg-slate-800 bg-[#E8F0FE] hover:bg-bg-[#E8F0FE] hover:border-[#4285F5] border",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        hover: "hover:bg-accent hover:text-accent-foreground bg-transparent",
        link: "text-primary underline-offset-4 hover:underline",
        delete:
          " text-red-500 dark:bg-[#F7D7DB]/30 bg-[#F7D7DB] hover:bg-[#F7D7DB] hover:border-red-500 border",
        select:
          "text-red-500 dark:bg-[#F7D7DB]/30 bg-[#F7D7DB] hover:bg-[#F7D7DB] border-red-400 border",
        selectOutline:
          "border border-slate-300 text-slate-5600 hover:bg-[#F7D7DB]/30 hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
