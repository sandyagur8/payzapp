import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from './../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, walletAddress, phoneNumber, isMerchant } = req.body;

  if (!email || !walletAddress || !phoneNumber) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .upsert({ email, wallet_address: walletAddress, phone_number: phoneNumber, is_merchant: isMerchant }, 
        { onConflict: 'email' })
      .select();

    if (error) throw error;

    return res.status(200).json(data[0]);
  } catch (error) {
    console.error('Error creating/updating user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
