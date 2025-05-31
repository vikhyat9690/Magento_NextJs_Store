// /app/api/magento/cart/route.ts

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  const cookieStore = await cookies();
  const MAGENTO_API = process.env.MAGENTO_BASE_URI!;
  let cartId = cookieStore.get("cart_id")?.value;
if (!cartId) {
  try {
    // Create new guest cart
    const res = await axios.post(`${MAGENTO_API}/rest/V1/guest-carts`, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(res.data);
    cartId = res.data as string;

    if (!cartId) throw new Error("Failed to retrieve cart ID");

    // Set cart_id cookie
    const response = NextResponse.json({ cart_id: cartId });
    response.cookies.set("cart_id", cartId, {
      path: "/",
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


  // Return existing cart_id
  return NextResponse.json({ cart_id: cartId });
}
