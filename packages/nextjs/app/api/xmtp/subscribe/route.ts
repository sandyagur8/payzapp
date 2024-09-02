import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { supabase } from '../../../lib/supabase';
import { Client } from "@xmtp/xmtp-js";
import { Wallet } from 'ethers';


const getPrivateKey = async (address: string): Promise<string | null> => {
  const response = await supabase
    .from("users")
    .select("EOA_privateKey")
    .eq("wallet_address", address);

  if (response.error) {
    console.error(response.error);
    return null;
  }

  const data = response.data;
  if (data && data.length > 0) {
    console.log(data[0].EOA_privateKey)
    return data[0].EOA_privateKey;
  }

  return null;
};
export async function POST(request: NextRequest) {
  console.log("added")
  const body = await request.json();
  const {walletAddress } = body;

  if (!walletAddress) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  
  try {
    
    const PrivateKey = await getPrivateKey(walletAddress)
    if(!PrivateKey)
      return new Error
    const signer = new Wallet(PrivateKey) 
    try{const xmtp = await Client.create(signer, { env: "dev" });}catch(e){console.log(e)}
    const existingChats = await xmtp.conversations.list()
    for (const conversation of existingChats){
      if (conversation.peerAddress=="0x79C00806C60eF8efC2f70070Da3C9Eff356a3CF1")//merchant address
      conversation.send("subscribe")
    }
    

    return NextResponse.json("", { status: 200 });
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
