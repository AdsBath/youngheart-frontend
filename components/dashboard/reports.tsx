"use client";

import {
  useGetTopTenCategoryQuery,
  useGetTopTenProductsQuery,
  useOrderOverviewQuery,
} from "@/redux/api/orderApi";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { TopProduct } from "./top-product";
import { TopCategory } from "./top-category";

const Reports = () => {
  const { data: topTenCategory, isLoading: topTenCategoryLoading } =
    useGetTopTenCategoryQuery({});
  const { data: topTenProduct, isLoading: topTenProductLoading } =
    useGetTopTenProductsQuery({});
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle>Top Product</CardTitle>
          </CardHeader>
          <CardContent>
            <TopProduct
              isLoading={topTenProductLoading}
              topProduct={topTenProduct?.data}
            />
          </CardContent>
        </Card>
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Top Category</CardTitle>
          </CardHeader>
          <CardContent>
            <TopCategory
              isLoading={topTenCategoryLoading}
              topCategory={topTenCategory?.data}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
