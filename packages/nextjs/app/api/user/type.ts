import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from './../../lib/supabase';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, walletAddress, phoneNumber } = req.query;

  if (!email && !walletAddress && !phoneNumber) {
    return res.status(400).json({ error: 'At least one identifier is required' });
  }

  try {
    let query = supabase.from('users').select('is_merchant');

    if (email) query = query.eq('email', email);
    if (walletAddress) query = query.eq('wallet_address', walletAddress);
    if (phoneNumber) query = query.eq('phone_number', phoneNumber);

    const { data, error } = await query.single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'User not found' });
      }
      throw error;
    }

    return res.status(200).json({ isMerchant: data.is_merchant });
  } catch (error) {
    console.error('Error checking user type:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
