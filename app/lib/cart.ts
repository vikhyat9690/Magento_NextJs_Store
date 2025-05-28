import axios from "axios";

interface AddToCart {
    sku: string,
    quantity?: number
}

export async function addToCart(sku: string, quantity: number = 1): Promise<AddToCart> {
    
    const res = await axios.post('/api/magento/cart/add', {sku, quantity});
    console.log(res.data);
    return res.data;
}

export async function getGuestCart() {
    const res = await axios.get('/api/magento/cart');
    return res.data;
}

export async function safeAddToCart(sku: string, quantity: number = 1): Promise<AddToCart> {
    getGuestCart();
    return addToCart(sku, quantity);
}