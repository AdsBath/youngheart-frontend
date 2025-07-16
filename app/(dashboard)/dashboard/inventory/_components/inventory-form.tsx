"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/custom/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
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
import { cn } from "@/lib/utils";
import {
  useCreateInventoryNoteMutation,
  useUpdateInventoryNoteMutation,
} from "@/redux/api/inventoryApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader } from "@tabler/icons-react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  onEditInventoryClose,
  onNewInventoryClose,
} from "@/redux/features/inventory/inventorySlice";

const inventoryFormSchema = z.object({
  stockInQuantity: z.string().nullable().optional(),
  restockInQuantity: z.string().nullable().optional(),
  stockInDate: z.string().nullable().optional(),
  restockDate: z.string().nullable().optional(),
  expireDate: z.string().nullable().optional(),
  supplierName: z.string().nullable().optional(),
  warehouseLocation: z.string().nullable().optional(),
});
type InventoryFormValues = z.infer<typeof inventoryFormSchema>;

interface InventoryFormProps {
  inventoryData?: {
    id: string;
    restockDate: string;
    restockInQuantity: string;
    stockInDate: string;
    stockInQuantity: string;
    supplierName: string | null;
    warehouseLocation: string | null;
    updatedAt: string;
    createdAt: string;
    expireDate: string;
  };
  id?: string;
}

export default function InventoryForm({
  inventoryData,
  id,
}: InventoryFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [createInventoryNote] = useCreateInventoryNoteMutation();
  const [updateInventoryNote] = useUpdateInventoryNoteMutation();
  const dispatch = useDispatch();


  const form = useForm<InventoryFormValues>({
    resolver: zodResolver(inventoryFormSchema),
    defaultValues: inventoryData,
  });

  useEffect(() => {
    form.reset();
  }, [form]);

  async function onSubmit(data: Partial<InventoryFormValues>) {
    setIsLoading(true);

    try {
      if (inventoryData?.id) {
        const result = await updateInventoryNote({
          id: inventoryData.id,
          body: data,
        }).unwrap();
        if (result?.success) {
          setIsLoading(false);
          toast.success("Inventory note updated successfully.");
          dispatch(onEditInventoryClose());

        }
        // console.log("Inventory note updated successfully.", data);
        setIsLoading(false);
      } else {
        const result = await createInventoryNote({
          ...data,
          inventoryId: id,

        }).unwrap();
        if (result?.success) {
          toast.success("Inventory note created successfully.");
          form.reset({
            stockInQuantity: "",
            restockInQuantity: "",
            stockInDate: "",
            restockDate: "",
            expireDate: "",
          });
          setIsLoading(false);
          dispatch(onNewInventoryClose());

        }
        // console.log("Inventory note created successfully.", data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while submitting the form.");
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col gap-2 w-full">
          <div className="p-2 border shadow-md bg-slate-200 rounded-md">
            <h2 className="text-base font-semibold">
              Stock In inventory details
            </h2>
            <div className=" flex items-center gap-2 justify-between">
              <div className="mt-2">
                <FormField
                  control={form.control}
                  name="stockInDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>
                        Stock In Date &nbsp;
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              size={"lg"}
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal ",
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

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
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
                          className="flex-1"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-2">
                <FormField
                  control={form.control}
                  name="expireDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>
                        Expire Date &nbsp;
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              size={"lg"}
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

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div>
            <FormField
              control={form.control}
              name="supplierName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Supplier Name &nbsp;
                    <span className="text-muted-foreground">| (Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="e.g. John Doe"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* warehouseLocation */}
            <FormField
              control={form.control}
              name="warehouseLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Warehouse Location &nbsp;
                    <span className="text-muted-foreground">| (Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="e.g. New York"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="p-2 border shadow-md bg-slate-200 rounded-md w-full">
            <h2 className="text-base font-semibold">
              Restock inventory details
            </h2>
            <div className="flex items-center gap-2 justify-between w-full flex-1">
              <div className="mt-2 ">
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
                              size={"lg"}
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

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
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
                          className=" w-full"
                          type="text"
                          placeholder="e.g. 100 , 200 , 300 ect."
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        <Button
          disabled={isLoading}
          className="w-[200px] py-2 flex justify-center items-center"
          type="submit"
        >
          {isLoading && <IconLoader className="animate-spin" size={17} />}
          <p>{inventoryData ? "Update Inventory" : "Create Inventory"}</p>
        </Button>
      </form>
    </Form>
  );
}
