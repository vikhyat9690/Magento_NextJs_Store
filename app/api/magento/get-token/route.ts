import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const MAGENTO_GRAPHQL_URL = process.env.NEXT_PUBLIC_MAGENTO_API!;

    const response = await axios.post(
      MAGENTO_GRAPHQL_URL,
      {
        query: body.query,
        variables: body.variables,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Token Fetch Error:", error.response?.data || error.message);
    return NextResponse.json(
      { error: "Failed to fetch customer token." },
      { status: 500 }
    );
  }
}
