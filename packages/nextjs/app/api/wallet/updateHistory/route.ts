import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabase';


// Define types
type Transaction = {
  from: string
  to: string
  amount: number
  created_at?: string
}





// Input validation functions
function validateAddress(address: unknown): string {
  if (typeof address !== 'string' || address.trim() === '') {
    throw new Error('Invalid address: must be a non-empty string')
  }
  return address.trim()
}

function validateAmount(amount: unknown): number {
  if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
    throw new Error('Invalid amount: must be a positive number')
  }
  return amount
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
  console.log(body)
    // Validate input
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ message: 'Invalid request body' }, { status: 400 })
    }

    const transaction: Transaction = {
      from: validateAddress(body.from),
      to: validateAddress(body.to),
      amount: validateAmount(body.amount),
      created_at: new Date().toISOString()
    }

    // Insert the new transaction
    const { data, error } = await supabase
      .from('transactions')
      .insert(transaction)
      .select()

    if (error) {
      console.error('Error inserting transaction:', error)
      throw new Error('Failed to insert transaction')
    }

    if (!data || data.length === 0) {
      throw new Error('No data returned after insertion')
    }

    return NextResponse.json({ 
      message: 'Transaction added successfully', 
      transaction: data[0] 
    }, { status: 201 })

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
