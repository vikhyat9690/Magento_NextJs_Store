// app/api/magento/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const MAGENTO_API = process.env.NEXT_PUBLIC_MAGENTO_API!;
  try {
    const body = await req.json();
    const magentoResponse = await axios.post(MAGENTO_API, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return NextResponse.json(magentoResponse.data);
  } catch (error: any) {
    console.error('Magento proxy error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
