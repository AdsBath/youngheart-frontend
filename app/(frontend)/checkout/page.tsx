import { Metadata } from "next";
import Checkout from "./_components/checkout";

export const metadata: Metadata = {
  title: "Youngheartbd || Checkout page",
  description: "Youngheartbd website created by Nextfocus",
};

const CheckoutPage = () => {
  return (
    <>
      <Checkout />
    </>
  );
};

export default CheckoutPage;
