'use client';

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

interface Product {
    id: number,
    name: string,
    sku: string,
    image: { url: string },
    price: { regularPrice: { amount: { value: number, currency: string } } }
    configurable_options?: any
}

export default function ProductWrapper(
    {
        products,
        currentPage,
        totalPages
    }: {
        products: Product[],
        currentPage: number,
        totalPages: number
    }
) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [products]);

    // if (loading) {
    //     return (
    //         <div className="flex justify-center items-center min-h-[60vh] w-full">
    //             <Loader2 className="h-16 w-16 animate-spin text-gray-400" />
    //         </div>
    //     );
    // }

    return (
        <>
            {loading ? (
                <div className="absolute inset-0 flex justify-center items-center bg-gray-900/90 z-10">
                    <Loader2 className="h-16 w-16 animate-spin text-white" />
                </div>
            ) : (
                products.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        sku={product.sku}
                        image={product.image.url}
                        configurableOptions={product.configurable_options || false}
                        price={product.price.regularPrice.amount.value}
                        currency={product.price.regularPrice.amount.currency}
                    />
                ))
            )}
        </>

    );
}
