import {
  Clock,
  Mail,
  MapPin,
  Phone,
  Shield,
  Sparkles,
  Leaf,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative">
        <div
          className="w-full h-48 md:h-64 bg-center bg-cover"
          style={{ backgroundImage: "url('/yh-about.jpg')" }}
        />
        <div className="container mx-auto px-4 -mt-12 md:-mt-16">
          <Card className="mx-auto max-w-4xl">
            <CardHeader className="text-center p-6 md:p-8">
              <CardTitle className="text-2xl md:text-4xl font-bold">
                About <span className="text-primary">YoungHeart</span>
              </CardTitle>
              <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
                Genuine, premium leather chosen for strength and character.
                Crafted to age beautifully and stay with you for years.
              </p>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Story */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-stretch">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">Our Story</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                We started with a simple belief: well-made leather pieces should
                tell your story and last through everyday life. Each product is
                thoughtfully designed and hand-finished by skilled artisans.
              </p>
              <p>
                From careful sourcing to precise stitching, we obsess over the
                details so you can feel the difference every time you carry
                YoungHeart.
              </p>
            </CardContent>
          </Card>
          <div className="rounded-lg bg-[url('/yh-about-m.jpg')] bg-cover bg-center min-h-56 md:min-h-72 border" />
        </div>
      </section>

      {/* Values */}
      <section className="py-4 md:py-8">
        <div className="container mx-auto px-4 max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-base md:text-lg">
                Made to Last
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground text-sm">
              Genuine leather that ages beautifully with everyday use.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-base md:text-lg">
                Handcrafted
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground text-sm">
              Finished by skilled artisans with care and precision.
            </CardContent>
          </Card>
          <Card className="sm:col-span-2 md:col-span-1">
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                <Leaf className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-base md:text-lg">
                Responsible
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground text-sm">
              Responsible sourcing, supporting local craft and reducing waste.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact */}
      <section className="py-8 md:py-10 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="max-w-2xl mx-auto text-center mb-6">
            <h2 className="text-xl md:text-2xl font-semibold">Get in touch</h2>
            <p className="text-muted-foreground text-sm md:text-base mt-1">
              We’re here to help with sizing, care or orders.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-2">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div className="text-sm text-muted-foreground">
                  youngheartbd@gmail.com
                </div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-2">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div className="text-sm text-muted-foreground">01789649019</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-2">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="text-sm text-muted-foreground">
                  Road 7, Ranavola, Turag, Dhaka-1230
                </div>
              </CardContent>
            </Card>
          </div>
          <Separator className="my-6" />
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-primary" />
            <span>YoungHeart – Timeless leather, made with care.</span>
          </div>
        </div>
      </section>
    </div>
  );
}
