import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axios from "axios";

const SERVER_ADDRESS = process.env.NEXT_PUBLIC_XMTP_SERVER_ADDRESS || "http://localhost:3005";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { walletAddress } = body;

    if (!walletAddress) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    console.log(walletAddress);

    const response = await axios.post(`${SERVER_ADDRESS}/subscribe`, {
      address: walletAddress
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.status === 200) {
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json({ success: false }, { status: response.status });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  console.log("Method not allowed");
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
