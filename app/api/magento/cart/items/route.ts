import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    const  MAGENTO_API = process.env.MAGENTO_BASE_URI!;
    const cartId = (await cookies()).get('cart_id')?.value;

    if(!cartId) {
        return NextResponse.json({error: 'No cart found!'}, {status: 400});
    }

    try {
        const res = await axios.get(`${MAGENTO_API}/rest/V1/guest-carts/${cartId}/items`);
        console.log(res.data);
        return NextResponse.json(res.data);
    } catch (error: any) {
        console.log(error.response?.data);
        return NextResponse.json({error: error.response?.data}, {status: 500});
    }
}