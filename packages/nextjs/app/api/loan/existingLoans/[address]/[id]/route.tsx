import { NextRequest, NextResponse } from "next/server";
import { LOAN_ABI, kinto,Loan } from "../../../../../lib/utils";
import { Address, createPublicClient, http ,formatUnits} from "viem";

// import { formatUnits } from "viem";
interface Resp{
  amount: bigint,
  remaining_tenures: number,
  total_tenures: number,
  tenure_size: bigint,
  loan_taken_time: bigint,
  next_tenure_due: bigint,
  last_day_of_repayment: bigint
}

function unixTimeToDateString(unixTime: number): string {
  const date = new Date(unixTime * (unixTime.toString().length === 10 ? 1000 : 1));
  
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'UTC'
  });
}

const LoanAddres = process.env.NEXT_PUBLIC_LOAN_ADDRESS;

async function getLoan(accountAddress: string, id: number) {
  const client = createPublicClient({
    chain: kinto,
    transport: http(),
  });
  const data = await client.readContract({
    address: LoanAddres as Address,
    abi: LOAN_ABI,
    functionName: "get_loan_by_id",
    args: [accountAddress, id]
  })as Resp
  console.log((data))
  if (!data ) {
    return { error: "Loan not found" };
  }
  return {
    id:0,
    amount:Number(formatUnits(BigInt(data.amount),18)),
    remainingAmount:Number(formatUnits(BigInt(data.tenure_size),18))*data.remaining_tenures,
    nextTenureDate:unixTimeToDateString(Number(data.next_tenure_due)),
    remainingTenures:Number(data.remaining_tenures),
    tenureAmount:Number(formatUnits(BigInt(data.tenure_size),18))
  };
}
/**
{
  "data": {
    "id": "0",
    "amount": 0,
    "remainingAmount": 0,
    "nextTenureDate": "0",
    "remainingTenures": 0,
    "tenureAmount": 0
  }
}
 */

export async function GET(request: NextRequest, { params }: { params: { address: string; id: string } }) {
  try {
    const walletAddress = params.address;
    const id = Number(params.id);

    if (!walletAddress) {
      return NextResponse.json({ error: "Wallet address is required" }, { status: 400 ,headers: { 'Cache-Control': 'no-store, max-age=0' }});
    }

    if (isNaN(id) || id < 0) {
      return NextResponse.json({ error: "Invalid number of loans" }, { status: 400,headers: { 'Cache-Control': 'no-store, max-age=0' } });
    }

    // Basic validation for wallet address format
    if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
      return NextResponse.json({ error: "Invalid wallet address format" }, { status: 400,headers: { 'Cache-Control': 'no-store, max-age=0' } });
    }

    try {
      const loan = await getLoan(walletAddress, id);
      console.log(loan);
      return NextResponse.json({ loan }, { status: 200 ,headers: { 'Cache-Control': 'no-store, max-age=0' }});
    } catch (e) {
      const responseData : Loan = {
        id:"0",amount:0,remainingAmount:0, nextTenureDate:"0", remainingTenures:0, tenureAmount:0
      }
      return NextResponse.json({ data:responseData}, { status: 500 ,headers: { 'Cache-Control': 'no-store, max-age=0' }});
    }
  } catch (error) {
    console.error("Error fetching balance:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 ,headers: { 'Cache-Control': 'no-store, max-age=0' }});
  }
}
