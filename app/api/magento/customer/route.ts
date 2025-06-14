import { NextResponse } from "next/server";
import client from "@/app/lib/apollo-client";
import { GET_CUSTOMER_INFO } from "../../graphql/queries/getCustomerInfo";

export async function GET() {
    try {
        const { data } = await client.query({
            query: GET_CUSTOMER_INFO,
            fetchPolicy: "no-cache"
        })
        return NextResponse.json({customer: data.getCustomerInfo}, {status: 200})
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 500})
    }
}