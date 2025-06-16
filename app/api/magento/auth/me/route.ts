// /api/magento/auth/me/route.ts

import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const MAGENTO_URI = process.env.NEXT_PUBLIC_MAGENTO_API!;
  const token = (await cookies()).get("customer_token")?.value;
  const body = await req.json();

//   if (!token) {
//     return NextResponse.json({ error: "Not logged in" }, { status: 401 });
//   }

  try {
    const response = await axios.post(
      MAGENTO_URI,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      }
    );
    console.log(response)
    return NextResponse.json(response.data);
  } catch (error: any) {
    const msg = error.response?.data?.message || error.message;
    console.error("Magento error:", msg);
    return NextResponse.json({ error: msg }, { status: error.response?.status || 500 });
  }
}
