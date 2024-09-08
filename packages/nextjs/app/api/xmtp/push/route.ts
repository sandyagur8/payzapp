import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabase';


export async function POST(request: NextRequest) {
  try {
    const {body} = await request.json()

    console.log(body)


    if (!body || typeof body !== 'object') {
      return NextResponse.json({ message: 'Invalid request body' }, { status: 400 })
    }
    // Insert the new transaction
    const { error } = await supabase
      .from('merchantData').upsert({
        "wallet_address":body.address,
        "broadcast_message": body.message,
        "broadcast_title":body.title
      },{
        onConflict: 'wallet_address',
        ignoreDuplicates: false
      }).select()
    if (error) {
      console.error('Error inserting broadcast message:', error)
      throw new Error('Failed to insert broadcast message')
    }


    return NextResponse.json({ 
      message: 'broadcast  added successfully',
    }, { status: 200 })

  } catch (error) {
    console.error('Error in update_transactions API:', error)

    if (error instanceof Error) {
      if (error.message.startsWith('Invalid')) {
        return NextResponse.json({ message: error.message }, { status: 400 })
      }
    }

    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
