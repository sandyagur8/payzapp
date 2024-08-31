import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../lib/supabase';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userAddress = searchParams.get('userAddress');

  if (!userAddress) {
    return NextResponse.json({ error: 'User address is required' }, { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from('merchant_ratings')
      .select('merchant_address, merchant_name')
      .is('rating', null)
      .eq('user_address', userAddress);

    if (error) throw error;

    return NextResponse.json({ unratedMerchants: data });
  } catch (error) {
    console.error('Error fetching unrated merchants:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { userAddress, merchantAddress, rating } = body;

  if (!userAddress || !merchantAddress || !rating) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const {error } = await supabase
      .from('merchant_ratings')
      .update({ rating })
      .match({ user_address: userAddress, merchant_address: merchantAddress });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error submitting rating:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
