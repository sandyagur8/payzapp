export const runtime = "edge";
import { NextResponse } from "next/server";
import axios from "axios"

export async function GET() {
    const SERVER_ADDRESS = process.env.NEXT_PUBLIC_XMTP_SERVER_ADDRESS || "http://localhost:3005"
    const ADMIN_ADDRESS = "0xdF79A13d5d6CCcA1D1a0e67Ecf1d1fB17658e80A"

    try {
        const url = `${SERVER_ADDRESS}/broadcast`
        console.log(url)
        const response = await axios.post(url,{address:ADMIN_ADDRESS})
        if (response.status!=200){
            console.log(response)
            return NextResponse.json({ success: false }, { status: 400 })

        }

        const data = await response.data
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
