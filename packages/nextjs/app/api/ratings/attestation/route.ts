import { NextRequest, NextResponse } from "next/server";
import { EvmChains, SignProtocolClient, SpMode, IndexService } from "@ethsign/sp-sdk";
import { privateKeyToAccount } from "viem/accounts";
import { decodeAbiParameters } from "viem";
import { AttestationInfo } from "@ethsign/sp-sdk/dist/types/indexService";



// async function getEOA(merchant_address: string) {
//   const { data, error } = await supabase.from("users").select("EOA_privateKey").eq("wallet_address", merchant_address)
//   if (error) {
//     console.log(error)
//     return null
//   }
//   console.log(data)

//   return data[0].EOA_privateKey
// }

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { signerAddress, description, merchantaddress, rating } = body;
  console.log(signerAddress)
  console.log(description)
  console.log(merchantaddress)
  console.log(rating)

  if (!signerAddress || !description || !merchantaddress || !rating) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    // Create attestation
    const { error: attestationError, result } = await createAttestation(
      "0x19f",
      description,
      signerAddress,
      merchantaddress,
      rating);
    if (attestationError) throw attestationError;

    return NextResponse.json({ success: true, attestationResult: result });
  } catch (error) {
    console.error("Error in attestation process:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }


}

async function createAttestation(
  schemaUID: string,
  description: string,
  signer: string,
  merchant: string,
  rating: number) {
  try {
    // const EOA = await getEOA(merchant)
    // console.log(EOA)
    const account = privateKeyToAccount("0xae1c82de859407ab3d6f276ae4424b6230b1c2bef607a1e9d836619da064fea4");
    if (!account) throw new Error();
    //@ts-ignore
    const client = new SignProtocolClient(SpMode.OnChain, {
      chain: EvmChains.baseSepolia,
      account: account,
    });

    const result = await client.createAttestation({
      schemaId: schemaUID,
      data: {
        description: description,
        signer: signer,
        merchant: merchant,
        rating: rating,
      },
      indexingValue: merchant.toLowerCase(),
    });
    return { result };
  } catch (error) {
    return { error };
  }
}

const indexService = new IndexService("testnet");

async function att(schemaId: string, attester: string, page: number, mode: string, indexingValue: string, id: string,) {
  console.log("enter")
  try {
    const result = await indexService.queryAttestationList({
      id: id,
      schemaId: schemaId,
      attester: attester,
      page: page,
      mode: "onchain",
      indexingValue: indexingValue.toLowerCase(),
    })
    return { result };
  } catch (error) {
    return { error };
  }
}

// { "signerName":"Payzapp",
//   "signerAddress":"0xD65dEdf3f6DDC43d6CF1064bdB894aa744EeD2e7",
//   "description":"good",
//   "merchantaddress":"0xD65dEdf3f6DDC43d6CF1064bdB894aa744EeD2e7",
//   "rating": "7"
// }


export async function GET(request: NextRequest) {
  // Extract query parameters
  const { searchParams } = new URL(request.url);

  const schemaId = searchParams.get('schemaId') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const attester = searchParams.get('attester') || '';
  const mode = searchParams.get('mode') || '';
  const indexingValue = searchParams.get('address') || '';
  const id = searchParams.get('id') || '';

  try {
    // Query attestations
    // const EOA = await getEOA(indexingValue)
    // console.log(EOA)
    // const account = privateKeyToAccount(EOA)
    // console.log(account.address)
    const { result, error: queryError } = await att(schemaId, attester, page, mode, indexingValue, id);


    if (queryError) throw queryError;
    console.log(result?.rows)
    const output = result?.rows
    const reviews = await decodeAttestations(output)
    return NextResponse.json({ success: true, reviews });
  } catch (error) {
    console.error("Error in querying attestations:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


// async function decodeAttestations(attestations: AttestationInfo[] | undefined): Promise<{
//   decodedData: any[];
//   signers: string[];
//   merchants: string[];
//   ratings: number[];
// }> {
//   if (!attestations) return {
//     decodedData: [],
//     signers: [],
//     merchants: [],
//     ratings: []
//   };

//   const decodedData: any[] = [];
//   const signers: string[] = [];
//   const merchants: string[] = [];
//   const ratings: number[] = [];

//   for (const att of attestations) {
//     if (!att.data) continue;

//     let parsedData: any;
//     let signer: string;
//     let merchant: string;
//     let rating: number;

//     if (att.mode === "onchain") {
//       try {
//         const data = decodeAbiParameters(
//           [
//             { name: 'description', type: 'string' },
//             { name: 'signer', type: 'address' },
//             { name: 'merchant', type: 'address' },
//             { name: 'rating', type: 'uint256' },
//           ],
//           att.data as `0x${string}`
//         );
//         parsedData = data[0];
//         signer = data[1];
//         merchant = data[2];
//         rating = parseInt(data[3].toString());
//       } catch (error) {
//         try {
//           const dataBuffer = Buffer.from(att.data, "hex");
//           const data = decodeAbiParameters(
//             att.dataLocation === "onchain" ? att.schema.data : [{ type: "string" }],
//             dataBuffer
//           );
//           const obj: any = {};
//           data.forEach((item: any, i: number) => {
//             obj[att.schema.data[i].name] = item;
//           });
//           parsedData = obj;
//           signer = obj.signer;
//           merchant = obj.merchant;
//           rating = parseInt(obj.rating.toString());
//         } catch (error) {
//           continue;
//         }
//       }
//     } else {
//       try {
//         parsedData = JSON.parse(att.data);
//         signer = parsedData.signer;
//         merchant = parsedData.merchant;
//         rating = parseInt(parsedData.rating.toString());
//       } catch (error) {
//         continue;
//       }
//     }

//     if (parsedData) {
//       decodedData.push(parsedData);
//       signers.push(signer);
//       merchants.push(merchant);
//       ratings.push(rating);
//     }
//   }

//   return {
//     decodedData,
//     signers,
//     merchants,
//     ratings
//   };
// }

async function decodeAttestations(attestations: AttestationInfo[] | undefined): Promise<any[]> {
  if (!attestations) return [];

  const result: any[] = [];
  let count = 0;
  for (const att of attestations) {
    count += 1
    if (!att.data) continue;

    let parsedData: any;
    let signer: string;
    // let merchant: string;
    let rating: number;

    if (att.mode === "onchain") {
      try {
        const data = decodeAbiParameters(
          [
            { name: 'description', type: 'string' },
            { name: 'signer', type: 'address' },
            { name: 'merchant', type: 'address' },
            { name: 'rating', type: 'uint256' },
          ],
          att.data as `0x${string}`
        );
        parsedData = data[0];
        signer = data[1];
        // merchant = data[2];
        rating = parseInt(data[3].toString());
      } catch (error) {
        try {
          const data = decodeAbiParameters(
            att.dataLocation === "onchain" ? att.schema.data : [{ type: "string" }],
            att.data as `0x${string}`
          );
          const obj: any = {};
          data.forEach((item: any, i: number) => {
            obj[att.schema.data[i].name] = item;
          });
          parsedData = obj;
          signer = obj.signer;
          // merchant = obj.merchant;
          rating = parseInt(obj.rating.toString());
        } catch (error) {
          continue;
        }
      }
    } else {
      try {
        parsedData = JSON.parse(att.data);
        signer = parsedData.signer;
        rating = parseInt(parsedData.rating.toString());
      } catch (error) {
        continue;
      }
    }

    if (parsedData) {
      result.push({
        id: count,
        review: parsedData,
        signer,
        rating
      });
    }
  }
  console.log(result)
  return result;
}