import BlurImg from "@/components/custom/blur-img";

// Reusable Section Component with Optional Subtitle
export const Section = ({ title, subtitle, children }: any) => (
  <section className="mb-16">
    <div className="text-center">
      <h2 className="text-3xl font-semibold text-gray-800 mb-2">{title}</h2>
      {subtitle && <p className="text-gray-600 mb-6">{subtitle}</p>}
    </div>
    {children}
  </section>
);

// Reusable Card Component with Flexibility for Different Content
export const Card = ({ imgSrc, imgAlt, title, description, children }: any) => (
  <div className="border rounded-lg p-6 shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
    {imgSrc && (
      <BlurImg
        src={imgSrc}
        alt={imgAlt}
        className="rounded-lg object-cover h-48 w-full"
      />
    )}
    {title && <h3 className="mt-4 text-xl font-semibold">{title}</h3>}
    {description && <p className="text-gray-600 mt-2">{description}</p>}
    {children && <div className="mt-4">{children}</div>}
  </div>
);

// Reusable Grid Layout Component with Responsive Columns
export const GridLayout = ({ columns, children }: any) => (
  <div
    className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${columns} gap-8`}
  >
    {children}
  </div>
);
