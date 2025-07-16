"use client";

import Loading from "@/components/loding";
import { useProductQuery } from "@/redux/api/productApi";
import ProductsForm from "./productsForm";

const EditProductForm = ({ productId }: { productId: string }) => {
  const { data, isLoading } = useProductQuery(productId);

  const product = data?.data;

  if (isLoading) return <Loading />;

  return <ProductsForm productData={product} />;
};

export default EditProductForm;
