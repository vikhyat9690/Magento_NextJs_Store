import axios from "axios";

interface AddToCartPayload {
    sku: string,
    quantity?: number,
    parentSku?: string,
    selectedOptions?: {
        [attributeId: string]: number
    };
}

interface AddToCartResponse {
    sku: string,
    quantity: number
}

export async function addToCart({
    sku,
    quantity = 1,
    parentSku,
    selectedOptions,
}: AddToCartPayload): Promise<AddToCartResponse> {
    const payload:any = {
        sku,
        quantity
    }

    if(parentSku && selectedOptions) {
        payload.parentSku = parentSku;
        payload.selectedOptions = selectedOptions;
    }
    const res = await axios.post('/api/magento/cart/add', payload);
    return res.data;
}

export async function getGuestCart() {
    const res = await axios.get('/api/magento/cart');
    return res.data;
}

export async function safeAddToCart(payload: AddToCartPayload): Promise<AddToCartResponse> {
    console.log(payload);
    await getGuestCart();
    return addToCart(payload);
}

export async function getCartItems() {
    const res = await axios.get('/api/magento/cart/items');
    console.log(res.data);
    return res.data;
}