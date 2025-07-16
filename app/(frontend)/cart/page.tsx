import { Metadata } from "next";
import Cart from "./_components/cart-page";

export const metadata: Metadata = {
    title: "Babukhusi || Cart page",
    description: "Babukhusi website created by Nextfocus",
    authors: {
        name: "Masud Rana",
        url: "https://www.facebook.com/masudranawebdev",
    },
    publisher: "Nextfocus",
    keywords: ["Babukhusi", "e-commerce", "nextjs", "reactjs"],
    robots: "https://www.babubangla.com",
    category: "babubangla",
    openGraph: {
        type: "website",
        url: "https://www.babubangla.com/cart",
        title: "Babukhusi || Cart page",
        description: "Babukhusi website created by Nextfocus",
        siteName: "Babukhusi",
        images: [
            {
                url: "https://www.babubangla.com/images/logo.png",
                width: 1200,
                height: 630,
                alt: "Babukhusi logo",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "babubangla",
        description: "Babukhusi website created by Nextfocus",
        images: "https://www.babubangla.com/images/logo.png",
    },
};

const CartPage = () => {
    return (
        <>
            <Cart />
        </>
    );
};

export default CartPage;
