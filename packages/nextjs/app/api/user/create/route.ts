import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { supabase } from '../../../lib/supabase';
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';

async function userExist(email:string):Promise<boolean>{
  let query = supabase.from("users").select("*");

  if (email) query = query.eq("email", email);
  const { data, error } = await query.single();
  if (error)
    return false

  if(data.email==email)
    return true
  return false
  

}
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, walletAddress, phoneNumber, isMerchant, name } = body;

  if (!email || !walletAddress || !phoneNumber) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const isExist=await userExist(email)
  if(isExist){
    return NextResponse.json({ error: 'User already exist' }, { status: 400 });
  }

  const privatekey = generatePrivateKey()
  const signer = privateKeyToAccount(privatekey)
  const address = signer.address


  try {
    const { data, error } = await supabase
      .from('users')
      .insert(
        {
          email,
          wallet_address: walletAddress,
          phone_number: phoneNumber,
          is_merchant: isMerchant,
          name,
          EOA_privateKey: privatekey,
          EOA_walletaddress: address

        }
      )
      .select();

    if (error) throw error;

    return NextResponse.json(data[0], { status: 200 });
  } catch (error) {
    console.error('Error creating/updating user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  // Method not allowed
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
