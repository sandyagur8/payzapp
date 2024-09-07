import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { supabase } from '../../../lib/supabase';
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';
import { createWalletClient,http,parseEther} from 'viem';
import { baseSepolia } from 'viem/chains';
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

async function getFunded(address:string) {
  const privatekey=`0xae1c82de859407ab3d6f276ae4424b6230b1c2bef607a1e9d836619da064fea4`
  const account = privateKeyToAccount(privatekey)
  const client = createWalletClient({chain:baseSepolia,account,transport:http()});
  await client.sendTransaction({
    account,
    to: address,
    value: parseEther("0.007")
  })
  
}
export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log({body})
    console.log(body.body.email)
    console.log(body.body.walletAddress)
    console.log(body.body.phoneNumber)
    console.log(body.body.isMerchant)
    console.log(body.body.name)
  if (!body.body.email || !body.body.walletAddress || !body.body.phoneNumber) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const isExist=await userExist(body.body.email)
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
          email:body.body.email,
          wallet_address: body.body.walletAddress,
          phone_number: body.body.phoneNumber,
          is_merchant: body.body.isMerchant,
          name:body.body.name,
          EOA_privateKey: privatekey,
          EOA_walletaddress: address

        }
      )
      .select();

    if (error) throw error;
    await getFunded(address)
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
