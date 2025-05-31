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

//Add to cart
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

//Get a guest cart
export async function getGuestCart() {
    const res = await axios.get('/api/magento/cart');
    return res.data;
}

//Add to cart after checking
export async function safeAddToCart(payload: AddToCartPayload): Promise<AddToCartResponse> {
    await getGuestCart();
    return addToCart(payload);
}

//Get Products of Cart
export async function getCartItems() {
    const res = await axios.get('/api/magento/cart/items');
    return res.data;
}

//Update cart items
export async function updateCartItemQty(itemId: number, qty: number) {
  const res = await axios.put("/api/magento/cart/items/update", {
    itemId,
    qty,
  });
  return res.data;
}

//Remove from cart
export async function removeCartItem(itemId: number) {
  const res = await axios.delete(`/api/magento/cart/items/update?itemId=${itemId}`);
  return res.data;
}