//api/magento/auth/me

import axios from "axios";
import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";

export async function GET() {
    const MAGENTO_URI = process.env.MAGENTO_BASE_URI!;
    const token = (await cookies()).get('customer_token')?.value;
    console.log(token);
    if(!token) {
        return NextResponse.json({error: 'Not logged in', status: 401})
    }

try {
        const response = await axios.get(`${MAGENTO_URI}/rest/default/V1/customers/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        console.log("Customer info:", response.data);
        return NextResponse.json(response.data);
    } catch (error: any) {
        const msg = error.response?.data?.message || error.message;
        console.error("Magento error:", msg);
        return NextResponse.json({ error: msg, status: error.response?.status || 500 });
    }
}