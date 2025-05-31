import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

const MAGENTO_API = process.env.MAGENTO_BASE_URI!;

export async function PUT(req: NextRequest) {
  const { itemId, qty } = await req.json();
  const cartId = (await cookies()).get("cart_id")?.value;

  if (!cartId) {
    return NextResponse.json({ error: "No cart found." }, { status: 400 });
  }

  try {
    const res = await axios.put(
      `${MAGENTO_API}/rest/V1/guest-carts/${cartId}/items/${itemId}`,
      {
        cartItem: {
          item_id: itemId,
          quote_id: cartId,
          qty,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return NextResponse.json(res.data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const cartId = (await cookies()).get("cart_id")?.value;
  const { searchParams } = new URL(req.url);
  const itemId = searchParams.get("itemId");

  if (!cartId || !itemId) {
    return NextResponse.json({ error: "Missing cart or item ID." }, { status: 400 });
  }

  try {
    const res = await axios.delete(
      `${MAGENTO_API}/rest/V1/guest-carts/${cartId}/items/${itemId}`
    );
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
