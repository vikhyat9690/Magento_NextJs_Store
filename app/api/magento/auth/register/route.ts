// /api/magento/auth/register/route.ts

import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, firstname, lastname, password } = await req.json();
  const MAGENTO_URI = process.env.MAGENTO_BASE_URI!;

  try {
    const res = await axios.post(`${MAGENTO_URI}/rest/V1/customers`, {
      customer: {
        email,
        firstname,
        lastname,
      },
      password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return NextResponse.json({ success: true, customer: res.data });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.response?.data?.message || error.message,
      },
      { status: 400 }
    );
  }
}
