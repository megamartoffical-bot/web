import React from "react";

export const AllProductsSkeleton = () => {
  return (
    <div className="bg-white md:rounded-lg p-4 sm:p-6">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-4" />
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-10 w-24 bg-gray-200 rounded animate-pulse"
            />
          ))}
        </div>
      </div>

      {/* Products Grid Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            {/* Image Skeleton */}
            <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg animate-pulse" />

            {/* Text Skeleton */}
            <div className="space-y-2 p-2">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
