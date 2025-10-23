

export default function PoliciesPage() {
     return (
          <div className="min-h-screen flex flex-col bg-background">
               <main className="flex-1 py-12">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                         <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6 text-center">Our Policy</h1>
                         <p className="text-muted-foreground text-center mb-10 leading-relaxed max-w-2xl mx-auto">
                              By placing an order, you agree to our below terms. If you disagree or are confused, please contact us before purchase.
                         </p>

                         <div className="space-y-10">
                              {/* Prices */}
                              <section className="rounded-lg bg-card p-6 shadow border border-primary">
                                   <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Prices</h2>
                                   <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                                        <li>All prices are in BDT.</li>
                                        <li>Taxes, duties, import/custom fees, and delivery charges are not included unless stated.</li>
                                        <li>Prices may be updated or corrected without notice.</li>
                                   </ul>
                              </section>

                              {/* Payment */}
                              <section className="rounded-lg bg-card p-6 shadow border border-primary">
                                   <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Payment</h2>
                                   <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                                        <li>We accept: bKash, Cash on Delivery &amp; Bank to Bank Transfer</li>
                                        <li>All payments are secured by SSL encryption.</li>
                                        <li>We may request verification if an order seems fraudulent.</li>
                                   </ul>
                              </section>

                              {/* Delivery Time & Charges */}
                              <section className="rounded-lg bg-card p-6 shadow border border-primary">
                                   <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Delivery Time &amp; Charges</h2>
                                   <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                                        <li>Delivery times depend on courier schedules (business days).</li>
                                        <li>We always try to deliver as per customer demand.</li>
                                        <li>YoungHeart is not responsible for courier delays as it’s beyond our control.</li>
                                        <li>All delivery estimates are given in working/business days. Delays due to holidays, high demand, or other unforeseen circumstances may affect delivery times.</li>
                                   </ul>
                              </section>

                              {/* Products & Stock */}
                              <section className="rounded-lg bg-card p-6 shadow border border-primary">
                                   <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Products &amp; Stock</h2>
                                   <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                                        <li>Products may sell out; we’ll notify you if unavailable.</li>
                                        <li>All items are handcrafted from natural leather, so slight variations in color or texture are part of their unique character.</li>
                                        <li>Leather is sensitive to water—avoid heavy rain or moisture.</li>
                                   </ul>
                              </section>

                              {/* Returns & Refunds */}
                              <section className="rounded-lg bg-card p-6 shadow border border-primary">
                                   <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Returns &amp; Refunds</h2>
                                   <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                                        <li>Not happy at delivery? You can return the product immediately to the delivery person.</li>
                                        <li>Items must be unused and in original packaging.</li>
                                        <li>Refunds are issued after return approval.</li>
                                   </ul>
                              </section>

                              {/* Warranty */}
                              <section className="rounded-lg bg-card p-6 shadow border border-primary">
                                   <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Warranty</h2>
                                   <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                                        <li>30-day warranty against manufacturing defects.</li>
                                        <li>Does not cover misuse, accidents, or unauthorized changes.</li>
                                        <li>Claims within 30 days may be repaired, replaced, or refunded.</li>
                                   </ul>
                              </section>

                              {/* Privacy */}
                              <section className="rounded-lg bg-card p-6 shadow border border-primary">
                                   <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Privacy</h2>
                                   <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                                        <li>Your personal and payment details are secure with SSL encryption.</li>
                                        <li>We do not share your data, and you may request changes or deletion at any time.</li>
                                        <li>If YoungHeart merges or is acquired, your data may transfer to new owners.</li>
                                   </ul>
                              </section>

                              {/* Legal & Copyright */}
                              <section className="rounded-lg bg-card p-6 shadow border border-primary">
                                   <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Legal &amp; Copyright</h2>
                                   <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                                        <li>Website design, text, and images are © 2025 YoungHeart Brand.</li>
                                        <li>Reproduction or misuse without permission is not allowed.</li>
                                        <li>Our trademarks and logos are legally protected.</li>
                                   </ul>
                              </section>

                              {/* Sizes */}
                              <section className="rounded-lg bg-card p-6 shadow border border-primary">
                                   <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Sizes</h2>
                                   <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                                        <li>All measurements are external, shown in cm.</li>
                                   </ul>
                              </section>

                              {/* Force Majeure */}
                              <section className="rounded-lg bg-card p-6 shadow border border-primary">
                                   <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Force Majeure</h2>
                                   <p className="text-muted-foreground">We are not liable for delays or cancellations caused by events beyond our control (e.g., strikes, disasters, government actions).</p>
                              </section>

                              {/* Cancellation Policy */}
                              <section className="rounded-lg bg-card p-6 shadow border border-primary">
                                   <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Cancellation Policy</h2>
                                   <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                                        <li>After placing your order, we will contact you within 3 days to confirm it. If we can’t reach you, the order will be automatically canceled.</li>
                                        <li>If you wish to cancel after confirmation, contact us immediately via social media or phone.</li>
                                        <li><strong className="text-foreground">Dispatched Orders:</strong> If the parcel has already left our warehouse, you will be responsible for the delivery charges.</li>
                                        <li><strong className="text-foreground">Delivery Attempts:</strong> Our team will hold the parcel for 3 days. If delivery fails after 3 attempts, the parcel will be returned, and you’ll be responsible for delivery costs.</li>
                                   </ul>
                              </section>

                              {/* Delivery & Payment Details */}
                              <section className="rounded-lg bg-card p-6 shadow border border-primary">
                                   <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Delivery &amp; Payment</h2>
                                   <div className="space-y-4">
                                        <div>
                                             <p className="font-semibold text-foreground mb-2">Inside Dhaka Metro</p>
                                             <ul className="list-disc pl-5 text-muted-foreground">
                                                  <li>Delivery Charge: 60 BDT</li>
                                                  <li>Payment Options: Cash on Delivery (COD) or Advance via bKash or Bank to Bank transfer</li>
                                                  <li>Estimated Delivery Time: 2–5 working days</li>
                                             </ul>
                                        </div>
                                        <div>
                                             <p className="font-semibold text-foreground mb-2">Outside Dhaka Metro</p>
                                             <ul className="list-disc pl-5 text-muted-foreground">
                                                  <li>Delivery Charge: 130 BDT (must be paid in advance via bKash to confirm order)</li>
                                                  <li>Remaining Payment: COD or full advance via bKash or Bank transfer</li>
                                                  <li>Estimated Delivery Time: 4–8 working days</li>
                                             </ul>
                                        </div>
                                        <p className="text-muted-foreground">📞 Our courier will call you before delivering your package.</p>
                                        <p className="text-muted-foreground">We are committed to deliver on time but due to unexpected courier delays YoungHeart cannot be held responsible for.</p>
                                   </div>
                              </section>

                              {/* Return & Exchange */}
                              <section className="rounded-lg bg-card p-6 shadow border border-primary">
                                   <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Return &amp; Exchange</h2>
                                   <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                                        <li>On-the-spot Return: If you are not satisfied at delivery, simply return the product to the courier in its original packaging and condition.</li>
                                        <li>14 Day Complaint Policy: You have up to 14 days to report defects in material or workmanship under normal use.</li>
                                        <li>Exclusions: Damages caused by misuse, poor maintenance, accidents, or unauthorized alterations are not covered.</li>
                                        <li>Next Steps: Depending on the case, we will offer a repair or an exchange to make sure your satisfaction.</li>
                                   </ul>
                                   <p className="text-muted-foreground mt-2">✨ YoungHeart stands for trust, quality, and long-lasting craftsmanship. Every order is handled with care.</p>
                              </section>

                              {/* Privacy Policy Details */}
                              <section className="rounded-lg bg-card p-6 shadow border border-primary">
                                   <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">YoungHeart Privacy Policy</h2>
                                   <div className="space-y-4 text-muted-foreground">
                                        <div>
                                             <p className="font-semibold text-foreground mb-2">1. Information We Collect</p>
                                             <ul className="list-disc pl-5">
                                                  <li>Personal Details: Name, phone number, email, shipping address.</li>
                                                  <li>Payment Details: Card or bKash information (processed securely via SSL).</li>
                                                  <li>Order Information: Products purchased, order history, and delivery details.</li>
                                             </ul>
                                        </div>
                                        <div>
                                             <p className="font-semibold text-foreground mb-2">2. How We Use Your Information</p>
                                             <ul className="list-disc pl-5">
                                                  <li>Process and fulfill orders efficiently.</li>
                                                  <li>Communicate order updates and customer support.</li>
                                                  <li>Improve our products, website, and services.</li>
                                                  <li>Personalize your shopping experience.</li>
                                             </ul>
                                        </div>
                                        <div>
                                             <p className="font-semibold text-foreground mb-2">3. How We Protect Your Data</p>
                                             <ul className="list-disc pl-5">
                                                  <li>All sensitive data is encrypted using SSL technology.</li>
                                                  <li>We follow industry-standard security measures to prevent unauthorized access.</li>
                                                  <li>While no system is 100% secure, we implement strict safeguards to protect your information.</li>
                                             </ul>
                                        </div>
                                        <div>
                                             <p className="font-semibold text-foreground mb-2">4. Sharing Your Information</p>
                                             <ul className="list-disc pl-5">
                                                  <li>We do not sell or trade your personal data.</li>
                                                  <li>Data may be shared with trusted partners only to fulfill orders or provide services (e.g., couriers, payment gateways).</li>
                                                  <li>In case of company merger or acquisition, your information may transfer to the new owners.</li>
                                             </ul>
                                        </div>
                                        <div>
                                             <p className="font-semibold text-foreground mb-2">5. Cookies &amp; Tracking</p>
                                             <ul className="list-disc pl-5">
                                                  <li>We may use cookies to improve website performance and user experience.</li>
                                                  <li>Cookies help us remember your preferences and track shopping behavior for better service.</li>
                                             </ul>
                                        </div>
                                        <div>
                                             <p className="font-semibold text-foreground mb-2">6. Your Rights</p>
                                             <ul className="list-disc pl-5">
                                                  <li>Access, correct, or update your personal information.</li>
                                                  <li>Request deletion of your personal data (unless required for legal or business purposes).</li>
                                                  <li>Opt-out of marketing communications at any time.</li>
                                             </ul>
                                             <p className="mt-2">📞 Contact us anytime for questions or to exercise your privacy rights: <span className="font-semibold">[Insert Contact Info]</span></p>
                                        </div>
                                        <div>
                                             <p className="font-semibold text-foreground mb-2">7. Policy Updates</p>
                                             <ul className="list-disc pl-5">
                                                  <li>We may update this Privacy Policy from time to time.</li>
                                                  <li>Changes take effect immediately upon posting on the website.</li>
                                             </ul>
                                             <p className="mt-2">✨ YoungHeart – Your trust, our responsibility.</p>
                                        </div>
                                   </div>
                              </section>

                              {/* Refund Policy Details */}
                              <section className="rounded-lg bg-card p-6 shadow border border-primary">
                                   <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">YoungHeart Refund Policy</h2>
                                   <div className="space-y-4 text-muted-foreground">
                                        <div>
                                             <p className="font-semibold text-foreground mb-2">Refund Timeline</p>
                                             <ul className="list-disc pl-5">
                                                  <li>Approved refunds are processed within 5–10 working days.</li>
                                             </ul>
                                        </div>
                                        <div>
                                             <p className="font-semibold text-foreground mb-2">When Refunds Apply</p>
                                             <ul className="list-disc pl-5">
                                                  <li>If you cancel before dispatch, you’ll receive a full refund.</li>
                                                  <li>If you cancel after dispatch or due to unavailability at delivery, the delivery charge will be deducted from your refund.</li>
                                                  <li>For orders outside Dhaka Metro, the advance delivery charge is non-refundable once the parcel has shipped.</li>
                                             </ul>
                                        </div>
                                        <div>
                                             <p className="font-semibold text-foreground mb-2">Refund Deductions</p>
                                             <ul className="list-disc pl-5">
                                                  <li>Payment gateway charges are non-refundable:</li>
                                                  <li>VISA/MasterCard: 2%</li>
                                                  <li>bKash/Nagad: 2%</li>
                                                  <li>Amex : 3%</li>
                                             </ul>
                                        </div>
                                        <div>
                                             <p className="font-semibold text-foreground mb-2">Damaged or Faulty Products</p>
                                             <ul className="list-disc pl-5">
                                                  <li>For damaged items, we provide exchange or repair only.</li>
                                                  <li>Refunds are not available for such cases.</li>
                                             </ul>
                                        </div>
                                        <p className="mt-2">At YoungHeart, customer satisfaction is our priority. Please review our refund terms before placing an order.</p>
                                   </div>
                              </section>
                         </div>

                         <div className="mt-16 text-center text-muted-foreground border-t pt-8">
                              <p>📞 For any questions or assistance, feel free to contact us. Your satisfaction is our priority!</p>
                         </div>
                    </div>
               </main>
          </div>
     );
}
