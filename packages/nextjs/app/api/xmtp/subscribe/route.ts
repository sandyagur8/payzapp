import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { supabase } from '../../../lib/supabase';
import { Client } from "@xmtp/xmtp-js";
import { Wallet } from 'ethers';


const SERVER_ADDRESS =process.env.NEXT_PUBLIC_XMTP_SERVER_ADDRESS || "http://localhost:3005"

export async function POST(request: NextRequest) {
  const body = await request.json();
  const {walletAddress } = body;

  if (!walletAddress) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  
  try {
    const body={address:walletAddress}
    const response = await fetch(`${SERVER_ADDRESS}/subscribe`,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(body)
    })
    if (!response.ok)
      return NextResponse.json({success:false}, { status: 200 });
    else 
    
    return NextResponse.json({success:true}, { status: 200 });
  } catch (error) {
    console.error('Error creating/updating user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  // Method not allowed
  console.log("method not allowed")
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
