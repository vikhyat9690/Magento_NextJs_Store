import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
    const MAGENTO_API = process.env.MAGENTO_BASE_URI!;
    const cookieStorage = await cookies();
    let cartId = cookieStorage.get('cart_id')?.value;
    if(!cartId) {
        const res = await axios.post(`${MAGENTO_API}/rest/V1/guest-carts`);
        cartId = res.data;
        const response  = NextResponse.json({ cartId });
        response.cookies.set('cart_id',cartId!, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24
        });
        console.log('cart_id:' + response.cookies.get('cart_id')?.value)
        return response;
    }
    return NextResponse.json({cartId});
}