import AllProducts from "./_components/all-product";
import BrandProducts from "./_components/brand-products";

export default function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { collection, q: searchValue } = searchParams as {
    [key: string]: string;
  };
  const { brand, q: value } = searchParams as {
    [key: string]: string;
  };

  return (
    <div>
      {!brand ? (
        <AllProducts collection={collection} searchValue={searchValue} />
      ) : (
        <BrandProducts collection={brand} searchValue={value} />
      )}
    </div>
  );
}
