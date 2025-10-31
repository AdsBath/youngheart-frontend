"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { FaRegGem } from "react-icons/fa";
import { GiHand } from "react-icons/gi";
import { MdOutlineDesignServices } from "react-icons/md";
import { toast } from "sonner";
import { useState } from "react";
import { useCreateCustomDesignMutation } from "@/redux/api/customDesignApi";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

type CustomizationFormData = {
  productType: string;
  leatherColor: string;
  liningType: string;
  liningColor: string;
  metalColor: string;
  stitchingColor: string;
  personalizationType: string;
  personalizationText: string;
  size: string;
  priceRange: string;
  deliveryDate: string;
  leatherType: string;
  strapType: string;
  ecoFriendly: boolean;
  otherDetails: string;
};

export default function CustomizePage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [createCustomDesign, { isLoading: createCustomDesignLoading }] =
    useCreateCustomDesignMutation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CustomizationFormData>({
    defaultValues: {
      ecoFriendly: false,
    },
  });

  const features = [
    {
      icon: <GiHand className="w-8 h-8 text-orange-500 " />,
      title: "Artisan Craftsmanship",
      description:
        "Each piece is meticulously handcrafted by skilled artisans with decades of experience.",
    },
    {
      icon: <MdOutlineDesignServices className="w-8 h-8 text-amber-500" />,
      title: "Fully Customizable",
      description:
        "From leather type to stitching color, every detail is tailored to your preferences.",
    },
    {
      icon: <FaRegGem className="w-8 h-8 text-emerald-500" />,
      title: "Premium Materials",
      description:
        "Only the finest full-grain and vegetable-tanned leathers for lasting quality.",
    },
  ];

  const onSubmit = async (data: CustomizationFormData) => {
    try {
      setLoading(true);
      // Build payload for Prisma model
      const payload = {
        wantCustomDesign: "Yes",
        designType: "Custom Leather Product",
        numberOfDesigns: "1",
        deliveryDate: data.deliveryDate,
        hasImage: "false",
        firstName: user?.firstName || "Someone", // ⚠️ Replace with actual user input if you collect it
        lastName: user?.lastName || "Human",
        phone: user?.phone || "01*********",
        email: user?.email || "Someone@gmail.com",
        additionalDetails: data.otherDetails || null,
        productDesign: data, // Your JSON field 👌
      };

      console.log("Submitting payload:", payload);

      // const response = await fetch("/api/custom-design", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(payload),
      // });

      const res = await createCustomDesign(payload);
      console.log(res);
      if (res?.data?.statusCode === 200 && res?.data?.success) {
        toast.success("Wait for sometimes confirmation call untill");
        reset();
      } else {
        toast.error("Failed to submit custom request");
      }
    } catch (error) {
      console.error(error);
      toast.error("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background space-y-10">
      <section className="relative bg-primary text-primary-foreground py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <div className="absolute inset-0 bg-[url('/customise-design.jpg')] bg-cover bg-center" />
        </div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-3xl md:text-7xl font-bold mb-6 text-balance">
            Customize Your Dream With Leather
          </h1>
          <p className="text-sm md:text-xl text-primary-foreground/90 font-serif max-w-2xl mx-auto leading-relaxed ">
            Handcrafted excellence meets personal expression. Create a bespoke
            leather piece that tells your unique story.
          </p>
        </div>
      </section>

      <section className="bg-card md:hidden block">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
                className="group bg-background rounded-xl shadow-sm hover:shadow-md p-6 text-center border border-border hover:border-primary/30 transition-all"
              >
                <div className="size-5 mx-auto rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold ">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="container grid grid-cols-5 gap-6 px-4">
        <div className="md:col-span-2 col-span-5">
          <div className="text-center md:text-start pb-2">
            <h2 className="text-xl md:text-2xl font-bold">
              Design Your Masterpiece
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Complete the form below to begin your custom leather journey
            </p>
          </div>
          <div className="md:grid grid-cols-1 gap-6 hidden">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
                className="group bg-background rounded-sm shadow-sm hover:shadow-md p-8 text-center border border-border hover:border-primary/30 transition-all"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="md:col-span-3 col-span-5 p-4 border rounded-xl ">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            {/* Product Type */}
            <div className="space-y-2">
              <Label htmlFor="productType">Product Type</Label>
              <Input
                id="productType"
                placeholder="e.g., Wallet, Bag, Belt, Portfolio"
                className="h-8"
                {...register("productType", {
                  required: "Product type is required",
                })}
              />
              {errors.productType && (
                <p className="text-sm text-destructive">
                  {errors.productType.message}
                </p>
              )}
            </div>

            {/* Leather Color */}
            <div className="space-y-2">
              <Label htmlFor="leatherColor">Leather Color</Label>
              <Input
                id="leatherColor"
                placeholder="e.g., Cognac Brown, Midnight Black, Natural Tan"
                className="h-8"
                {...register("leatherColor", {
                  required: "Leather color is required",
                })}
              />
              {errors.leatherColor && (
                <p className="text-sm text-destructive">
                  {errors.leatherColor.message}
                </p>
              )}
            </div>

            {/* Lining Type & Color */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="liningType">Lining Type</Label>
                <Input
                  id="liningType"
                  placeholder="e.g., Fabric, Suede, Leather"
                  className="h-8"
                  {...register("liningType")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="liningColor">Lining Color</Label>
                <Input
                  id="liningColor"
                  placeholder="e.g., Burgundy, Navy, Cream"
                  className="h-8"
                  {...register("liningColor")}
                />
              </div>
            </div>

            {/* Metal Color */}
            <div className="space-y-2">
              <Label htmlFor="metalColor">Metal Color</Label>
              <Select onValueChange={(value) => setValue("metalColor", value)}>
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Select metal color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="silver">Silver</SelectItem>
                  <SelectItem value="gold">Gold</SelectItem>
                  <SelectItem value="antique-brass">Antique Brass</SelectItem>
                  <SelectItem value="matte-black">Matte Black</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Stitching Color */}
            <div className="space-y-2">
              <Label>Stitching Color</Label>
              <RadioGroup
                onValueChange={(value) => setValue("stitchingColor", value)}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="matching" id="matching" />
                  <Label
                    htmlFor="matching"
                    className="font-normal cursor-pointer"
                  >
                    Matching Tone
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="contrast" id="contrast" />
                  <Label
                    htmlFor="contrast"
                    className="font-normal cursor-pointer"
                  >
                    Contrast Stitching
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Personalization */}
            <div className="space-y-2">
              <Label>Personalization</Label>
              <div className="space-y-2">
                <Select
                  onValueChange={(value) =>
                    setValue("personalizationType", value)
                  }
                >
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="Select personalization type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monogram">
                      Monogram / Initials
                    </SelectItem>
                    <SelectItem value="name">Name Engraving</SelectItem>
                    <SelectItem value="logo">
                      Logo Engraving (Corporate)
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Enter text or logo details"
                  className="h-8"
                  {...register("personalizationText")}
                />
              </div>
            </div>

            {/* Size */}
            <div className="space-y-2">
              <Label htmlFor="size">Size</Label>
              <Input
                id="size"
                placeholder="e.g., Small, Medium, Large or custom dimensions"
                className="h-8"
                {...register("size")}
              />
            </div>

            {/* Price Range & Delivery Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="priceRange">Budget Range</Label>
                <Input
                  id="priceRange"
                  placeholder="e.g., $100-$200"
                  className="h-8"
                  {...register("priceRange")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deliveryDate">Desired Delivery Date</Label>
                <Input
                  id="deliveryDate"
                  type="date"
                  className="h-8"
                  {...register("deliveryDate")}
                />
              </div>
            </div>

            {/* Leather Type */}
            <div className="space-y-2">
              <Label htmlFor="leatherType">Leather Type</Label>
              <Input
                id="leatherType"
                placeholder="e.g., Full-grain, Top-grain, Vegetable-tanned"
                className="h-8"
                {...register("leatherType")}
              />
            </div>

            {/* Other Details */}
            <div className="space-y-2">
              <Label>Additional Options</Label>

              {/* Strap Type */}
              <div className="space-y-2">
                <Label
                  htmlFor="strapType"
                  className="text-sm font-normal text-muted-foreground"
                >
                  Strap Configuration
                </Label>
                <Select onValueChange={(value) => setValue("strapType", value)}>
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="Select strap type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="adjustable">Adjustable</SelectItem>
                    <SelectItem value="fixed">Fixed</SelectItem>
                    <SelectItem value="detachable">Detachable</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Eco-Friendly Option */}
              <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/50">
                <Checkbox
                  id="ecoFriendly"
                  onCheckedChange={(checked) =>
                    setValue("ecoFriendly", checked as boolean)
                  }
                />
                <Label
                  htmlFor="ecoFriendly"
                  className="font-normal cursor-pointer leading-relaxed"
                >
                  Eco-Friendly Option (Vegetable-tanned, sustainable leather)
                </Label>
              </div>

              {/* Additional Notes */}
              <div className="space-y-2">
                <Label
                  htmlFor="otherDetails"
                  className="text-sm font-normal text-muted-foreground"
                >
                  Special Requests or Notes
                </Label>
                <Textarea
                  id="otherDetails"
                  placeholder="Share any additional details, special requirements, or inspiration for your custom piece..."
                  rows={5}
                  className="resize-none"
                  {...register("otherDetails")}
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading || createCustomDesignLoading || !user}
              variant={"ghost"}
              className="w-full text-white hover:text-white bg-orange-500 hover:bg-orange-600 "
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>
                {" "}
                {user
                  ? "Submit Your Custom Request"
                  : "Login to Submit Your Custom Request"}
              </span>
            </Button>
          </form>
        </div>
      </section>

      <section className="relative py-20 bg-gradient-to-b from-red-100/30 via-background to-red-50/20 overflow-hidden">
        {/* Decorative gradient blob */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl opacity-40" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-5"
          >
            Trusted by Discerning Clients
          </motion.p>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-4xl font-bold text-foreground leading-tight mb-6 "
          >
            Every piece is a testament to quality — crafted with passion and
            precision
          </motion.h3>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground font-serif leading-relaxed text-sm md:text-base max-w-2xl mx-auto"
          >
            Our artisans bring generations of leather-working expertise to
            create pieces that age beautifully and last a lifetime. Your custom
            creation will be ready within{" "}
            <span className="text-foreground font-medium">3–4 weeks</span>.
          </motion.p>
        </motion.div>
      </section>
    </div>
  );
}
