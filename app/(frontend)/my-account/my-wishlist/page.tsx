"use client";
import Breadcrumbs from "@/components/breadcrumb";
import { useAuth } from "@/context/AuthContext";
import WishlistProduct from "./_components/wishlist-product";

const MyWishlist = () => {
  const { user } = useAuth();
  return (
    <>
      <section className="bg-white h-10 mb-3 flex items-center px-4 rounded">
        <Breadcrumbs
          items={[
            { label: "My Account", href: `/my-account` },
            { label: "My Wishlist" },
          ]}
          className=""
        />
      </section>
      <section className="flex flex-col gap-4 bg-white rounded">
        <div className="flex flex-col gap-2 my-4">
          <div className="space-y-2 px-4">
            <h2 className="text-2xl font-bold tracking-tight">My Wishlist</h2>
            <p className="text-muted-foreground">
              List of all my wishlist in the system.
            </p>
          </div>
          <hr />
          <WishlistProduct user={user} />
        </div>
      </section>
    </>
  );
};

export default MyWishlist;
