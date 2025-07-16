import React from "react";
import { ManBagDropdown } from "../navbar-dropdown";
import Link from "next/link";
import { useMenuCategoriesQuery } from "@/redux/api/categoriesApi";

const NavMenu = () => {
  const { data: menu, isLoading } = useMenuCategoriesQuery({});
  if (isLoading) {
    return (
      <nav className="flex gap-5 text-sm">
        <div
          className="skeleton skeleton-title"
          style={{ width: 80, height: 20 }}
        ></div>
        <div
          className="skeleton skeleton-title"
          style={{ width: 100, height: 20 }}
        ></div>
        <div
          className="skeleton skeleton-link"
          style={{ width: 60, height: 20 }}
        ></div>
        <div
          className="skeleton skeleton-link"
          style={{ width: 40, height: 20 }}
        ></div>
        <div
          className="skeleton skeleton-title"
          style={{ width: 80, height: 20 }}
        ></div>
        <div
          className="skeleton skeleton-link"
          style={{ width: 90, height: 20 }}
        ></div>
        <div
          className="skeleton skeleton-link"
          style={{ width: 100, height: 20 }}
        ></div>
      </nav>
    );
  }

  const dropdownMenu = menu?.data?.data?.filter(
    (item: any) => item.children?.length > 0
  );

  const dropdown = menu?.data?.data?.filter(
    (item: any) => item.children?.length === 0
  );

  return (
    <>
      <nav className="flex gap-5 text-sm">
        {dropdownMenu?.map((item: any, index: number) => (
          <ManBagDropdown
            key={index}
            title={item?.title}
            slug={item?.slug}
            items={item?.children}
          />
        ))}
        {dropdown?.map((item: any, index: number) => (
          <Link
            className="border-b-2 border-[#030712] hover:border-[#FF7E26] transition-all duration-200"
            key={index}
            href={`/all-product/${item?.slug}`}
          >
            {item?.title}
            {/* <span className="inline-block w-0 group-hover:w-full h-[2px] transition-all duration-300 bg-[#FF7E26]"></span> */}
          </Link>
        ))}
      </nav>
    </>
  );
};

export default NavMenu;
