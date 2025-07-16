"use client";

import BlurImg from "@/components/custom/blur-img";
import { Button } from "@/components/custom/button";
import Loading from "@/components/loding";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
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
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { ICity, citys } from "@/data/citys";
import { districts } from "@/data/districts";
import { cn } from "@/lib/utils";
import { useCreateAbandonedCartMutation } from "@/redux/api/abandonedCartApi";
import { useCreateAddressMutation } from "@/redux/api/addressApi";
import { useCheckoutLoginMutation } from "@/redux/api/authApi";
import { useCartQuery } from "@/redux/api/cartApi";
import { useApplyCouponMutation } from "@/redux/api/couponApi";
import { useCreateOrderMutation } from "@/redux/api/orderApi";
import { useProductsQuery } from "@/redux/api/productApi";
import { useUpdateUserMutation } from "@/redux/api/userApi";
import { Role, UserDataBody } from "@/types";
import { calculateDiscount } from "@/utils/calculateDiscount";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconCash, IconLoader } from "@tabler/icons-react";
import { format } from "date-fns";
import { Check, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const checkoutFormSchema = z.object({
    firstName: z.string().min(2, {
        message: "First Name is Required!",
    }),
    lastName: z.string().min(2, {
        message: "Last Name is Required!",
    }),
    address: z.string({
        message: "Address is Required!",
    }),
    city: z.string({
        message: "City / Town is Required!",
    }),
    district: z.string({
        message: "District is Required!",
    }),
    phone: z.string().min(10, {
        message: "Phone number is Required!",
    }),
    email: z.string().optional(),
    isUser: z.boolean().default(false).optional(),
    shipToDifferentAddress: z.boolean().default(false).optional(),
    paymentMethod: z.string({
        message: "payment method is required!",
    }),
    isAgree: z.boolean({
        message: "Please agree with terms & conditions",
    }),
    dFirstName: z.string().optional(),
    dLastName: z.string().optional(),
    dAddress: z.string().optional(),
    dCity: z.string().optional(),
    dDistrict: z.string().optional(),
    notes: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

export default function CheckoutForm({
    sessionData,
    addressData,
    shippingRulesData,
}: {
    sessionData: any;
    addressData: any;
    shippingRulesData: any;
}) {
    const [districtPopOpen, setDistrictPopOpen] = useState(false);
    const [ddistrictPopOpen, setdDistrictPopOpen] = useState(false);
    const [cityPopOpen, setCityPopOpen] = useState(false);
    const [dcityPopOpen, setdCityPopOpen] = useState(false);
    const shippingRuleData = shippingRulesData?.find(
        (item: any) => item?.name === "In-side Dhaka"
    );

    const [shippingCost, setShippingCost] = useState(
        shippingRuleData?.shippingCost
    );
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [couponCode, setCouponCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [couponId, setCouponId] = useState("");
    const userId = sessionData?.data?.id;
    const [createAbandonedCart] = useCreateAbandonedCartMutation();
    const [checkoutLogin] = useCheckoutLoginMutation();
    const [createAddress] = useCreateAddressMutation();
    const [updateUser] = useUpdateUserMutation();
    const [createOrder, { isLoading }] = useCreateOrderMutation();
    const { data: cartData, isLoading: isLoadingCart } = useCartQuery(userId);
    const { data: productsData, isLoading: isLoadingProducts } =
        useProductsQuery({});

    const [applyCoupon, { isLoading: applyCouponApply }] =
        useApplyCouponMutation();
    const router = useRouter();
    const cart = cartData?.data;

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            firstName: sessionData?.data?.firstName,
            lastName: sessionData?.data?.lastName,
            isUser: sessionData?.data?.isUser,
            address: addressData?.data?.address,
            city: addressData?.data?.city,
            district: addressData?.data?.district,
            phone: sessionData?.data?.phone,
            email: sessionData?.data?.email,
            shipToDifferentAddress: false,
            paymentMethod: "cod",
            isAgree: true,
            dFirstName: "",
            dLastName: "",
            dAddress: "",
            dCity: "",
            dDistrict: "",
            notes: "",
        },
    });

    const { watch } = form;
    const watchValues = watch();

    const district = watchValues.district;
    const dDistrict = watchValues.dDistrict;

    const hasFreeShipping = cart?.cartItems.some((item: any) => {
        return item.product?.shippingRules?.shippingCost === 0;
    });

    useEffect(() => {
        if (hasFreeShipping) {
            setShippingCost(0);
            return;
        }

        if (district) {
            if (district === "Dhaka") {
                const getShippingData = shippingRulesData.find(
                    (item: any) => item.name === "In-side Dhaka"
                );
                setShippingCost(getShippingData?.shippingCost);
            } else {
                const getShippingData = shippingRulesData.find(
                    (item: any) => item.name === "Out-side Dhaka"
                );
                setShippingCost(getShippingData?.shippingCost);
            }
        }
    }, [district, shippingRulesData, hasFreeShipping]);

    const districtData = districts.find(
        (districtItem: any) => districtItem.name === district
    );
    const dDistrictData = districts.find(
        (districtItem: any) => districtItem.name === dDistrict
    );

    let upazilaData: ICity[] = [];
    let dUpazilaData: ICity[] = [];
    if (citys) {
        upazilaData = citys.filter(
            (upazilaItem: ICity) => upazilaItem.district_id === districtData?.id
        );
    }

    if (citys) {
        dUpazilaData = citys.filter(
            (upazilaItem: ICity) =>
                upazilaItem.district_id === dDistrictData?.id
        );
    }
    const cartItems = cart?.cartItems?.map((cartItem: any) => {
        const product = productsData?.data?.data?.find(
            (product: any) => product.id === cartItem.productId
        );
        return { ...cartItem, product };
    });

    const discountPrice =
        useMemo(() => {
            const discountPrice = cartItems?.reduce(
                (acc: any, item: any) =>
                    acc + item.discountAmmount * item.quantity,
                0
            );
            return discountPrice;
        }, [cartItems]) || 0;

    async function onSubmit(data: Partial<CheckoutFormValues>) {
        try {
            setLoading(true);
            const userData = {
                id: userId,
                body: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    phone: data.phone,
                    email: data.email,
                    isUser: data.isUser,
                } as UserDataBody,
            };

            if (data.isUser) {
                userData.body.role = Role.USER;
            }

            const resUser = await updateUser(userData);

            const addressData = {
                userId: userId,
                address: data.address,
                city: data.city,
                district: data.district,
            };

            const resAddress = await createAddress(addressData);

            const orderData: any = {
                totalAmount: parseFloat(
                    (total + delivery - Math.ceil(discountPrice)).toFixed(2)
                ),
                discountAmmount: discountPrice ? discountPrice : 0,
                billingAddress:
                    data.address + ", " + data.city + ", " + data.district,
                paymentMethod: data.paymentMethod,
                shippingCharge: delivery,
                userId,
                email: data.email,
                products: cart?.cartItems,
                isAgree: data.isAgree,
                firstName: data.firstName,
                lastName: data.lastName,
            };

            if (data.notes && data.notes.trim()?.length > 0) {
                orderData.notes = data.notes.trim();
            }

            if (data.shipToDifferentAddress) {
                orderData.shipToDifferentAddress =
                    "firstName: " +
                    data.dFirstName +
                    ", lastName: " +
                    data.dLastName +
                    ", address: " +
                    data.dAddress +
                    ", city: " +
                    data.dCity +
                    ", district: " +
                    data.dDistrict;
            }
            if (couponId) {
                orderData.couponId = couponId;
            }

            const res: any = await createOrder(orderData);

            if (res?.data?.success) {
                toast({
                    title: res.data.message ?? "Order Successfully!",
                });
                await checkoutLogin({
                    email: data?.email,
                    sessionId: sessionData?.data?.sessionId,
                });
                setLoading(false);
                if (res?.data?.data?.gatewayPageURL) {
                    // router.push(res?.data?.data?.gatewayPageURL);
                    window.location.replace(res?.data?.data?.gatewayPageURL);
                    setLoading(false);
                } else {
                    // console.log(res?.data?.data?.orderId)
                    // router.push(`/checkout/order-receive/${res?.data?.data?.orderId}`);
                    router.push(`/thank-you`);
                    localStorage.setItem(
                        "orderId",
                        JSON.stringify(res?.data?.data?.orderId)
                    );
                    setLoading(false);
                }
            }
        } catch (error) {
            console.error(error, "order error");
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    const sortedCartItems: any[] = cartItems?.sort((a: any, b: any) => {
        const dateA = a.createdAt ? new Date(a.createdAt) : null;
        const dateB = b.createdAt ? new Date(b.createdAt) : null;

        if (dateA && dateB) {
            return dateB.getTime() - dateA.getTime();
        }
        return 0;
    });

    const subtotal =
        cartItems?.reduce(
            (acc: any, item: any) => acc + item.price * item.quantity,
            0
        ) || 0;

    const total = subtotal - discount;

    const delivery =
        sortedCartItems?.length === 0
            ? 0
            : shippingCost
            ? Number(shippingCost)
            : 0;

    // Handle change event for any field
    const handleChange = async (property: any, value: any) => {
        const data = {
            userId,
            firstName: watchValues.firstName,
            lastName: watchValues.lastName,
            email: watchValues.email,
            phone: watchValues.phone,
            district: watchValues.district,
            address: watchValues.address,
            products: cart?.cartItems,
        };
        const res = await createAbandonedCart(data);
    };

    const handleApply = async () => {
        const couponData = {
            couponCode: code,
            totalPrice: subtotal,
            userId,
        };
        const res = await applyCoupon(couponData);
        // console.log(res);
        if (res?.data?.statusCode === 200) {
            setDiscount(res?.data?.data?.discount);
            setCouponId(res?.data?.data?.coupon?.id);
            setCouponCode(res?.data?.data?.coupon?.code);
            setCode("");
        } else {
            toast({
                title:
                    res?.error && typeof res?.error === "string"
                        ? res.error
                        : "fail coupon apply",
                description: format(
                    new Date(),
                    "EEEE, MMMM dd, yyyy 'at' hh:mm a"
                ),
            });
        }
        // console.log(res);
        // console.log(couponData);
    };

    const handleClearCoupon = () => {
        setDiscount(0);
        setCode("");
        setCouponCode("");
    };

    return (
        <>
            {isLoadingCart || isLoadingProducts ? (
                <div className="h-screen">
                    <Loading />
                </div>
            ) : (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 pb-10"
                    >
                        <div className="w-full flex flex-col sm:flex-row items-start gap-10 pb-7">
                            {/* shipping details */}
                            <div className="flex flex-col gap-4 w-full sm:w-7/12 flex-1 px-2 sm:px-4">
                                <h2 className="text-xl font-semibold pb-2 sm:pb-6">
                                    Shipping details
                                </h2>

                                <div className="flex flex-col gap-2">
                                    <div className="flex gap-3">
                                        <div className="w-full">
                                            <FormField
                                                control={form.control}
                                                name="firstName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            First name{" "}
                                                            <span className="text-red-500">
                                                                *
                                                            </span>
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="First name"
                                                                {...field}
                                                                onBlur={(e) =>
                                                                    handleChange(
                                                                        "firstName",
                                                                        field.value
                                                                    )
                                                                }
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
                                                name="lastName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Last name{" "}
                                                            <span className="text-red-500">
                                                                *
                                                            </span>
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Last name"
                                                                {...field}
                                                                onBlur={(e) =>
                                                                    handleChange(
                                                                        "lastName",
                                                                        field.value
                                                                    )
                                                                }
                                                            />
                                                        </FormControl>
                                                        <FormDescription></FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>

                                    <div className="w-full">
                                        <FormField
                                            control={form.control}
                                            name="address"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Address
                                                        <span className="text-red-500">
                                                            *
                                                        </span>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="write your address here"
                                                            {...field}
                                                            onBlur={(e) =>
                                                                handleChange(
                                                                    "address",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
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
                                            name="district"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem className="flex flex-col">
                                                        <FormLabel>
                                                            District
                                                        </FormLabel>
                                                        <Popover
                                                            open={
                                                                districtPopOpen
                                                            }
                                                        >
                                                            <PopoverTrigger
                                                                asChild
                                                            >
                                                                <FormControl>
                                                                    <Button
                                                                        variant="outline"
                                                                        role="combobox"
                                                                        className={cn(
                                                                            "w-full justify-between",
                                                                            !field.value &&
                                                                                "text-muted-foreground"
                                                                        )}
                                                                        onClick={() =>
                                                                            setDistrictPopOpen(
                                                                                !districtPopOpen
                                                                            )
                                                                        } // Toggle popover on button click
                                                                    >
                                                                        {field.value
                                                                            ? districts.find(
                                                                                  (
                                                                                      district
                                                                                  ) =>
                                                                                      district.name ===
                                                                                      field.value
                                                                              )
                                                                                  ?.name
                                                                            : "Select district"}
                                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                    </Button>
                                                                </FormControl>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-full p-0">
                                                                <Command>
                                                                    <CommandInput placeholder="Search distric..." />
                                                                    <CommandList>
                                                                        <CommandEmpty>
                                                                            No
                                                                            distric
                                                                            found.
                                                                        </CommandEmpty>
                                                                        <CommandGroup>
                                                                            {districts?.map(
                                                                                (
                                                                                    district
                                                                                ) => (
                                                                                    <CommandItem
                                                                                        value={
                                                                                            district.name
                                                                                        }
                                                                                        key={
                                                                                            district.id
                                                                                        }
                                                                                        onSelect={() => {
                                                                                            form.setValue(
                                                                                                "district",
                                                                                                district.name
                                                                                            );
                                                                                            setDistrictPopOpen(
                                                                                                false
                                                                                            ); // Close the popover after selection
                                                                                        }}
                                                                                    >
                                                                                        <Check
                                                                                            className={cn(
                                                                                                "mr-2 h-4 w-4",
                                                                                                district.name ===
                                                                                                    field.value
                                                                                                    ? "opacity-100"
                                                                                                    : "opacity-0"
                                                                                            )}
                                                                                        />
                                                                                        {
                                                                                            district.name
                                                                                        }
                                                                                    </CommandItem>
                                                                                )
                                                                            )}
                                                                        </CommandGroup>
                                                                    </CommandList>
                                                                </Command>
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormDescription></FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                );
                                            }}
                                        />
                                    </div>

                                    <div className="w-full">
                                        <FormField
                                            control={form.control}
                                            name="city"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>City</FormLabel>
                                                    <Popover open={cityPopOpen}>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant="outline"
                                                                    role="combobox"
                                                                    className={cn(
                                                                        "w-full justify-between",
                                                                        !field.value &&
                                                                            "text-muted-foreground"
                                                                    )}
                                                                    onClick={() =>
                                                                        setCityPopOpen(
                                                                            !cityPopOpen
                                                                        )
                                                                    }
                                                                >
                                                                    {field.value
                                                                        ? upazilaData.find(
                                                                              (
                                                                                  upazila
                                                                              ) =>
                                                                                  upazila.name ===
                                                                                  field.value
                                                                          )
                                                                              ?.name
                                                                        : "Select city"}
                                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-full p-0">
                                                            <Command>
                                                                <CommandInput placeholder="Search city..." />
                                                                <CommandList>
                                                                    <CommandEmpty>
                                                                        No city
                                                                        found.
                                                                    </CommandEmpty>
                                                                    <CommandGroup>
                                                                        {upazilaData?.map(
                                                                            (
                                                                                upazila
                                                                            ) => (
                                                                                <CommandItem
                                                                                    value={
                                                                                        upazila.name
                                                                                    }
                                                                                    key={
                                                                                        upazila.id
                                                                                    }
                                                                                    onSelect={() => {
                                                                                        form.setValue(
                                                                                            "city",
                                                                                            upazila.name
                                                                                        );
                                                                                        setCityPopOpen(
                                                                                            false
                                                                                        ); // Close the popover after selection
                                                                                    }}
                                                                                >
                                                                                    <Check
                                                                                        className={cn(
                                                                                            "mr-2 h-4 w-4",
                                                                                            upazila.name ===
                                                                                                field.value
                                                                                                ? "opacity-100"
                                                                                                : "opacity-0"
                                                                                        )}
                                                                                    />
                                                                                    {
                                                                                        upazila.name
                                                                                    }
                                                                                </CommandItem>
                                                                            )
                                                                        )}
                                                                    </CommandGroup>
                                                                </CommandList>
                                                            </Command>
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormDescription></FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="w-full">
                                        <FormField
                                            control={form.control}
                                            name="phone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Phone{" "}
                                                        <span className="text-red-500">
                                                            *
                                                        </span>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Phone"
                                                            {...field}
                                                            onBlur={(e) =>
                                                                handleChange(
                                                                    "phone",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormDescription></FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div>
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Email address{" "}
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="email"
                                                            placeholder="Email address"
                                                            {...field}
                                                            onBlur={(e) =>
                                                                handleChange(
                                                                    "email",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormDescription></FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    {!sessionData?.data?.isUser && (
                                        <div className="flex items-center gap-2">
                                            <FormField
                                                control={form.control}
                                                name="isUser"
                                                render={({ field }) => (
                                                    <FormItem className="flex items-center justify-start">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={
                                                                    field.value
                                                                }
                                                                onCheckedChange={
                                                                    field.onChange
                                                                }
                                                            />
                                                        </FormControl>
                                                        <FormDescription></FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <p className="text-sm">
                                                Create an account?
                                            </p>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-2">
                                        <FormField
                                            control={form.control}
                                            name="shipToDifferentAddress"
                                            render={({ field }) => (
                                                <FormItem className="flex items-center justify-start">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={
                                                                field.value
                                                            }
                                                            onCheckedChange={
                                                                field.onChange
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormDescription></FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <p className="text-sm">
                                            Ship to a different address?
                                        </p>
                                    </div>
                                </div>

                                {/* ship to different address */}
                                {watchValues.shipToDifferentAddress && (
                                    <div className="flex flex-col gap-2">
                                        <div className="flex gap-3">
                                            <div className="w-full">
                                                <FormField
                                                    control={form.control}
                                                    name="dFirstName"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>
                                                                First name{" "}
                                                                <span className="text-red-500">
                                                                    *
                                                                </span>
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="First name"
                                                                    {...field}
                                                                    onBlur={(
                                                                        e
                                                                    ) =>
                                                                        handleChange(
                                                                            "firstName",
                                                                            field.value
                                                                        )
                                                                    }
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
                                                    name="dLastName"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>
                                                                Last name{" "}
                                                                <span className="text-red-500">
                                                                    *
                                                                </span>
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Last name"
                                                                    {...field}
                                                                    onBlur={(
                                                                        e
                                                                    ) =>
                                                                        handleChange(
                                                                            "lastName",
                                                                            field.value
                                                                        )
                                                                    }
                                                                />
                                                            </FormControl>
                                                            <FormDescription></FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <FormField
                                                control={form.control}
                                                name="dAddress"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Address
                                                            <span className="text-red-500">
                                                                *
                                                            </span>
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="write your address here"
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
                                                name="dDistrict"
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem className="flex flex-col">
                                                            <FormLabel>
                                                                District{" "}
                                                                <span className="text-red-500">
                                                                    *
                                                                </span>
                                                            </FormLabel>
                                                            <Popover
                                                                open={
                                                                    ddistrictPopOpen
                                                                }
                                                            >
                                                                <PopoverTrigger
                                                                    asChild
                                                                >
                                                                    <FormControl>
                                                                        <Button
                                                                            variant="outline"
                                                                            role="combobox"
                                                                            className={cn(
                                                                                "w-full justify-between",
                                                                                !field.value &&
                                                                                    "text-muted-foreground"
                                                                            )}
                                                                            onClick={() =>
                                                                                setdDistrictPopOpen(
                                                                                    !districtPopOpen
                                                                                )
                                                                            } // Toggle popover on button click
                                                                        >
                                                                            {field.value
                                                                                ? districts.find(
                                                                                      (
                                                                                          district
                                                                                      ) =>
                                                                                          district.name ===
                                                                                          field.value
                                                                                  )
                                                                                      ?.name
                                                                                : "Select district"}
                                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                        </Button>
                                                                    </FormControl>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-full p-0">
                                                                    <Command>
                                                                        <CommandInput placeholder="Search distric..." />
                                                                        <CommandList>
                                                                            <CommandEmpty>
                                                                                No
                                                                                distric
                                                                                found.
                                                                            </CommandEmpty>
                                                                            <CommandGroup>
                                                                                {districts?.map(
                                                                                    (
                                                                                        district
                                                                                    ) => (
                                                                                        <CommandItem
                                                                                            value={
                                                                                                district.name
                                                                                            }
                                                                                            key={
                                                                                                district.id
                                                                                            }
                                                                                            onSelect={() => {
                                                                                                form.setValue(
                                                                                                    "dDistrict",
                                                                                                    district.name
                                                                                                );
                                                                                                setdDistrictPopOpen(
                                                                                                    false
                                                                                                ); // Close the popover after selection
                                                                                            }}
                                                                                        >
                                                                                            <Check
                                                                                                className={cn(
                                                                                                    "mr-2 h-4 w-4",
                                                                                                    district.name ===
                                                                                                        field.value
                                                                                                        ? "opacity-100"
                                                                                                        : "opacity-0"
                                                                                                )}
                                                                                            />
                                                                                            {
                                                                                                district.name
                                                                                            }
                                                                                        </CommandItem>
                                                                                    )
                                                                                )}
                                                                            </CommandGroup>
                                                                        </CommandList>
                                                                    </Command>
                                                                </PopoverContent>
                                                            </Popover>
                                                            <FormDescription></FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    );
                                                }}
                                            />
                                        </div>

                                        <div className="w-full">
                                            <FormField
                                                control={form.control}
                                                name="dCity"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-col">
                                                        <FormLabel>
                                                            City{" "}
                                                            <span className="text-red-500">
                                                                *
                                                            </span>
                                                        </FormLabel>
                                                        <Popover
                                                            open={dcityPopOpen}
                                                        >
                                                            <PopoverTrigger
                                                                asChild
                                                            >
                                                                <FormControl>
                                                                    <Button
                                                                        variant="outline"
                                                                        role="combobox"
                                                                        className={cn(
                                                                            "w-full justify-between",
                                                                            !field.value &&
                                                                                "text-muted-foreground"
                                                                        )}
                                                                        onClick={() =>
                                                                            setdCityPopOpen(
                                                                                !cityPopOpen
                                                                            )
                                                                        }
                                                                    >
                                                                        {field.value
                                                                            ? dUpazilaData.find(
                                                                                  (
                                                                                      upazila
                                                                                  ) =>
                                                                                      upazila.name ===
                                                                                      field.value
                                                                              )
                                                                                  ?.name
                                                                            : "Select city"}
                                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                    </Button>
                                                                </FormControl>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-full p-0">
                                                                <Command>
                                                                    <CommandInput placeholder="Search city..." />
                                                                    <CommandList>
                                                                        <CommandEmpty>
                                                                            No
                                                                            city
                                                                            found.
                                                                        </CommandEmpty>
                                                                        <CommandGroup>
                                                                            {dUpazilaData?.map(
                                                                                (
                                                                                    upazila
                                                                                ) => (
                                                                                    <CommandItem
                                                                                        value={
                                                                                            upazila.name
                                                                                        }
                                                                                        key={
                                                                                            upazila.id
                                                                                        }
                                                                                        onSelect={() => {
                                                                                            form.setValue(
                                                                                                "dCity",
                                                                                                upazila.name
                                                                                            );
                                                                                            setdCityPopOpen(
                                                                                                false
                                                                                            ); // Close the popover after selection
                                                                                        }}
                                                                                    >
                                                                                        <Check
                                                                                            className={cn(
                                                                                                "mr-2 h-4 w-4",
                                                                                                upazila.name ===
                                                                                                    field.value
                                                                                                    ? "opacity-100"
                                                                                                    : "opacity-0"
                                                                                            )}
                                                                                        />
                                                                                        {
                                                                                            upazila.name
                                                                                        }
                                                                                    </CommandItem>
                                                                                )
                                                                            )}
                                                                        </CommandGroup>
                                                                    </CommandList>
                                                                </Command>
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormDescription></FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <FormField
                                        control={form.control}
                                        name="notes"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="notes">
                                                    Order notes{" "}
                                                    <span>(optional)</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        id="notes"
                                                        rows={5}
                                                        placeholder="Notes about yours order, e.g special notes for delivery"
                                                        {...field}
                                                        onBlur={(e) =>
                                                            handleChange(
                                                                "email",
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </FormControl>
                                                <FormDescription></FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Your order */}
                            <div className="w-full sm:w-5/12 px-2 sm:px-4">
                                <h2 className="text-xl font-semibold pb-6">
                                    Your Order
                                </h2>

                                {cartItems?.map((item: any) => (
                                    <div
                                        key={item.id}
                                        className="flex flex-col md:flex-row gap-2 w-full py-1 md:items-center flex-1 justify-between"
                                    >
                                        <div className="flex gap-4 items-center">
                                            <div>
                                                <BlurImg
                                                    src={item?.image}
                                                    alt={
                                                        item?.product?.name ||
                                                        "img"
                                                    }
                                                    className="w-16 h-16 rounded"
                                                />
                                            </div>
                                            <div className="flex flex-col flex-1 gap-1">
                                                <span className="text-sm  text-wrap">
                                                    {item.product?.name}
                                                </span>
                                                <span className="text-[11px]">
                                                    ৳{item.price}x{" "}
                                                    {item.quantity}
                                                </span>
                                                <span>
                                                    {item.discount ? (
                                                        <span className="text-[11px]">
                                                            ৳ {item.discount}%
                                                            OFF
                                                        </span>
                                                    ) : null}
                                                </span>
                                                <div className="flex gap-1">
                                                    <Badge variant="outline">
                                                        <span>
                                                            {item?.color}
                                                        </span>
                                                    </Badge>
                                                    <Badge variant="outline">
                                                        <span>
                                                            {item?.size}
                                                        </span>
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-xs pl-20 sm:pl-0">
                                            ৳{" "}
                                            {item.discount
                                                ? calculateDiscount(
                                                      item.price,
                                                      item.discount
                                                  ) * item.quantity
                                                : parseFloat(item.price) *
                                                  item.quantity}
                                        </p>
                                    </div>
                                ))}

                                <div className="w-full border mt-3 rounded">
                                    <div className="border-b">
                                        <div className="flex justify-between p-3">
                                            <span className="text-sm">
                                                Subtotal:
                                            </span>
                                            <span className="text-sm">
                                                ৳ {total.toFixed(2)}
                                            </span>
                                        </div>

                                        <div className="flex justify-between p-3">
                                            <div className="text-sm">
                                                <span>Discount Ammount: </span>
                                                {couponCode && (
                                                    <>
                                                        <Badge>
                                                            {couponCode}
                                                        </Badge>
                                                        <button
                                                            className="bg-gray-700 rounded text-white px-1 ml-1"
                                                            type="button"
                                                            onClick={
                                                                handleClearCoupon
                                                            }
                                                        >
                                                            X
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                            <span className="text-sm">
                                                {discount > 0 && "-"}৳{" "}
                                                {discountPrice.toFixed(2)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between p-3">
                                            <span className="text-sm">
                                                Shipping: (chargeable)
                                            </span>
                                            <span className="text-sm">
                                                ৳ {shippingCost?.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-3">
                                        <div className="border w-full rounded flex flex-col gap-2 p-3">
                                            {shippingRulesData?.map(
                                                (
                                                    shippingRulesItem: any,
                                                    index: number
                                                ) => (
                                                    <div
                                                        key={index}
                                                        className="p-2 flex items-center justify-between"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <Label className="text-sm font-semibold">
                                                                {
                                                                    shippingRulesItem?.name
                                                                }
                                                            </Label>
                                                            <IconCash
                                                                size={18}
                                                            />
                                                        </div>
                                                        <span className="text-xs">
                                                            ৳{" "}
                                                            {shippingRulesItem?.shippingCost.toFixed(
                                                                2
                                                            )}
                                                        </span>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 mt-2">
                                            <Input
                                                onChange={(e) =>
                                                    setCode(e.target.value)
                                                }
                                                type="text"
                                                placeholder="Coupon code"
                                                value={code}
                                                readOnly={
                                                    discount ? true : false
                                                }
                                            />
                                            <Button
                                                disabled={
                                                    discount ? true : false
                                                }
                                                type="button"
                                                onClick={handleApply}
                                                className="px-5 py-1"
                                                variant={"default"}
                                            >
                                                {applyCouponApply && (
                                                    <IconLoader
                                                        className="animate-spin"
                                                        size={17}
                                                    />
                                                )}
                                                Apply
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="border-t">
                                        <div className="flex justify-between p-3 text-base">
                                            <span className="font-semibold">
                                                Total:
                                            </span>
                                            <span className="font-semibold">
                                                ৳{" "}
                                                {(
                                                    total +
                                                    delivery -
                                                    discountPrice
                                                ).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <Controller
                                    control={form.control}
                                    name="paymentMethod"
                                    render={({ field }) => (
                                        <RadioGroup
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <div className="mt-3 border w-full rounded flex flex-col gap-2 p-3">
                                                <div className="p-2">
                                                    <div className="flex items-center gap-2">
                                                        <RadioGroupItem
                                                            value="cod"
                                                            id="cod"
                                                        />
                                                        <Label
                                                            htmlFor="cod"
                                                            className="text-sm font-semibold"
                                                        >
                                                            Cash on delivery
                                                        </Label>
                                                        <IconCash size={18} />
                                                    </div>
                                                    <span className="text-xs">
                                                        Pay with cash upon
                                                        delivery.
                                                    </span>
                                                </div>
                                                <div className="p-2">
                                                    <div className="flex items-center gap-2">
                                                        <RadioGroupItem
                                                            value="online"
                                                            id="sslcommerz"
                                                        />
                                                        <Label
                                                            htmlFor="sslcommerz"
                                                            className="text-sm font-semibold"
                                                        >
                                                            Bank Transfer
                                                        </Label>
                                                        <Image
                                                            width={120}
                                                            height={24}
                                                            src="/sslcommerza.png"
                                                            alt="bank"
                                                            className="h-6"
                                                        />
                                                    </div>
                                                    <span className="text-xs text-wrap">
                                                        Pay bank transfer via
                                                        SSLCOMMERZ. Pay Online
                                                        (Credit/Debit
                                                        Card/MobileBanking/NetBanking/bKash)
                                                    </span>
                                                </div>
                                            </div>
                                        </RadioGroup>
                                    )}
                                />

                                <div className="flex flex-col py-3 gap-2">
                                    <p className="text-xs">
                                        Your personal data will be used to
                                        process your order, support your
                                        experience throughout this website, and
                                        for other purposes described in our{" "}
                                        <span className="underline text-red-500">
                                            privacy policy.
                                        </span>
                                    </p>
                                    <p className="text-xs">
                                        <span className="font-bold">
                                            Delivery Time:
                                        </span>{" "}
                                        Inside Dhaka - 5 days & Outside Dhaka -
                                        10 days.
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <FormField
                                            control={form.control}
                                            name="isAgree"
                                            render={({ field }) => (
                                                <FormItem className="flex items-center justify-start">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={
                                                                field.value
                                                            }
                                                            onCheckedChange={
                                                                field.onChange
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormDescription></FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <span className="text-xs">
                                            I have read and agree to the website{" "}
                                            <span className="underline text-red-500">
                                                terms and conditions, return and
                                                refund policy
                                            </span>{" "}
                                            &{" "}
                                            <span className="underline text-red-500">
                                                privacy policy *
                                            </span>
                                        </span>
                                    </div>
                                </div>
                                {cart?.cartItems?.length > 0 ? (
                                    <Button
                                        className="w-full mt-3"
                                        size={"lg"}
                                        variant={"destructive"}
                                        disabled={isLoading || loading}
                                    >
                                        {(isLoading || loading) && (
                                            <IconLoader
                                                className="animate-spin"
                                                size={17}
                                            />
                                        )}
                                        <span className="px-2">
                                            Place Order
                                        </span>
                                    </Button>
                                ) : (
                                    <Button
                                        className="w-full mt-3"
                                        size="lg"
                                        variant="destructive"
                                    >
                                        <Link href="/">Shopping</Link>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </form>
                </Form>
            )}
        </>
    );
}
