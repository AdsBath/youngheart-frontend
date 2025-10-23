import { Clock, Mail, MapPin, Phone } from "lucide-react";

export default function AboutPage() {
     return (
          <div className=" bg-background font-sans">
               {/* Hero Section */}
               <section className="py-10 bg-muted/10 flex flex-col items-center text-center px-4">
                    <h1 className=" text-xl md:text-4xl font-bold mb-4 text-foreground">About <span className="text-primary">YoungHeart</span></h1>
                    <p className="max-w-xl text-muted-foreground text-base">
                         Our journey starts with genuine, premium leather — chosen for its strength, character, and ability to age beautifully. Every product is built to stay with you for years.
                    </p>
               </section>

               {/* Story & Values Section */}
               <section className="py-8 px-4">
                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                         <div className="bg-card p-6 rounded-lg border border-border shadow-sm text-center">
                              <h2 className="text-xl font-semibold mb-2 text-foreground">Made to Last</h2>
                              <p className="text-muted-foreground text-sm">
                                   Genuine, premium leather designed to age beautifully over time.
                              </p>
                         </div>

                         <div className="bg-card p-6 rounded-lg border border-border shadow-sm text-center">
                              <h2 className="text-xl font-semibold mb-2 text-foreground">Handcrafted</h2>
                              <p className="text-muted-foreground text-sm">
                                   Every piece is handmade by skilled artisans with care and passion.
                              </p>
                         </div>

                         <div className="bg-card p-6 rounded-lg border border-border shadow-sm text-center">
                              <h2 className="text-xl font-semibold mb-2 text-foreground">Sustainable</h2>
                              <p className="text-muted-foreground text-sm">
                                   Responsibly sourced leather supporting local craftsmen and reducing waste.
                              </p>
                         </div>
                    </div>
               </section>

               {/* Contact Section */}
               <section className="py-4 bg-muted/10 px-4">
                    <h2 className="text-2xl font-bold text-center mb-8 text-foreground">Get In Touch</h2>
                    <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                         <div className="flex flex-col items-center">
                              <div className="bg-primary/10 p-3 rounded-full mb-2">
                                   <Mail className="h-5 w-5 text-primary" />
                              </div>
                              <p className="text-muted-foreground text-sm">youngheartbd@gmail.com</p>
                         </div>

                         <div className="flex flex-col items-center">
                              <div className="bg-primary/10 p-3 rounded-full mb-2">
                                   <Phone className="h-5 w-5 text-primary" />
                              </div>
                              <p className="text-muted-foreground text-sm">01789649019</p>
                         </div>

                         <div className="flex flex-col items-center">
                              <div className="bg-primary/10 p-3 rounded-full mb-2">
                                   <MapPin className="h-5 w-5 text-primary" />
                              </div>
                              <p className="text-muted-foreground text-sm">Road 7, Ranavola, Turag, Dhaka-1230</p>
                         </div>
                    </div>
               </section>

               {/* Tagline */}
               <section className=" pt-4 px-4 flex justify-center items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <p className="text-sm italic text-foreground">✨ YoungHeart – Timeless leather, made with care.</p>
               </section>
          </div>
     );
}
