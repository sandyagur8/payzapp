import { NextRequest, NextResponse } from "next/server";
import { kinto } from "../../../../lib/utils";
import { USDC_ABI } from "../../../../lib/utils";
import { Address, createPublicClient, http } from "viem";
import { formatUnits } from "viem";
import axios from "axios"
const USDCAddress = process.env.NEXT_PUBLIC_USDC_ADDRESS;
interface TokenItem {
    token: {
        address: string;
        circulating_market_cap: number | null;
        decimals: string;
        exchange_rate: number | null;
        holders: string;
        icon_url: string | null;
        name: string;
        symbol: string;
        total_supply: string;
        type: string;
        volume_24h: number | null;
    };
    token_id: string | null;
    token_instance: string | null;
    value: bigint;
}
async function getBalance(accountAddress: string) {
    // const url = `https://explorer.kinto.xyz/api/v2/addresses/${accountAddress}/tokens?type=ERC-20`

    const url =`https://explorer.kinto.xyz/api/v2/addresses/${accountAddress}/token-balances`

    const response = await axios.get(`https://explorer.kinto.xyz/api/v2/addresses/${accountAddress}/token-balances`, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Accept': 'application/json'
    }
    })
    
    if (!(response.status==200))
        return Error("Can't get balance")

    const data =  response.data
    console.log(data)

    for (const item of data) {
        if ((item.token.address).toLowerCase() == USDCAddress?.toLowerCase()) {
            return formatUnits(item.value, 18)
        }
    }

    return 0
}

export async function GET(request: NextRequest, { params }: { params: { address: string } }) {
  try {
    // const { searchParams } = new URL(request.url);
    const walletAddress = params.address;

    if (!walletAddress) {
      return NextResponse.json({ error: "Wallet address is required" }, { status: 400 });
    }

    if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
      return NextResponse.json({ error: "Invalid wallet address format" }, { status: 400 });
    }
    try{
        const balance = await getBalance(walletAddress);
        console.log(balance)
        return NextResponse.json({ balance }, { status: 200 });

    }catch(e){console.log(e)
        return NextResponse.json({ error: "Error fetching balance" }, { status: 500 });
    }
  } catch (error) {
    console.error("Error fetching balance:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
