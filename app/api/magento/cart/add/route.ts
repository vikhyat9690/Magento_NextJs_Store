import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

export async function POST(req: NextRequest) {
    const {sku, quantity, selectedOptions} = await req.json();
    const MAGENTO_API = process.env.MAGENTO_BASE_URI!;
    const cookieStorage = await cookies();
    const cartId = cookieStorage.get('cart_id')?.value;
    
    
    if(!cartId) {
        return NextResponse.json({error: 'No cart found for you!'}, {status: 400});
    }
    console.log(cartId);
    const payload = selectedOptions ? {
        cartItem: {
            sku,
            qty: quantity,
            quote_id: cartId,
            product_option: {
                extension_attributes: {
                    configurable_item_options: Object.entries(selectedOptions).map(([attribute_id, value_index]) => ({
                        option_id: attribute_id,
                        option_value: value_index
                    }))
                }
            }
        }
    } : {
        cartItem: {
            sku,
            qty: quantity,
            quote_id: cartId
        }
    };
    console.log(payload);
    try {
        const res = await axios.post(`${MAGENTO_API}/rest/V1/guest-carts/${cartId}/items`, payload, {
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