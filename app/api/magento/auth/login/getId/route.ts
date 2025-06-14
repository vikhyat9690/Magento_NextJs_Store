// /api/magento/auth/login/getId/route.ts

import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const MAGENTO_URI = process.env.NEXT_PUBLIC_MAGENTO_API!;
  const body = await req.json();

  try {
    const response = await axios.post(
      MAGENTO_URI,
      body,
      {
        headers: {
          "Content-Type": "application/json"
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    const msg = error.response?.data?.message || error.message;
    console.error("Magento error:", msg);
    return NextResponse.json({ error: msg }, { status: error.response?.status || 500 });
  }
}
