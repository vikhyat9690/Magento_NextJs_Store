export const dynamic = 'force-dynamic';
import { fetchProducts } from "@/app/lib/magento";
import Link from "next/link";
import { Pagination } from "../component/Pagination";
import Filters from "../component/Filters";
import { Button } from "@/components/ui/button";
import { addToCart } from "../lib/cart";
import toast from "react-hot-toast";
import { useMemo } from "react";
import ProductCard from "../component/ProductCard";

interface Product {
  id: number,
  name: string,
  sku: string,
  image: {
    url: string
  },
  price: {
    regularPrice: {
      amount: {
        value: number,
        currency: string
      }
    }
  }
  configurable_options?: {
    
  }
}

interface AllProductsProps {
  searchParams: {
    page?: string,
    price_from?: number,
    price_to?: number
  }
}

export default async function ProductsPage({ searchParams }: AllProductsProps) {
  const page = await searchParams.page;
  const price_from = await searchParams.price_from;
  const price_to = await searchParams.price_to;
  const currentPage = Number(page) || 1;
  const { products, totalPages } = await fetchProducts(currentPage, { price_from, price_to })
  return (
    <div className="min-h-screen w-full bg-gray-900 px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">Products</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="lg:w-1/6 w-full">
          <Filters />
        </div>

        {/* Product Grid */}
        <div className="lg:w-5/6 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products?.map((product: Product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                sku={product.sku}
                image={product.image.url}
                configurableOptions={product.configurable_options ? product['configurable_options'] : false}
                price={product.price.regularPrice.amount.value}
                currency={product.price.regularPrice.amount.currency}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-10 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath="/products"
            />
          </div>
        </div>
      </div>
    </div>



  );
}
