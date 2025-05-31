"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  getCartItems,
  updateCartItemQty,
  removeCartItem,
} from "../lib/cart";
import toast from "react-hot-toast";
import axios from "axios";


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
    async function initCartAndFetch() {
      try {
        await axios.get('/api/magento/cart');
        const data = await getCartItems();
        setItems(data);
        toast.success('Your Cart loaded');
      } catch (error) {
        toast.error('Error in fetching your cart');
        console.log('Error: ' + error);
      }
    }
    initCartAndFetch()
  }, [])

  const updateQty = async (itemId: number, newQty: number) => {
    if (newQty < 1) return;
    try {
      await updateCartItemQty(itemId, newQty);
      setItems((prev) =>
        prev.map((item) =>
          item.item_id === itemId ? { ...item, qty: newQty } : item
        )
      );
    } catch (error) {
      console.error("Failed to update quantity", error);
    }
  };

  const removeItem = async (itemId: number) => {
    try {
      await removeCartItem(itemId);
      setItems((prev) => prev.filter((item) => item.item_id !== itemId));
      toast.success("Removed item successfully");
    } catch (error) {
      toast.error("Failed to remove item");
      console.error("Failed to remove item", error);
    }
  };

  const total = items.reduce((acc, item) => acc + item.qty * item.price, 0);

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid gap-6 w-full max-w-3xl mx-auto">
            {items.map((item) => (
              <Card
                key={item.item_id}
                className="bg-gray-700 border border-gray-500 rounded-2xl shadow-md"
              >
                <CardContent className="p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                  {/* Product Info */}
                  <div className="flex-1 w-full md:w-auto">
                    <img

                    />
                    <h2 className="text-xl font-semibold text-white">{item.name}</h2>
                    <p className="text-sm text-gray-400">SKU: {item.sku}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4">
                    <Button
                      className="bg-gray-800 text-white border border-gray-700 hover:bg-gray-700"
                      size="icon"
                      onClick={() => updateQty(item.item_id, item.qty - 1)}
                    >
                      –
                    </Button>
                    <span className="w-8 text-center text-lg font-semibold text-white">
                      {item.qty}
                    </span>
                    <Button
                      className="bg-gray-800 text-white border border-gray-700 hover:bg-gray-700"
                      size="icon"
                      onClick={() => updateQty(item.item_id, item.qty + 1)}
                    >
                      +
                    </Button>
                  </div>

                  {/* Price + Remove */}
                  <div className="text-right min-w-[100px]">
                    <p className="text-lg font-semibold text-green-400">
                      ₹{(item.price * item.qty).toFixed(2)}
                    </p>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="mt-2"
                      onClick={() => removeItem(item.item_id)}
                    >
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Total + Checkout */}
          <div className="max-w-3xl mx-auto mt-12 border-t border-gray-800 pt-6">
            <div className="flex justify-between items-center text-2xl font-semibold px-2">
              <span>Total</span>
              <span className="text-green-400">₹{total.toFixed(2)}</span>
            </div>
            <Button className="w-full mt-6 text-lg py-6 rounded-xl bg-green-600 hover:bg-green-700 transition">
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
