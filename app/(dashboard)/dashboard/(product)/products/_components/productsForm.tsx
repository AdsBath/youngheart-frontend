"use client";

import { Button } from "@/components/custom/button";
import ImageUpload from "@/components/imageUpload";
import ImagesUpload from "@/components/imagesUpload";
import { FancyMultiSelect } from "@/components/multi-select";
import { Badge } from "@/components/ui/badge";
import CreatableSelect from "react-select/creatable";
// import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useVariantsQuery } from "@/redux/api/attributeApi";
import { useBrandsQuery } from "@/redux/api/brandApi";
import { useBundleDiscountsQuery } from "@/redux/api/bundleDiscountApi";
import { useAllCategoriesQuery } from "@/redux/api/categoriesApi";
import { useFeaturesQuery } from "@/redux/api/featureApi";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/redux/api/productApi";
import { useProductCollectionsQuery } from "@/redux/api/productCollectionApi";
import { useShippingRulesQuery } from "@/redux/api/shippingRulesApi";
import { extractAttributes } from "@/utils/extractAttribute";
import { zodResolver } from "@hookform/resolvers/zod";

import { IconChevronLeft, IconLoader } from "@tabler/icons-react";
import { format } from "date-fns";
import { CalendarIcon, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { z } from "zod";
const isAvailable = ["inStock", "outOfStock", "preOrder"] as const;
const status = ["draft", "published", "archived"] as const;
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
const variationSchema = z.object({
  id: z.string().optional(),
  color: z.string().optional(),
  size: z.string().optional(),
  age: z.string().optional(),
  quantity: z.string().optional(),
  price: z.string().optional(),
  discountPrice: z.string().optional().nullable(),
});

const ProductsFormSchema = z.object({
  sku: z
    .string({ message: "Sku is required" })
    .min(1, { message: "Must be at least one character" }),
  name: z
    .string()
    .min(4, { message: "Name should be at least 4 characters long." }),
  thumbnail: z.string().min(4, { message: "Please upload a product image." }),
  images: z.array(z.string().optional()).optional(),
  price: z.string().min(1, { message: "Please enter a price." }),
  discountPrice: z.string().optional().nullable(),
  isAvailable: z.enum(isAvailable),
  status: z.enum(status),
  stock: z.string().default("0"),
  description: z.string().min(10, {
    message: "Description should be at least 10 characters long.",
  }),
  productDetails: z.string().optional(),
  shortDescription: z.string().min(10, {
    message: "Short Description should be at least 10 characters long.",
  }),
  categoryId: z.string().min(1, { message: "Please select a category." }),
  bundleDiscountId: z.string().optional().nullable(),
  brandId: z.string().optional().nullable(),
  shippingRuleId: z.string().optional().nullable(),
  productCollections: z
    .array(z.object({ id: z.string(), title: z.string() }))
    .default([]),
  features: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .default([])
    .optional(),

  variations: z.array(variationSchema).default([]),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  stockInDate: z.string().optional(),

  restockDate: z.string().optional(),
  stockInQuantity: z.string().optional(),
  restockInQuantity: z.string().optional(),
  expireDate: z.string().optional(),
  showInOffer: z.boolean().default(false),
  showInHomeCollection: z.boolean().default(false),
});

type ProductsFormValues = z.infer<typeof ProductsFormSchema>;

interface ProductsFormProps {
  productData?: {
    id: string;
    sku: string;
    name: string;
    slug: string;
    thumbnail: string;
    description: string;
    productDetails: string;
    shortDescription: string;
    images: string[];
    price: string;
    discountPrice: string | null;
    stock: string | null;
    isAvailable: (typeof isAvailable)[number];
    status: (typeof status)[number];
    categoryId: string;
    bundleDiscountId: string | null;
    showInOffer: boolean;
    showInHomeCollection: boolean;
    brandId: string | null;
    shippingRuleId: string | null;
    features: { value: string; label: string }[];
    productProductCollections:
      | {
          id: string;
          productId: string;
          productCollectionId: string;
        }[]
      | [];
    variations: {
      id: string;
      quantity: string;
      color: string;
      size: string;
      price: string;
      age: string;
      discountPrice: string | null;
    }[];
    metaTitle: string;
    metaDescription: string;
    createdAt: string;
    updatedAt: string;
  };
}

export default function ProductsForm({ productData }: ProductsFormProps) {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [selectFeature, setSelectFeature] = useState([]);
  const [showInHomeCollection, setShowInHomeCollection] = useState(false);
  const [showInOffer, setShowInOffer] = useState(false);
  const router = useRouter();
  const { data: variantsData, isLoading: variantsLoading } = useVariantsQuery(
    {}
  );
  const { data: brandData, isLoading: brandLoading } = useBrandsQuery({});

  const brandList = brandData?.data?.data;

  const { data: categoriesData, isLoading: categoriesLoading } =
    useAllCategoriesQuery({});

  const { data: productCollectionsData, isLoading: productCollectionsLoading } =
    useProductCollectionsQuery({});
  const { data: featureData, isLoading: featureeLoading } = useFeaturesQuery(
    {}
  );
  const { data: shippingData, isLoading: shippingLoading } =
    useShippingRulesQuery({});
  // const { data: taxRuleData, isLoading: taxRuleLoading } = useTaxRulesQuery({});
  // const { data: vendorData, isLoading: vendorLoading } = useVendorsQuery({});
  const { data: bundleDiscountData, isLoading: bundleDiscountLoading } =
    useBundleDiscountsQuery({});
  // const { data: brandData, isLoading: brandLoading } = useBrandsQuery({});
  const [createProduct, { isLoading: createProductLoading }] =
    useCreateProductMutation();
  const [updateProduct, { isLoading: updateProductLoading }] =
    useUpdateProductMutation();
  const [isLoading, setIsLoading] = useState(false);

  const colors = extractAttributes(variantsData?.data?.data, "Color");
  const sizes = extractAttributes(variantsData?.data?.data, "Size");
  const ages = extractAttributes(variantsData?.data?.data, "Age");

  const productCollectionsList = productCollectionsData?.data?.data?.map(
    (productCollection: any) => ({
      id: productCollection.id,
      title: productCollection.name,
    })
  );

  const featureList = featureData?.data?.map((feature: any) => ({
    value: feature.id,
    label: feature.name,
  }));

  let productCollection: any[] = [];

  if (productData) {
    productData?.productProductCollections?.forEach((item: any) => {
      const filteredCollections = productCollectionsList?.filter(
        (collection: any) => collection?.id === item.productCollectionId
      );
      productCollection = productCollection.concat(filteredCollections);
    });
  }

  const defaultFeature =
    productData?.features?.map((feature: any) => {
      return {
        value: feature.feature.id,
        label: feature.feature.name,
      };
    }) || [];
  const form = useForm<ProductsFormValues>({
    resolver: zodResolver(ProductsFormSchema),
    defaultValues: {
      sku: productData?.sku || "",
      name: productData?.name || "",
      price: productData?.price || "0",
      discountPrice: productData?.discountPrice || null,
      thumbnail: productData?.thumbnail || "",
      images: productData?.images || [],
      isAvailable: productData?.isAvailable || "outOfStock",
      status: productData?.status || "draft",
      stock: productData?.stock || totalQuantity.toString(),
      description: productData?.description || "",
      productDetails: productData?.productDetails || "",
      shortDescription: productData?.shortDescription || "",
      categoryId: productData?.categoryId || "",
      bundleDiscountId: productData?.bundleDiscountId || null,
      productCollections: productCollection || [],
      brandId: productData?.brandId || null,
      features: defaultFeature || [],

      variations: productData?.variations || [
        {
          color: "",
          size: "",
          quantity: "0",
          price: "0",
          discountPrice: null,
        },
      ],
      metaTitle: productData?.metaTitle || "",
      metaDescription: productData?.metaDescription || "",
    },
  });

  const {
    register,
    control,
    formState: { errors },
    watch,
  } = form;

  const watchValues = watch();
  useEffect(() => {
    const newTotalQuantity = watchValues.variations.reduce(
      (acc, item) => acc + parseInt(item.quantity || "0"),
      0
    );
    setTotalQuantity(newTotalQuantity);
  }, [watchValues]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variations",
  });

  useEffect(() => {
    form.reset();
  }, [form]);
  function replaceStringNullWithNull(data: any): void {
    Object.keys(data).forEach((key: keyof any) => {
      // Check if the value is "null" and replace it with null
      if (data[key] === "null") {
        data[key] = null;
      }

      // If the value is an array, iterate over its objects
      if (Array.isArray(data[key])) {
        data[key].forEach((obj: any) => {
          Object.keys(obj).forEach((prop: keyof any) => {
            if (obj[prop] === "null") {
              obj[prop] = null;
            }
          });
        });
      }
    });
  }
  console.log({ showInHomeCollection, showInOffer });
  async function onSubmit(data: any) {
    replaceStringNullWithNull(data);
    if (selectFeature?.length > 0) {
      data.features = selectFeature;
    }

    try {
      setIsLoading(true);
      if (productData?.id) {
        const result = await updateProduct({
          id: productData.id,
          body: {
            ...data,
            showInHomeCollection,
            showInOffer,
          },
        });

        if (result?.data?.success) {
          setIsLoading(false);
          toast({
            title: "Product updated successfully.",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">
                  {JSON.stringify(result?.data?.data?.name, null, 2)}
                </code>
              </pre>
            ),
          });
          router.push("/dashboard/products");
        } else {
          setIsLoading(false);
          toast({
            title: result.error as string,
            description: "",
          });
        }
        return;
      } else {
        const result = await createProduct({
          ...data,
          showInHomeCollection,
          showInOffer,
        }).unwrap();

        if (result?.success) {
          setIsLoading(false);
          toast({
            title: "Product created successfully.",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">
                  Product Name :{JSON.stringify(result.data.name, null, 2)}
                </code>
              </pre>
            ),
          });
          router.push("/dashboard/products");
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setShowInHomeCollection(productData?.showInHomeCollection || false);
    setShowInOffer(productData?.showInOffer || false);
  }, [productData]);

  const categoriesList = categoriesData?.data?.data?.map((category: any) => ({
    id: category.id,
    title: category.title,
  }));

  const shippingList = shippingData?.data?.data?.map((shipping: any) => ({
    id: shipping.id,
    name: shipping.name,
  }));

  const bundleDiscountList = bundleDiscountData?.data?.data?.map(
    (bundleDiscount: any) => ({
      id: bundleDiscount.id,
      name: bundleDiscount.name,
    })
  );

  const onChange = (e: any) => {
    setSelectFeature(e);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <main className="w-full grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="grid w-full flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <Link href="/dashboard/products">
                <Button className="h-7 w-7" size="icon" variant="outline">
                  <IconChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Button>
              </Link>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Pro Form
              </h1>
              <Badge
                className={`ml-auto sm:ml-0 ${
                  productData?.status &&
                  "bg-green-500 dark:text-stone-50 text-muted"
                } ${!productData?.status && "bg-yellow-300"}`}
                variant={
                  productData
                    ? !productData.status
                      ? "destructive"
                      : "secondary"
                    : "outline"
                }
              >
                {productData ? productData?.status : "Draft"}
              </Badge>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button
                  disabled={isLoading}
                  className="w-full flex justify-center items-center"
                  type="submit"
                >
                  {productData ? (
                    <div className="w-full h-full flex justify-center items-center">
                      {isLoading && (
                        <IconLoader className="animate-spin" size={17} />
                      )}
                      <p>Update Product</p>
                    </div>
                  ) : (
                    <div className="w-full h-full flex justify-center items-center">
                      {isLoading && (
                        <IconLoader className="animate-spin" size={17} />
                      )}
                      <p>Save Product</p>
                    </div>
                  )}
                </Button>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              {/* left side */}
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                {/* product details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                    <CardDescription>
                      product details and information about the product here ...
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        {/* Name */}
                        <div className="w-[50%]">
                          <FormField
                            control={form.control}
                            name="sku"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Product sku &nbsp;
                                  <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="e.g. product sku"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  The sku of the product identification to find
                                  unique product. This sku will be used for
                                  searching.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        {/* Name */}
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Product name &nbsp;
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g. product name"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                The name of the product as it will appear on
                                your site. This name will be used for searching
                                and SEO purposes.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-3">
                        {/* short description */}

                        <FormField
                          control={form.control}
                          name="shortDescription"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Short Description{" "}
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="c.g. short description here ..."
                                  className="resize-none"
                                  {...field}
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-3">
                        {/* Description */}
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Description &nbsp;
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <ReactQuill
                                  theme="snow"
                                  value={field.value}
                                  onChange={(content) => {
                                    field.onChange(content);
                                  }}
                                  placeholder="e.g. description is here..."
                                  className="custom-quill"
                                />
                              </FormControl>
                              <FormDescription>
                                A description of the product. This will appear
                                on the product page.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="productDetails"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Product Details &nbsp;
                                <span className="text-zinc-500">
                                  (optional)
                                </span>
                              </FormLabel>
                              <FormControl>
                                <ReactQuill
                                  theme="snow"
                                  value={field.value}
                                  onChange={(content) => {
                                    field.onChange(content);
                                  }}
                                  placeholder="e.g. product details is here..."
                                  className="custom-quill"
                                />
                              </FormControl>
                              <FormDescription>
                                A details of the product. This will appear on
                                the product page.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* stock */}
                <Card>
                  <CardHeader>
                    <CardTitle>Price management</CardTitle>
                    <CardDescription>
                      pricing information about the product. You can add
                      multiple variants of the product here.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 ">
                      <div className="grid gap-6 sm:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Price &nbsp;
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g. 200 , 300 , 400 ect."
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Price of the product. This will be displayed on
                                the product page.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="discountPrice"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Discount in % &nbsp;
                                <span className="text-muted-foreground">
                                  | (Optional)
                                </span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="e.g. 190 , 290 , 390 ect."
                                  {...field}
                                  value={field.value || ""}
                                />
                              </FormControl>
                              <FormDescription>
                                Discounted price of the product.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* additional information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Additional Information</CardTitle>
                    <CardDescription>
                      Category ,Bundle Discount and Product Collection
                      information about the product. You can add multiple
                      variants of the product here.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 mb-5">
                      {/* Category ID */}
                      <div className="grid gap-1 sm:grid-cols-2">
                        {!categoriesLoading ? (
                          <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Product Category &nbsp;
                                  <span className="text-red-500"> *</span>
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value || ""}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a parent category" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value={"null"}>
                                      No Category
                                    </SelectItem>
                                    {categoriesList?.map((category: any) => (
                                      <SelectItem
                                        key={category.id}
                                        value={category.id}
                                      >
                                        {category.title}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormDescription>
                                  If you have a parent category, you can select
                                  it here. This will help users navigate your
                                  category more easily.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        ) : (
                          <Skeleton className="h-9 w-full" />
                        )}

                        {!shippingLoading ? (
                          <FormField
                            control={form.control}
                            name="shippingRuleId"
                            render={({ field }) => (
                              <FormItem className="mb-5 h-full">
                                <FormLabel>
                                  Shipping Rules &nbsp;
                                  <span className="text-muted-foreground">
                                    | (Optional)
                                  </span>
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value || ""}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a bundle discount" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value={"null"}>
                                      No Shipping Rules
                                    </SelectItem>
                                    {shippingList?.map((shippingItem: any) => (
                                      <SelectItem
                                        key={shippingItem.id}
                                        value={shippingItem.id}
                                      >
                                        {shippingItem.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        ) : (
                          <Skeleton className="h-9 w-full" />
                        )}
                      </div>
                    </div>
                    <div className="grid gap-1 sm:grid-cols-2 ">
                      {!bundleDiscountLoading ? (
                        <FormField
                          control={form.control}
                          name="bundleDiscountId"
                          render={({ field }) => (
                            <FormItem className="mb-5 h-full">
                              <FormLabel>
                                Offer Discount &nbsp;
                                <span className="text-muted-foreground">
                                  | (Optional)
                                </span>
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value || ""}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a bundle discount" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value={"null"}>
                                    No Discount
                                  </SelectItem>
                                  {bundleDiscountList?.map((category: any) => (
                                    <SelectItem
                                      key={category.id}
                                      value={category.id}
                                    >
                                      {category.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ) : (
                        <Skeleton className="h-9 w-full" />
                      )}
                      <FormField
                        control={form.control}
                        name="showInOffer"
                        render={({ field }) => (
                          <FormItem className="mb-5 h-full flex items-center justify-between">
                            <FormLabel className="text-sm mt-2">
                              Show in Home Page Offer Section
                            </FormLabel>

                            <FormControl>
                              {/* <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                defaultChecked={productData?.showInOffer}
                              /> */}
                              <input
                                type="checkbox"
                                onChange={(e) => setShowInOffer(!showInOffer)}
                                checked={showInOffer}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>{" "}
                    <div className="grid gap-1 sm:grid-cols-2">
                      {!productCollectionsLoading ? (
                        <FormField
                          control={form.control}
                          name="productCollections"
                          render={({ field }) => {
                            return (
                              <FormItem className="mb-5 h-full">
                                <FormLabel>
                                  Product Collections &nbsp;
                                  <span className="text-red-500"> *</span>
                                </FormLabel>
                                <FancyMultiSelect
                                  selected={field.value}
                                  onSelectedChange={(selected) =>
                                    field.onChange(selected)
                                  }
                                  data={productCollectionsList}
                                  placeholder="Select product collection"
                                />
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                      ) : (
                        <Skeleton className="h-9 w-full" />
                      )}
                      <FormField
                        control={form.control}
                        name="showInHomeCollection"
                        render={({ field }) => {
                          return (
                            <FormItem className="mb-5 h-full flex items-center justify-between">
                              <FormLabel className="text-sm mt-2">
                                Show in Home Page Collection
                              </FormLabel>

                              <FormControl>
                                {/* <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  defaultChecked={
                                    productData?.showInHomeCollection
                                  }
                                /> */}
                                <input
                                  type="checkbox"
                                  onChange={(e) =>
                                    setShowInHomeCollection(
                                      !showInHomeCollection
                                    )
                                  }
                                  checked={showInHomeCollection}
                                />
                              </FormControl>
                            </FormItem>
                          );
                        }}
                      />
                    </div>
                    <div className="grid gap-1 sm:grid-cols-2">
                      {/* {!featureeLoading ? (
                        <FormField
                          control={form.control}
                          name="features"
                          render={({ field }) => {
                            return (
                              <FormItem className="mb-5 h-full">
                                <FormLabel>
                                  Features &nbsp;
                                  <span className="text-red-500"> *</span>
                                </FormLabel>

                                <CreatableSelect
                                  isClearable
                                  options={featureList}
                                  defaultValue={defaultFeature}
                                  onChange={(value) => onChange(value)}
                                  isMulti
                                  className="mt-2 text-left"
                                  name="features"
                                />

                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                      ) : (
                        <Skeleton className="h-9 w-full" />
                      )} */}

                      {!brandLoading ? (
                        <FormField
                          control={form.control}
                          name="brandId"
                          render={({ field }) => (
                            <FormItem className="mb-5 h-full">
                              <FormLabel>
                                Brands &nbsp;
                                <span className="text-muted-foreground">
                                  | (Optional)
                                </span>
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value || ""}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a bundle discount" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value={"null"}>
                                    None Brand
                                  </SelectItem>
                                  {brandList?.map((item: any) => (
                                    <SelectItem key={item?.id} value={item?.id}>
                                      {item?.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ) : (
                        <Skeleton className="h-9 w-full" />
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* inventory */}
                {!productData && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Inventory</CardTitle>
                      <CardDescription>
                        Select the variants of the product. You can add multiple
                        variants of the product here.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-5">
                        <div className="grid gap-6 sm:grid-cols-2 items-center">
                          <div>
                            <FormField
                              control={form.control}
                              name="stockInQuantity"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Stock in Quantity &nbsp;
                                    <span className="text-muted-foreground">
                                      | (Optional)
                                    </span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="text"
                                      placeholder="e.g. 100 , 200 , 300 ect."
                                      {...field}
                                      value={field.value || ""}
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    Quantity of the product in stock.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="mt-2">
                            <FormField
                              control={form.control}
                              name="stockInDate"
                              render={({ field }) => (
                                <FormItem className="flex flex-col">
                                  <FormLabel>
                                    Stock In Date &nbsp;
                                    <span className="text-muted-foreground">
                                      | (Optional)
                                    </span>
                                  </FormLabel>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant={"outline"}
                                          className={cn(
                                            "w-[240px] pl-3 text-left font-normal",
                                            !field.value &&
                                              "text-muted-foreground"
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
                                    <PopoverContent
                                      className="w-auto p-0"
                                      align="start"
                                    >
                                      <Calendar
                                        mode="single"
                                        selected={
                                          field.value
                                            ? new Date(field.value)
                                            : undefined
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
                                    The stock-in date is used to track
                                    inventory.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 items-center">
                          <div>
                            <FormField
                              control={form.control}
                              name="restockInQuantity"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Re-stock in Quantity &nbsp;
                                    <span className="text-muted-foreground">
                                      | (Optional)
                                    </span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="text"
                                      placeholder="e.g. 100 , 200 , 300 ect."
                                      {...field}
                                      value={field.value || ""}
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    Quantity of the product in stock.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="mt-2">
                            <FormField
                              control={form.control}
                              name="restockDate"
                              render={({ field }) => (
                                <FormItem className="flex flex-col">
                                  <FormLabel>Restock Date</FormLabel>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant={"outline"}
                                          className={cn(
                                            "w-[240px] pl-3 text-left font-normal",
                                            !field.value &&
                                              "text-muted-foreground"
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
                                    <PopoverContent
                                      className="w-auto p-0"
                                      align="start"
                                    >
                                      <Calendar
                                        mode="single"
                                        selected={
                                          field.value
                                            ? new Date(field.value)
                                            : undefined
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
                                    The restock date is used to plan inventory
                                    restocking.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-1">
                          <FormField
                            control={form.control}
                            name="expireDate"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>
                                  Expire In Date &nbsp;
                                  <span className="text-muted-foreground">
                                    | (Optional)
                                  </span>
                                </FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-[240px] pl-3 text-left font-normal",
                                          !field.value &&
                                            "text-muted-foreground"
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
                                  <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                  >
                                    <Calendar
                                      mode="single"
                                      selected={
                                        field.value
                                          ? new Date(field.value)
                                          : undefined
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
                                  The stock-in date is used to track inventory.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* SKU */}
                        {/* <FormField
                            control={form.control}
                            name="SKU"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  SKU &nbsp;
                                  <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="e.g. SKU-1234 , SKU-5678 ect."
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  SKU (Stock Keeping Unit) is a unique
                                  identifier for each product in your store.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          /> */}
                      </div>
                    </CardContent>
                  </Card>
                )}
                {/* variations */}
                <Card>
                  <CardHeader>
                    <CardTitle>Variations</CardTitle>
                    <CardDescription>
                      Select the variants of the product. You can add multiple
                      variants of the product here.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="w-1/2">
                      <FormField
                        control={form.control}
                        name="stock"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Quantity &nbsp;
                              <span className="text-muted-foreground">
                                | (Optional)
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                readOnly
                                placeholder="e.g. 100 , 200 , 300 ect."
                                {...field}
                                value={totalQuantity}
                              />
                            </FormControl>
                            <FormDescription>
                              Quantity of the product in stock.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="space-y-4">
                      {fields?.map((field, index) => (
                        <div key={field.id} className="space-y-4">
                          <div className="grid sm:grid-cols-6 gap-4 items-center justify-between space-y-3">
                            {/* <FormItem className="mt-3">
                              <FormLabel className="block mb-2">Age</FormLabel>
                              <Controller
                                name={`variations.${index}.age`}
                                control={control}
                                render={({ field }) => (
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select age" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value={"null"}>
                                        No Age Limit
                                      </SelectItem>
                                      {ages?.map((age) => (
                                        <SelectItem key={age} value={age}>
                                          {age}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                            </FormItem> */}
                            <FormItem className="mt-3">
                              <FormLabel className="block mb-2">
                                Color
                              </FormLabel>
                              <Controller
                                name={`variations.${index}.color`}
                                control={control}
                                render={({ field }) => (
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a color" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value={"null"}>
                                        No Color
                                      </SelectItem>
                                      {colors?.map((color) => (
                                        <SelectItem key={color} value={color}>
                                          {color}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                            </FormItem>
                            <FormItem>
                              <FormLabel className="block mb-2">Size</FormLabel>
                              <Controller
                                name={`variations.${index}.size`}
                                control={control}
                                render={({ field }) => (
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a size" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value={"null"}>
                                        No Size
                                      </SelectItem>
                                      {sizes?.map((size) => (
                                        <SelectItem key={size} value={size}>
                                          {size}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                            </FormItem>
                            <FormItem>
                              <FormLabel className="block mb-2">
                                Stock Quantity
                              </FormLabel>
                              <Input
                                type="text"
                                {...register(`variations.${index}.quantity`, {
                                  valueAsNumber: false,
                                })}
                                className={`w-full p-2 border ${
                                  errors.variations?.[index]?.quantity
                                    ? "border-red-500"
                                    : "border-gray-300"
                                }`}
                              />
                            </FormItem>
                            <FormItem>
                              <FormLabel className="block mb-2">
                                Price
                              </FormLabel>
                              <Input
                                type="text"
                                step="0.01"
                                {...register(`variations.${index}.price`, {
                                  valueAsNumber: false,
                                })}
                                className={`w-full p-2 border ${
                                  errors.variations?.[index]?.price
                                    ? "border-red-500"
                                    : "border-gray-300"
                                }`}
                              />
                            </FormItem>
                            <FormItem>
                              <FormLabel className="block mb-2">
                                Discount
                              </FormLabel>
                              <Input
                                type="text"
                                step="0.01"
                                {...register(
                                  `variations.${index}.discountPrice`,
                                  {
                                    valueAsNumber: false,
                                  }
                                )}
                                className={`w-full p-2 border ${
                                  errors.variations?.[index]?.discountPrice
                                    ? "border-red-500"
                                    : "border-gray-300"
                                }`}
                              />
                            </FormItem>
                            <div className="pt-[22px]">
                              <Button
                                type="button"
                                onClick={() => remove(index)}
                                variant="destructive"
                                size="sm"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <Button
                        type="button"
                        onClick={() =>
                          append({
                            color: "",
                            size: "",
                            quantity: "0",
                            price: "0",
                            discountPrice: "0",
                          })
                        }
                        className="mt-4 dark:text-black text-white"
                      >
                        Add Variation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                {/* SEO information */}
                <Card>
                  <CardHeader>
                    <CardTitle>SEO</CardTitle>
                    <CardDescription>
                      Your must be add seo information for make a google search
                      able got product
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <FormField
                        control={form.control}
                        name="metaTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Meta Title{" "}
                              <span className="text-zinc-500">(optional)</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. meta title here..."
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Maximum length: 60 characters. Minimum length: 50
                              characters.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="metaDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Meta Description{" "}
                              <span className="text-zinc-500">(optional)</span>
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="e.g. meta description here..."
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Maximum length: 155 characters. Minimum length: 70
                              characters.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
              {/* right side */}
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-3">
                  <CardHeader>
                    <CardTitle>Product Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 h-full">
                      <div className="grid gap-3">
                        {/* status */}
                        <FormField
                          control={form.control}
                          name="status"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Product Status &nbsp;</FormLabel>
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
                                  <SelectItem value="draft">Draft</SelectItem>
                                  <SelectItem value="published">
                                    Active
                                  </SelectItem>
                                  <SelectItem value="archived">
                                    Archived
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription></FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Is Available */}
                        <FormField
                          control={form.control}
                          name="isAvailable"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Availability</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select availability" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="inStock">
                                    In Stock
                                  </SelectItem>
                                  <SelectItem value="outOfStock">
                                    Out of Stock
                                  </SelectItem>
                                  <SelectItem value="preOrder">
                                    Pre Order
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription></FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/*
                Single Product Image  */}
                <Card
                  className="overflow-hidden"
                  x-chunk="dashboard-07-chunk-4"
                >
                  <CardHeader>
                    <CardTitle>Single Product Image</CardTitle>
                    <CardDescription>
                      Single product image and information about the product.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="thumbnail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Top Image &nbsp;
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <ImageUpload
                                value={field.value || ""}
                                onChange={(imageUrl) =>
                                  field.onChange(imageUrl)
                                }
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
                    </div>
                  </CardContent>
                </Card>
                {/*
                Multiple Product Images
                */}
                <Card
                  className="overflow-hidden"
                  x-chunk="dashboard-07-chunk-4"
                >
                  <CardHeader>
                    <CardTitle>Multiple Product Images</CardTitle>
                    <CardDescription>
                      Multiple product images and information about the product.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <FormField
                        control={control}
                        name="images"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Product multiple images &nbsp;
                            </FormLabel>
                            <FormControl>
                              <ImagesUpload
                                // value={field.value ?? []}
                                value={(field.value ?? []).filter(
                                  (url): url is string => url !== undefined
                                )}
                                // onChange={(imageUrl: string[]) =>
                                //   field.onChange([
                                //     ...imageUrl,
                                //     ...(field.value ?? []),
                                //   ])
                                // }
                                onChange={(imageUrl: string | string[]) => {
                                  if (typeof imageUrl === "string") {
                                    field.onChange([
                                      imageUrl,
                                      ...(field.value ?? []),
                                    ]);
                                  } else {
                                    field.onChange([
                                      ...imageUrl,
                                      ...(field.value ?? []),
                                    ]);
                                  }
                                }}
                                onRemove={(imageUrlToRemove: string) => {
                                  if (Array.isArray(field.value)) {
                                    const updatedValue = field.value.filter(
                                      (url) => url !== imageUrlToRemove
                                    );
                                    field.onChange(updatedValue);
                                  }
                                }}
                              />
                            </FormControl>
                            <FormDescription>
                              This is the image associated with your product.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card x-chunk="dashboard-07-chunk-5">
                  <CardHeader>
                    <CardTitle>Archive Product</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div />
                    <Button size="sm" variant="secondary">
                      Archive Product
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button
                disabled={
                  isLoading || updateProductLoading || createProductLoading
                }
                className="w-full flex justify-center items-center"
                type="submit"
              >
                {productData ? (
                  <span>
                    {updateProductLoading && (
                      <IconLoader className="animate-spin" size={17} />
                    )}{" "}
                    Update Product
                  </span>
                ) : (
                  <span>
                    {" "}
                    {createProductLoading && (
                      <IconLoader className="animate-spin" size={17} />
                    )}
                    Publish Product
                  </span>
                )}
              </Button>
            </div>
          </div>
        </main>
      </form>
    </Form>
  );
}
