export const runtime = "edge";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export async function GET(request: NextRequest) {
    const SERVER_ADDRESS = process.env.NEXT_PUBLIC_XMTP_SERVER_ADDRESS || "http://localhost:3005"
    const ADMIN_ADDRESS = "0xdF79A13d5d6CCcA1D1a0e67Ecf1d1fB17658e80A"

    try {
        const url = `${SERVER_ADDRESS}/broadcast?address=${ADMIN_ADDRESS}`
        console.log(url)
        const response = await fetch(url)
        if (!response.ok){
            console.log(response)
            return NextResponse.json({ success: false }, { status: 400 })

        }

        const data = await response.json()
        console.log(data)
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
