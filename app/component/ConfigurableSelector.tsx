'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MdShoppingCartCheckout } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";

interface OptionValue {
  value_index: number;
  label: string;
  swatch_data?: { value: string };
}

interface ConfigurableOption {
  id: number;
  attribute_id: string;
  label: string;
  values: OptionValue[];
  product_id: number;
}

interface ConfigurableSelectorProps {
  options: ConfigurableOption[];
  sku: string;
}

export default function ConfigurableSelector({ options, sku }: ConfigurableSelectorProps) {
  const [selectedOptions, setSelectedOptions] = useState<{ [attributeId: string]: number }>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (attributeId: string, valueIndex: number) => {
    setSelectedOptions((prev) => ({ ...prev, [attributeId]: valueIndex }));
  };

  const handleAddToCart = async () => {
    const allSelected = options.every((opt) => selectedOptions[opt.attribute_id] !== undefined);
    if (!allSelected) {
      toast.error("Please select all options");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        sku,
        quantity: 1,
        isConfigurable: true,
        selectedOptions,
      };
      await axios.post("/api/magento/cart/add", payload);
      toast.success("Product added to cart!");
    } catch (error) {
      toast.error("Failed to add to cart.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6 mt-6">
      {options.map((option) => (
        <div key={option.attribute_id} className="space-y-2">
          <p className="text-sm font-semibold text-gray-400">{option.label}</p>
          <div className="flex flex-wrap gap-3">
            {option.values.map((value) => (
              <button
                key={value.value_index}
                onClick={() => handleChange(option.attribute_id, value.value_index)}
                className={`px-4 py-2 rounded-xl border transition-all text-sm font-medium
                  ${
                    selectedOptions[option.attribute_id] === value.value_index
                      ? "bg-blue-600 border-blue-500 text-white shadow-sm"
                      : "bg-[#1f1f21] text-gray-300 border-gray-700 hover:bg-[#2a2a2d]"
                  }`}
              >
                {value.label}
              </button>
            ))}
          </div>
        </div>
      ))}

      <Button
        variant="default"
        className="w-full md:w-auto mt-2 flex gap-2 items-center"
        onClick={handleAddToCart}
        disabled={loading}
      >
        {loading ? <AiOutlineLoading3Quarters className="animate-spin" /> : "Add to Cart"}
        <MdShoppingCartCheckout />
      </Button>
    </div>
  );
}
