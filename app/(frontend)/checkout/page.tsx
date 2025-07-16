import { Metadata } from "next";
import Checkout from "./_components/checkout";

export const metadata: Metadata = {
    title: "Babukhusi || Checkout page",
    description: "Babukhusi website created by Nextfocus",
};

const CheckoutPage = () => {
    return (
        <>
            <Checkout />
        </>
    );
};

export default CheckoutPage;
