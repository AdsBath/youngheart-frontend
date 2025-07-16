"use client";

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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateCareerMutation,
  useUpdateCareerMutation,
} from "@/redux/api/careerApi";
import {
  onEditCareerClose,
  onNewCareerClose,
} from "@/redux/features/career/careerSlice";
import { ICareerFormProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader } from "@tabler/icons-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { z } from "zod";

const careerFormSchema = z.object({
  title: z.string().optional(),
  content: z.string({
    message: "Content is required!",
  }),
  isActive: z.boolean().default(true),
  applyUrl: z.string({
    message: "Apply Url is required!",
  }),
  shortDescription: z.string().optional(),
});

type CareerFormValues = z.infer<typeof careerFormSchema>;

export default function CareerForm({ careerData }: ICareerFormProps) {
  const [createCareer, { isLoading: createCareerLoading }] =
    useCreateCareerMutation();
  const [updateCareer, { isLoading: updateCareerLoading }] =
    useUpdateCareerMutation();

  const dispatch = useDispatch();

  const form = useForm<CareerFormValues>({
    resolver: zodResolver(careerFormSchema),
    defaultValues: {
      title: careerData?.title || "",
      content: careerData?.content || "",
      applyUrl: careerData?.applyUrl || "",
      isActive: careerData?.isActive || false,
      shortDescription: careerData?.shortDescription || "",
    },
  });

  useEffect(() => {
    form.reset(
      careerData || {
        title: "",
        content: "",
        isActive: false,
        applyUrl: "",
        shortDescription: "",
      }
    );
  }, [careerData, form]);

  async function onSubmit(data: Partial<CareerFormValues>) {
    if (careerData?.title) {
      const result = await updateCareer({
        id: careerData.id,
        body: data,
      });
      if (result?.data?.success) {
        toast.success(result?.data?.message);
        dispatch(onEditCareerClose());
      } else {
        toast.error(result?.error as string);
      }
    } else {
      const result = await createCareer(data);
      if (result?.data?.success) {
        toast.success(result?.data?.message);
        form.reset({
          title: "",
          content: "",
          isActive: false,
          applyUrl: "",
          shortDescription: "",
        });
        dispatch(onNewCareerClose());
      } else {
        toast.error(result?.error as string);
      }
    }
  }

  return (
    <Form {...form}>
      <ScrollArea className="h-[600px] w-full p-0 m-0">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Career Title <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="c.g page Link title" {...field} />
                </FormControl>
                <FormDescription>
                  This is the name of your Career. It can be changed at any
                  time.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="applyUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Apply Url <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="url" placeholder="c.g apply url" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="shortDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Career Description
                  <span className="text-zinc-500">(Optional)</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="c.g. page link description here ..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Content &nbsp;
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <ReactQuill
                    theme="snow" // or 'bubble'
                    value={field.value}
                    onChange={(content) => {
                      field.onChange(content);
                    }}
                    placeholder="e.g. content is here..."
                    className="custom-quill"
                  />
                </FormControl>
                <FormDescription>
                  A content of the career. This will appear on the career.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Career Status</FormLabel>
                  <FormDescription>
                    Career status will be visible to users on the frontend.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            disabled={createCareerLoading || updateCareerLoading}
            className="w-full flex justify-center items-center"
            type="submit"
          >
            {careerData ? (
              <div>
                <div className="w-full h-full flex justify-center items-center">
                  {updateCareerLoading && (
                    <IconLoader className="animate-spin" size={17} />
                  )}
                  <p>Update Career</p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                {createCareerLoading && (
                  <IconLoader className="animate-spin" size={17} />
                )}
                <p>Create Career</p>
              </div>
            )}
          </Button>
        </form>
      </ScrollArea>
    </Form>
  );
}
