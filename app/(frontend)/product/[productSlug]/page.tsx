import ProductDetails from "@/components/frontend/product/product-details-page";
import { fetchProductData } from "@/lib/fetchProductData";
import type { Metadata } from "next";

interface IParams {
  params: {
    productSlug: string;
  };
}

// Dynamically generate metadata based on the productSlug
export async function generateMetadata({
  params: { productSlug },
}: IParams): Promise<Metadata> {
  const product = await fetchProductData(productSlug);

  if (!product?.data) {
    return {
      title: "Product not found | babuBangla",
      description: "The product you're looking for is not available.",
    };
  }

  const productName = product.data.name;
  const productDescription =
    product.data.shortDescription ||
    "High-quality babu products available at babuBangla.";

  const metaTitle = product.data.metaTitle || productName;
  const metaDescription = product.data.metaDescription || productDescription;

  return {
    title: ` ${metaTitle}`,
    description: metaDescription,
    keywords: `${metaTitle.split(" ")} ,${metaDescription.split(
      " "
    )} ,${productName.split(" ")}, ${productDescription.split(
      " "
    )}, Babukushi, one-stop shop for kids' essentials! Browse our selection of must-have products that help your child grow and thrive. Shop easily from the comfort of your home!`,
    openGraph: {
      title: productName,
      description: productDescription,
      url: `https://babubangla.com/product/${productSlug}`,
      images: [product.data.thumbnail],
    },
  };
}

const ProductDetailsPage: React.FC<IParams> = async ({
  params: { productSlug },
}) => {
  const product = await fetchProductData(productSlug);

  if (!product?.data) {
    return <div>Product not found.</div>;
  }
  return <ProductDetails product={product.data} />;
};

export default ProductDetailsPage;
