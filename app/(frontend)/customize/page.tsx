import React from "react";
import Image from "next/image";
import { CustomDesignForm } from "./_component/customize-design-form";
import CustomBanner from "./_component/customize-banner-image";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  ShieldCheck,
  Truck,
  Sparkles,
  HelpCircle,
  Star,
} from "lucide-react";

const Customize = () => {
  return (
    <div className="bg-background">
      {/* Full-bleed hero with overlay copy */}
      <section className="relative">
        <CustomBanner />
        <div className="absolute inset-0 bg-black/40" />
      </section>

      <div className="container mx-auto px-4 ">
        <div className="relative z-10 py-4 sm:py-8  max-w-4xl text-black">
          <Badge className="mb-3 w-fit" variant="secondary">
            Customize Your Dream Leather
          </Badge>
          <h1 className="text-2xl sm:text-4xl font-bold leading-tight">
            Your style, your rules custom leather made easy
          </h1>
          <p className="mt-3 text-sm sm:text-base text-black/90">
            আপনার ধারণা আমাদের সাথে ভাগ করুন, আমরা ডিজাইন থেকে ডেলিভারি পর্যন্ত পুরো প্রক্রিয়ায় আপনার পাশে থাকব।
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <span className="inline-flex items-center gap-2 rounded-full bg-black/10 px-3 py-1 backdrop-blur">
              <ShieldCheck className="h-4 w-4" /> Genuine Leather
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-black/10 px-3 py-1 backdrop-blur">
              <Truck className="h-4 w-4" /> Fast Delivery
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-black/10 px-3 py-1 backdrop-blur">
              <Sparkles className="h-4 w-4" /> Premium Finish
            </span>
          </div>
        </div>
      </div>

      {/* Main split layout */}
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Content tabs (Inspiration/Process/FAQ) */}
          <div className="lg:col-span-7 order-2 lg:order-1 space-y-8">
            <Tabs defaultValue="inspiration" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="inspiration">Inspiration</TabsTrigger>
                <TabsTrigger value="process">Process</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>

              <TabsContent value="inspiration" className="mt-0">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Popular Custom Combinations</CardTitle>
                    <CardDescription>
                      কালার, স্টিচিং ও পার্সোনালাইজেশন থেকে আইডিয়া নিন।
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <Carousel className="w-full">
                        <CarouselContent>
                          {["/custom-leather-bag.png", "/box-image.png", "/free.png"].map(
                            (src) => (
                              <CarouselItem key={src} className="md:basis-1/2 lg:basis-1/3">
                                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md border bg-muted">
                                  <Image src={src} alt="Inspiration" fill className="object-contain" />
                                </div>
                              </CarouselItem>
                            )
                          )}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                      </Carousel>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="process" className="mt-0">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>How we work</CardTitle>
                    <CardDescription>ধাপে ধাপে সম্পূর্ণ প্রক্রিয়া</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-4">
                      {[{
                        title: "ব্রিফ ও কনসালটেশন",
                        desc: "ফর্মের তথ্য দেখে আমাদের টিম আপনাকে গাইড করবে",
                      },
                      { title: "স্যাম্পল/মকআপ", desc: "প্রিভিউ/স্যাম্পল কনফার্মেশন" },
                      { title: "প্রোডাকশন", desc: "কারিগরদের মাধ্যমে নিখুঁতভাবে তৈরি" },
                      { title: "কোয়ালিটি চেক ও ডেলিভারি", desc: "শিপিংয়ের আগে কিউসি" },].map((s, i) => (
                        <li key={s.title} className="flex items-start gap-3">
                          <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                            {i + 1}
                          </span>
                          <div>
                            <p className="font-medium">{s.title}</p>
                            <p className="text-sm text-muted-foreground">{s.desc}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="faq" className="mt-0">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>FAQs</CardTitle>
                    <CardDescription>সচরাচর জিজ্ঞাসা</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="q1">
                        <AccordionTrigger>সময় কত লাগবে?</AccordionTrigger>
                        <AccordionContent>সাধারণত ৭-১৪ দিন।</AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="q2">
                        <AccordionTrigger>রিটার্ন পলিসি?</AccordionTrigger>
                        <AccordionContent>পার্সোনালাইজড প্রোডাক্টে সাধারণত রিটার্ন নেই।</AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="q3">
                        <AccordionTrigger>কোন লেদার ব্যবহার হয়?</AccordionTrigger>
                        <AccordionContent>জেনুইন ও সিলেক্টেড গ্রেড।</AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Trust strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: ShieldCheck, text: "Quality Guarantee" },
                { icon: Truck, text: "Nationwide Delivery" },
                { icon: Star, text: "Thousands of Happy Customers" },
                { icon: HelpCircle, text: "24/7 Support" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 rounded-md border bg-card px-3 py-2 text-sm">
                  <Icon className="h-4 w-4 text-primary" /> {text}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Sticky form card */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Form</CardTitle>
                <CardDescription>
                  আপনার প্রয়োজন অনুযায়ী তথ্য পূরণ করুন। আমরা যোগাযোগ করব।
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <CustomDesignForm />
              </CardContent>
              <CardFooter className="justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" /> সুরক্ষিত তথ্য
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4" /> ৭-১৪ দিন ডেলিভারি
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="  bg-red-100">
        <div className="container mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">Ready to talk?</h3>
            <p className="text-sm text-muted-foreground">ফ্রি কনসালটেশনে আপনার আইডিয়া শেয়ার করুন।</p>
          </div>
          <Button size="lg" variant={"destructive"} className="px-8">Start Consultation</Button>
        </div>
      </div>
    </div>
  );
};

export default Customize;
