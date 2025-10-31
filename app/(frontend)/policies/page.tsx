import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function PoliciesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 py-5 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-xl md:text-4xl font-bold">Store Policies</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              By placing an order, you agree to the terms below. If anything is
              unclear, please contact us before purchase.
            </p>
          </div>

          <div className="space-y-3 md:space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Prices</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                  <li>All prices are in BDT.</li>
                  <li>
                    Taxes, duties, customs and delivery charges are excluded
                    unless stated.
                  </li>
                  <li>Prices may be updated or corrected without notice.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Payment</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                  <li>
                    We accept bKash, Cash on Delivery, and Bank-to-Bank
                    transfer.
                  </li>
                  <li>All payments are protected by SSL encryption.</li>
                  <li>
                    We may request verification if an order appears fraudulent.
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  Delivery Time &amp; Charges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                  <li>
                    Delivery depends on courier schedules (business days).
                  </li>
                  <li>We always try to deliver as per customer demand.</li>
                  <li>
                    YoungHeart isn’t responsible for courier delays beyond our
                    control.
                  </li>
                  <li>
                    Estimates exclude holidays, peak periods and unforeseen
                    events.
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Products &amp; Stock</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                  <li>Items can sell out; we’ll notify you if unavailable.</li>
                  <li>Natural leather varies slightly in color and texture.</li>
                  <li>
                    Avoid heavy rain or moisture; leather is water-sensitive.
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Returns &amp; Refunds</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                  <li>
                    Not happy at delivery? Return immediately to the courier.
                  </li>
                  <li>Items must be unused and in original packaging.</li>
                  <li>Refunds are issued after return approval.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Warranty</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                  <li>30-day warranty against manufacturing defects.</li>
                  <li>
                    Excludes misuse, accidents or unauthorized alterations.
                  </li>
                  <li>
                    Approved claims may be repaired, replaced or refunded.
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Privacy</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                  <li>Your data is secured with SSL encryption.</li>
                  <li>
                    We don’t sell data; you can request edits or deletion.
                  </li>
                  <li>
                    In case of merger or acquisition, data may transfer to new
                    owners.
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Legal &amp; Copyright</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                  <li>
                    Website design, text and images © 2025 YoungHeart Brand.
                  </li>
                  <li>
                    Reproduction or misuse without permission is not allowed.
                  </li>
                  <li>Trademarks and logos are legally protected.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Sizes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                  <li>
                    All measurements are external and shown in centimeters.
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Force Majeure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We aren’t liable for delays or cancellations due to events
                  beyond our control (strikes, disasters, government actions,
                  etc.).
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Cancellation Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                  <li>
                    We’ll contact you within 3 days to confirm your order; if
                    unreachable, it may be cancelled.
                  </li>
                  <li>
                    If you wish to cancel after confirmation, contact us
                    immediately.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">
                      Dispatched orders:
                    </span>{" "}
                    you’re responsible for delivery charges.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">
                      Delivery attempts:
                    </span>{" "}
                    held for 3 days; failed after 3 attempts will return,
                    delivery costs apply.
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  Delivery &amp; Payment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold text-foreground mb-2">
                    Inside Dhaka Metro
                  </p>
                  <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                    <li>Delivery charge: 60 BDT</li>
                    <li>Payment: COD or advance via bKash/Bank transfer</li>
                    <li>Estimated time: 2–5 working days</li>
                  </ul>
                </div>
                <Separator />
                <div>
                  <p className="font-semibold text-foreground mb-2">
                    Outside Dhaka Metro
                  </p>
                  <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                    <li>
                      Delivery charge: 130 BDT (advance via bKash required to
                      confirm)
                    </li>
                    <li>
                      Remaining payment: COD or full advance (bKash/Bank
                      transfer)
                    </li>
                    <li>Estimated time: 4–8 working days</li>
                  </ul>
                </div>
                <p className="text-muted-foreground">
                  Our courier will call before delivery.
                </p>
                <p className="text-muted-foreground">
                  We aim to deliver on time; unexpected courier delays are
                  beyond our control.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Return &amp; Exchange</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                  <li>
                    On-the-spot return if unsatisfied at delivery (keep original
                    condition).
                  </li>
                  <li>14-day complaint window for defects under normal use.</li>
                  <li>
                    Exclusions: misuse, poor maintenance, accidents,
                    unauthorized changes.
                  </li>
                  <li>
                    Resolution may be repair or exchange based on assessment.
                  </li>
                </ul>
                <p className="text-muted-foreground mt-2">
                  YoungHeart stands for trust, quality and craftsmanship.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  YoungHeart Privacy Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <div>
                  <p className="font-semibold text-foreground mb-2">
                    1. Information We Collect
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Personal: name, phone, email, shipping address</li>
                    <li>
                      Payment: card or bKash info (processed securely via SSL)
                    </li>
                    <li>Order: items purchased, history, delivery details</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-2">
                    2. How We Use It
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Process and fulfill orders</li>
                    <li>Communicate updates and support</li>
                    <li>Improve products, site and services</li>
                    <li>Personalize your experience</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-2">
                    3. Protecting Your Data
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>SSL encryption for sensitive data</li>
                    <li>Industry-standard security measures</li>
                    <li>No system is 100% secure; safeguards are in place</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-2">
                    4. Sharing
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>No selling or trading of personal data</li>
                    <li>
                      Shared only with trusted partners to fulfill services
                    </li>
                    <li>Data may transfer upon merger/acquisition</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-2">
                    5. Cookies &amp; Tracking
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Used to improve performance and remember preferences
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-2">
                    6. Your Rights
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Access, correct or update your data</li>
                    <li>Request deletion where legally possible</li>
                    <li>Opt out of marketing anytime</li>
                  </ul>
                  <p className="mt-2">
                    Contact:{" "}
                    <span className="font-semibold">
                      youngheartbd@gmail.com
                    </span>
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-2">
                    7. Updates
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Policy may change; updates are effective upon posting
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-5 text-center text-muted-foreground">
            <Separator className="mb-6" />
            <p>
              Questions? We’re happy to help. Your satisfaction is our priority.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
