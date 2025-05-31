'use client';

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdShoppingCartCheckout } from "react-icons/md";

interface SimpleProduct {
    sku: string,
    quantity?: number
}

export default function AddToCartSimpleBtn({sku, quantity}: SimpleProduct) {
    const [loading, setLoading] = useState(false);
    console.log({sku, quantity})
    const handleSubmit = async () => {
        setLoading(true);
        if(!sku || !quantity) {
            toast.error('Not enough details');
        }
        const payload = {
            sku,
            quantity
        }
        try {
            const res = await axios.post('/api/magento/cart/add', payload);
            if(!res.data) {
                toast.error('Error in adding to your cart')
            }
            toast.success('Product added successfully');
        } catch (error) {
            console.log(error);
            toast.error('Error in adding product: ' + error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <Button
            className="hover:border hover:border-white"
            onClick={handleSubmit}
            disabled={loading}
        >
            {loading ? <AiOutlineLoading3Quarters className="animate-spin" /> : 'Add to Cart'}
            <MdShoppingCartCheckout/>
        </Button>
    );
}