"use client";
import React, { useState, useMemo } from "react";
import SectionHeader from "../new-arrivals/SectionHeader";
import { useGetAllProductsQuery } from "@/redux/featured/product/productApi";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight, Grid, List } from "lucide-react";
import { AllProductsSkeleton } from "./AllProductsSkeleton";

interface Product {
  _id: string;
  featuredImg: string;
  description: {
    name: string;
    slug: string;
    description: string;
  };
  productInfo: {
    price: number;
    salePrice?: number;
  };
  brandAndCategories: {
    brand: {
      name: string;
    };
    categories: Array<{
      name: string;
    }>;
    tags: Array<{
      name: string;
    }>;
  };
}

const AllProducts = () => {
  const { data, isLoading } = useGetAllProductsQuery({});
  const [tab, setTab] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [itemsToShow, setItemsToShow] = useState(12);

  // Get unique categories
  const categoryTabs = useMemo(() => {
    if (!data) return [];

    const categories = new Set<string>();
    data.forEach((product: Product) => {
      product.brandAndCategories?.categories?.forEach((category) => {
        if (category.name) {
          categories.add(category.name);
        }
      });
    });

    return Array.from(categories).map((categoryName) => ({
      value: categoryName.toLowerCase(),
      label: categoryName,
    }));
  }, [data]);

  // Initialize first tab
  React.useEffect(() => {
    if (categoryTabs.length > 0 && !tab) {
      setTab(categoryTabs[0].value);
    }
  }, [categoryTabs, tab]);

  // Filter products by selected category
  const filteredProducts = useMemo(() => {
    if (!data || !tab) return data?.slice(0, itemsToShow) || [];

    const selectedCategory = categoryTabs.find((cat) => cat.value === tab);
    if (!selectedCategory) return data.slice(0, itemsToShow);

    const filtered = data.filter((product: Product) => {
      return product.brandAndCategories?.categories?.some(
        (category) => category.name === selectedCategory.label
      );
    });

    return filtered.slice(0, itemsToShow);
  }, [data, tab, categoryTabs, itemsToShow]);

  if (isLoading) {
    return <AllProductsSkeleton />;
  }

  const hasMoreProducts = (data?.length || 0) > itemsToShow;

  return (
    <div className="bg-white md:rounded-lg p-4 sm:p-6">
      {/* Header with View Mode Toggle */}
      <div className="flex items-center justify-between mb-8">
        <SectionHeader
          title="All Products"
          tabs={categoryTabs}
          value={tab}
          onValueChange={(v) => setTab(v as any)}
          viewAllLinkState={false}
        />

        {/* View Mode Toggle */}
        <div className="hidden md:flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded transition ${
              viewMode === "grid"
                ? "bg-white text-black shadow"
                : "text-gray-500 hover:text-black"
            }`}
            title="Grid View"
          >
            <Grid size={20} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded transition ${
              viewMode === "list"
                ? "bg-white text-black shadow"
                : "text-gray-500 hover:text-black"
            }`}
            title="List View"
          >
            <List size={20} />
          </button>
        </div>
      </div>

      {/* Products Grid/List */}
      <section>
        {viewMode === "grid" ? (
          // Grid View
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredProducts.map((product: Product) => (
              <Link
                key={product._id}
                href={`/product/${product.description.slug}`}
              >
                <div className="group flex flex-col gap-2 h-full cursor-pointer">
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={product.featuredImg || "/placeholder-image.jpg"}
                      alt={product.description.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Discount Badge */}
                    {product.productInfo?.salePrice &&
                      product.productInfo.salePrice <
                        product.productInfo.price && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          -
                          {Math.round(
                            ((product.productInfo.price -
                              product.productInfo.salePrice) /
                              product.productInfo.price) *
                              100
                          )}
                          %
                        </div>
                      )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors opacity-0 group-hover:opacity-100 flex items-center justify-center">
                      <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 transform group-hover:scale-100 scale-75 transition-all">
                        Quick View
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-col gap-2 p-2">
                    <h3 className="text-sm font-medium line-clamp-2 group-hover:text-blue-600 transition">
                      {product.description.name}
                    </h3>

                    {/* Brand */}
                    <p className="text-xs text-gray-500">
                      {product.brandAndCategories?.brand?.name || "Unknown Brand"}
                    </p>

                    {/* Price */}
                    <div className="flex items-center gap-2">
                      {product.productInfo?.salePrice ? (
                        <>
                          <span className="text-sm font-bold text-red-600">
                            ৳{product.productInfo.salePrice}
                          </span>
                          <span className="text-xs line-through text-gray-400">
                            ৳{product.productInfo.price}
                          </span>
                        </>
                      ) : (
                        <span className="text-sm font-bold">
                          ৳{product.productInfo.price}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          // List View
          <div className="space-y-4">
            {filteredProducts.map((product: Product) => (
              <Link
                key={product._id}
                href={`/product/${product.description.slug}`}
              >
                <div className="group flex gap-4 p-4 border rounded-lg hover:shadow-md transition cursor-pointer">
                  {/* Image */}
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={product.featuredImg || "/placeholder-image.jpg"}
                      alt={product.description.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />

                    {/* Discount Badge */}
                    {product.productInfo?.salePrice &&
                      product.productInfo.salePrice <
                        product.productInfo.price && (
                        <div className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                          -
                          {Math.round(
                            ((product.productInfo.price -
                              product.productInfo.salePrice) /
                              product.productInfo.price) *
                              100
                          )}
                          %
                        </div>
                      )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-medium group-hover:text-blue-600 transition">
                        {product.description.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {product.brandAndCategories?.brand?.name || "Unknown"}
                      </p>
                      <p className="text-xs text-gray-600 line-clamp-2 mt-2">
                        {product.description.description}
                      </p>
                    </div>

                    {/* Price & Categories */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        {product.productInfo?.salePrice ? (
                          <>
                            <span className="text-sm font-bold text-red-600">
                              ৳{product.productInfo.salePrice}
                            </span>
                            <span className="text-xs line-through text-gray-400">
                              ৳{product.productInfo.price}
                            </span>
                          </>
                        ) : (
                          <span className="text-sm font-bold">
                            ৳{product.productInfo.price}
                          </span>
                        )}
                      </div>

                      {/* Categories Tags */}
                      <div className="flex gap-1 flex-wrap justify-end">
                        {product.brandAndCategories?.categories
                          ?.slice(0, 2)
                          .map((cat: any, idx: number) => (
                            <span
                              key={idx}
                              className="text-[10px] bg-gray-100 text-gray-700 px-2 py-1 rounded"
                            >
                              {cat.name}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Load More Button */}
      {hasMoreProducts && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setItemsToShow((prev) => prev + 12)}
            className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-semibold flex items-center gap-2"
          >
            Load More Products <ChevronRight size={20} />
          </button>
        </div>
      )}

      {/* No Products Message */}
      {filteredProducts.length === 0 && (
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <p className="text-lg text-gray-500 font-medium">
              No products found
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Try selecting a different category
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
