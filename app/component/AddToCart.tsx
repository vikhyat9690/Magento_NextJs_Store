'use client';

import { Button } from "@/components/ui/button";
import { MdShoppingCartCheckout } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";

interface AddToCartProps {
  sku: string;
  quantity?: number;
  isConfigurable?: boolean;
  selectedOptions?: {
    [attributeId: string]: number;
  };
}

export default function AddToCartBtn({
  sku,
  quantity = 1,
  isConfigurable = false,
  selectedOptions = {},
}: AddToCartProps) {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      const payload = {
        sku,
        quantity,
        ...(isConfigurable && { selectedOptions }),
      };
      await axios.post('/api/magento/cart/add', payload);
      toast.success('Product added to cart!');
    } catch (error) {
      console.error(error);
      toast.error('Error in adding to cart');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="default"
      className="mt-6 w-full md:w-auto flex items-center gap-2"
      onClick={handleAddToCart}
      disabled={loading}
    >
      {loading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 0.8,
            ease: "linear",
          }}
        >
          <AiOutlineLoading3Quarters className="text-lg" />
        </motion.div>
      ) : (
        <>
          Add to Cart <MdShoppingCartCheckout className="text-xl" />
        </>
      )}
    </Button>
  );
}
