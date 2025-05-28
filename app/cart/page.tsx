// /app/cart/page.tsx

"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getCartItems } from "../lib/cart";

interface CartItem {
  item_id: number;
  name: string;
  sku: string;
  qty: number;
  price: number;
  product_type: string;
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    async function fetchCart() {
      try {
        const data = await getCartItems();
        setItems(data);
      } catch (error) {
        console.error("Failed to load cart", error);
      }
    }

    fetchCart();
  }, []);

  return (
    <div className="p-8 bg-gray-950 text-white">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid gap-4">
          {items.map((item) => (
            <Card key={item.item_id} className="bg-gray-800 text-white border-none">
              <CardContent className="flex justify-between items-center p-4">
                <div>
                  <h2 className="font-bold">{item.name}</h2>
                  <p className="text-sm text-gray-500">{item.sku}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">Qty: {item.qty}</p>
                  <p className="text-md font-bold">₹{(item.price / 1).toFixed(2)}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
