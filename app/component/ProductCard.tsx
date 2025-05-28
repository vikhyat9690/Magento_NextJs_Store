"use client"

import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
import { safeAddToCart } from "@/app/lib/cart"
import Link from "next/link"

interface ProductCardProps {
    id: number
    name: string
    sku: string
    image: string
    price: number
    currency: string
}

export default function ProductCard({
    id,
    name,
    sku,
    image,
    price,
    currency,
}: ProductCardProps) {
    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault()
        try {
            await safeAddToCart(sku, 1)
            toast.success("Product added to cart!")
        } catch (error) {
            console.log(error);
            toast.error('Failed adding to cart.');
        }
    }

    return (
        <Link href={`/products/${sku}`} key={id}>
            <div className="bg-black box-border shadow shadow-gray-400 rounded-2xl p-4 flex flex-col items-center">
                <img
                    src={image}
                    alt={name}
                    className="h-64 w-64 object-cover mb-4 rounded"
                />
                <h2 className="text-lg font-semibold text-gray-100">{name}</h2>
                <div className="mt-2 text-center flex">
                    <p className="text-md text-white font-bold">{price}</p>&nbsp;
                    <p className="text-md font-medium text-white">{currency}</p>
                </div>
                <Button onClick={handleAddToCart} className="mt-3">
                    Add to Cart
                </Button>
            </div>
        </Link>
    )
}
