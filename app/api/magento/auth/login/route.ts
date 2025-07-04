//api/magento/auth/login

import axios from "axios";
import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    const MAGENTO_URI = process.env.NEXT_PUBLIC_MAGENTO_API!;
    if(!MAGENTO_URI) {
        return NextResponse.json({error: 'Not a valid magento url', status: 400})
    }
    const param = await req.json();

    try {
        const res = await axios.post(MAGENTO_URI, param, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const token = res.data;

        if(!token) {
            return NextResponse.json({error: 'No token provided', status: 500})
        }

        // (await cookies()).set('customer_token', token, {
        //     httpOnly: true,
        //     path: '/',
        //     secure: true,
        //     sameSite: "lax"
        // })

        return NextResponse.json({success: true, token});
    } catch (error: any) {
        return NextResponse.json({error: error.resp?.data?.message || error.message, status: 401})
    }
}