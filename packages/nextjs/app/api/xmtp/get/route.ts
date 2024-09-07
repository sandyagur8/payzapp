export const runtime = "edge";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabase } from "../../../lib/supabase";
import axios from "axios"

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get("walletAddress");
    const SERVER_ADDRESS = process.env.NEXT_PUBLIC_XMTP_SERVER_ADDRESS || "http://localhost:3005"
    if (!walletAddress) {
        return NextResponse.json({ error: "Wallet address is required" }, { status: 400 });
    }

    try {
        const url = `${SERVER_ADDRESS}/get?address=${walletAddress}`
        console.log(url)
        const response = await axios.get(url)
        if (response.status!=200){
            console.log(response)
            return NextResponse.json({ success: false }, { status: 400 })

        }

        const data = response.data
        console.log(data.messages)
        return NextResponse.json(
            {
                data: data.messages
            },
            { status: 200 },
        );
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST() {
    // Method not allowed
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
