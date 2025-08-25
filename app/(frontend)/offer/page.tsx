import BlurImg from "@/components/custom/blur-img";
import Offer from "@/components/frontend/offer/offer-on-page";
import { BASE_URL } from "@/utils/base-url";

async function fetchData<T = any>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, { next: { revalidate: 30 } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

const OfferOnPage = async () => {
  const response = await fetchData<any>("/discount-banner/frontend");
  const { data } = response || {};
  const offerProductResponse = await fetchData<any>("/products/all-offer-product");
  const { data: offerProductData } = offerProductResponse || {};

  return (
    <div className="min-h-[150vh] ">
      <div className="relative">
        <BlurImg
          src={data?.banner}
          alt="thumbnail"
          className="w-full h-[180px] md:h-[450px] object-cover rounded-none"
        />
      </div>
      <Offer offerProductData={offerProductData} />
    </div>
  );
};

export default OfferOnPage;
