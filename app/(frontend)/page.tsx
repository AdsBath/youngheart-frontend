import CustomCarousel from "@/components/frontend/home/custom-carousel";
import OfferPage from "@/components/frontend/home/offer-page";
import ProductCategory from "@/components/frontend/home/product-category";
import ProductCollection from "@/components/frontend/home/product-collection";
import Features from "@/components/frontend/home/product-feature";
import ScrollToTopButton from "@/components/frontend/home/scroll-to-top-button";
import { BASE_URL } from "@/utils/base-url";
import type { Metadata } from "next";

// Metadata for SEO optimization
export const metadata: Metadata = {
  title: "Youngheart | Your One-Stop Shop for  Bags",
  description: "Discover amazing deals and a wide range of products at Youngheart. Shop now and enjoy exclusive discounts and offers!",
  keywords:
    "youngheart, online shopping, ecommerce, discounts, offers, product features, collections",
};

// Generic fetch helper with graceful failure (no console noise on server)
async function fetchData<T = any>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, { next: { revalidate: 30 } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null; // swallow error to avoid SSR console spam
  }
}

const Home = async () => {
  const herobannerResponse = await fetchData<any>("/banner");
  const { data: herobannerData } = herobannerResponse || {};

  //   const offerBannerResponse = await fetchData("/discount-banner/frontend");
  //   const { data: offerBannerData } = offerBannerResponse || {};

  //   const offerProductResponse = await fetchData("/products/offer-product");
  //   const { data: offerProductData } = offerProductResponse || {};

  // const featuresResponse = await fetchData("/feature");
  // const { data: featuresData } = featuresResponse || {};

  const featureCategoryResponse = await fetchData<any>("/categories/featured");
  const { data: featureCategoryData } = featureCategoryResponse || {};

  const productCollectionResponse = await fetchData<any>("/product-collection");
  const { data: productCollectionData } = productCollectionResponse || {};

  return (
    <>
      {/* Above-the-fold components */}
      <CustomCarousel bannerData={herobannerData?.data} />
      <ProductCategory categoriesData={featureCategoryData?.data} />

      {/* Below-the-fold components */}
      {/* <OfferPage
        offerProductData={offerProductData}
        bannerData={offerBannerData}
      /> */}
      {/* <Features featureData={featuresData} /> */}
      <ProductCollection collections={productCollectionData?.data} />

      {/* Client-only component */}
      <ScrollToTopButton />
    </>
  );
};

export default Home;
