import BlurImg from "@/components/custom/blur-img";
import Offer from "@/components/frontend/offer/offer-on-page";
import { BASE_URL } from "@/utils/base-url";

const fetchData = async (params: string) => {
  try {
    const response = await fetch(BASE_URL + params, {
      next: { revalidate: 30 },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const OfferOnPage = async () => {
  const response = await fetchData("/discount-banner/frontend");

  const { data } = response || {};

  const offerProductResponse = await fetchData("/products/all-offer-product");

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
