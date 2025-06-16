import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const cookieStorage = await cookies();
        cookieStorage.delete('cart_id');
        return NextResponse.json({ message: 'Log out successfull!.' }, {status: 200})
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}