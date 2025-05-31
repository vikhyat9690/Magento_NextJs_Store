"use client"

import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
import { safeAddToCart } from "@/app/lib/cart"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import AddToCartSimpleBtn from "./AddToCartSimple"
import ConfigurableSelector from "./ConfigurableSelector"

interface ProductCardProps {
    id: number
    name: string
    sku: string
    image: string
    configurableOptions: any
    price: number
    currency: string
}


export default function ProductCard({
    id,
    name,
    sku,
    image,
    price,
    configurableOptions,
    currency,
}: ProductCardProps) {
    const [quantity, setQuantity] = useState(1);
    const increment = () => setQuantity(q => q + 1);
    const decrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value >= 1) {
            setQuantity(value);
        }
    };

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            await safeAddToCart({
                sku: 'simple-variant-sku',
                parentSku: 'configurable-shirt',
                quantity: quantity,
                selectedOptions: {
                    '93': 50,
                    '142': 170
                }
            });
            toast.success("Product added to cart!");
        } catch (error) {
            console.log(error);
            toast.error('Failed adding to cart.');
        }
    }

    return (
        <div className="bg-black box-border shadow shadow-gray-400 rounded-2xl p-4 flex flex-col items-center">
            <Link href={`/products/${sku}`} key={id}>
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
            </Link>
            <div className="flex items-center flex-col text-white mt-2 w-full gap-4">
                <div className="flex items-center -mb-8">
                    <Button onClick={decrement}>-</Button>
                    <Input
                        min="1"
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="w-10 bg-gray-800 text-center text-white border-none"
                    />
                    <Button onClick={increment}>+</Button>
                </div>
                {configurableOptions ?
                    <div>
                        <ConfigurableSelector
                            sku={sku}
                            quantity={quantity}
                            options={configurableOptions}
                        />
                    </div>
                    :
                    <div className=" md:w-auto mt-10">
                        <AddToCartSimpleBtn
                            sku={sku}
                            quantity={quantity}
                        />
                    </div>}
            </div>
        </div>
    )
}
