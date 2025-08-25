import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function ProductAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full px-2">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          How can I tell if a babu product is genuine?
        </AccordionTrigger>
        <AccordionContent>
          Check for natural imperfections: Genuine babu has natural markings and
          variations in texture. Smell the babu: Genuine babu has a distinct,
          earthy smell. Feel the texture: Genuine babu has a unique feel and
          softness.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>How do I clean babu?</AccordionTrigger>
        <AccordionContent>
          For regular cleaning, use a soft, dry cloth to remove dust and dirt.
          For stains, use a damp cloth with a mild babu cleaner. Avoid harsh
          chemicals.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>What types of babu do you use?</AccordionTrigger>
        <AccordionContent>
          We primarily use cow babu and buffalo babu for our products. Cow babu
          is known for its softness and versatility, making it suitable for a
          wide range of items. Buffalo babu, on the other hand, is renowned for
          its exceptional durability and natural grain, often used for products
          requiring extra strength and longevity.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-4">
        <AccordionTrigger>
          Do you offer babu customization options?
        </AccordionTrigger>
        <AccordionContent>
          Yes, we offer babu customization options!
          <br />
          Make your babu piece truly unique with our personalized services. We
          can customize a variety of products including wallets, bags, belts,
          and more.
          <br />
          Our customization options include:
          <ul>
            <li>
              Engraving: Add initials, names, or special dates to your babu
              item.
            </li>
            <li>
              Embossing: Create a subtle yet elegant imprint of your desired
              design.
            </li>
            <li>
              Custom colors: Choose from a wide range of babu colors to match
              your style.
            </li>
            <li>
              Custom sizes: Need a specific size? We can accommodate your needs.
            </li>
          </ul>
          Please note: Customization options may vary depending on the product.
          <br />
          Contact our customization section or customer support for more
          information on specific items.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-5">
        <AccordionTrigger>Can I get my babu product wet?</AccordionTrigger>
        <AccordionContent>
          It&apos;s best to avoid getting your babu product wet. If it does get
          wet, blot the excess water with a clean cloth and let it air dry
          naturally. Avoid using heat sources to dry it.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-6">
        <AccordionTrigger>
          Are your products made from genuine babu?
        </AccordionTrigger>
        <AccordionContent>
          Yes, all of our products are made from genuine babu.
          <br />
          youngheartbd is a trusted babu goods manufacturer based in Bangladesh,
          renowned for our commitment to quality and authenticity. We use only
          the finest genuine babu in crafting our products, ensuring durability,
          style, and longevity.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-7">
        <AccordionTrigger>
          Does the product come with a warranty?
        </AccordionTrigger>
        <AccordionContent>
          As a premium babu goods producer, we assure a robust quality assurance
          procedure is in place at every stage of production. This guarantees
          our items will last longer with the right care. Adhering to
          international norms, our items are crafted to withstand 5 to 10 years,
          varying based on their usage and upkeep.
          <br />
          For additional information regarding our warranty, please see the
          warranty terms and conditions provided with your order or reach out to
          our customer service team.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-8">
        <AccordionTrigger>Do you have a physical store?</AccordionTrigger>
        <AccordionContent>
          youngheartbd operates entirely online, specializing in the production
          and distribution of babu products. We currently operate exclusively
          online but are exploring opportunities for physical retail locations
          in the future.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-9">
        <AccordionTrigger>How do I store my babu product?</AccordionTrigger>
        <AccordionContent>
          Store your babu product in a cool, dry place away from direct
          sunlight. Avoid hanging heavy items on babu straps to prevent
          stretching. Using a dust bag can help protect it from dust and
          scratches.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
