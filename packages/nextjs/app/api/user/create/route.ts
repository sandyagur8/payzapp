import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, walletAddress, phoneNumber, isMerchant,name } = body;

  if (!email || !walletAddress || !phoneNumber) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .insert(
        { 
          email, 
          wallet_address: walletAddress, 
          phone_number: phoneNumber, 
          is_merchant: isMerchant ,
          name
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
