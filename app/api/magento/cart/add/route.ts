import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

export async function POST(req: NextRequest) {
    const {sku, quantity} = await req.json();
    const MAGENTO_API = process.env.MAGENTO_BASE_URI!;
    const cookieStorage = await cookies();
    const cartId = cookieStorage.get('cart_id')?.value;
    
    if(!cartId) {
        return NextResponse.json({error: 'No cart found for you!'}, {status: 400});
    }

    try {
        const res = await axios.post(`${MAGENTO_API}/rest/V1/guest-carts/${cartId}/items`, {
            cartItem: {
                quote_id: cartId,
                sku,
                qty: quantity
            }
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return NextResponse.json(res.data);
    } catch (error: any) {
        console.log(error.response?.data)
        return NextResponse.json({error: error.message}, {status: 500})
    }
}