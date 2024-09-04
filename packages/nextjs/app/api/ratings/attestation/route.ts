// const { SignProtocolClient, SpMode, EvmChains } = require("@ethsign/sp-sdk");
// const { privateKeyToAccount } = require("viem/accounts"); 

// const privateKey = "0x...";
// const client = new SignProtocolClient(SpMode.OnChain, {
//   chain: EvmChains.baseSepolia,
//   account: privateKeyToAccount(privateKey), // Optional, depending on environment
// });





import { NextRequest, NextResponse } from 'next/server';
import { SignProtocolClient, SpMode, EvmChains } from "@ethsign/sp-sdk";
import { privateKeyToAccount } from "viem/accounts";



// const { privateKeyToAccount } = require("viem/accounts");
const privateKey = "0xe50a8044caa2310f92ee21fd616836f9bf023e384b8ac950e9bd29a676b02b82"as `0x${string}` ;
const account = privateKeyToAccount(privateKey)
if (!account)
  throw new Error
//@ts-ignore
const client = new SignProtocolClient(SpMode.OnChain, {
  chain: EvmChains.baseSepolia,
  account: account
});
 




// async function createSchema(
//   schema: Schema,
//   options?: { getTxHash?: (txHash: `0x${string}`) => void }
// ): Promise<SchemaResult>;

// async function createAttestation(
//   attestation: Attestation,
//   options?: {
//     delegationSignature?: string;
//     getTxHash?: (txHash: `0x${string}`) => void;
//   }
// ): Promise<AttestationResult>;


export async function POST(request: NextRequest) {
  const body = await request.json();
  const { signerName, signerAddress, description } = body;

  if (!signerName || !signerAddress || !description) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    // Create schema
    const { error: schemaError, schemaUID} = await createSchema(signerName);
    if (schemaError || !schemaUID) throw schemaError || new Error('Schema UID is undefined');

    // Create attestation
    const { error: attestationError, result } = await createAttestation(schemaUID, description, signerAddress);
    if (attestationError) throw attestationError;

    return NextResponse.json({ success: true, schemaUID, attestationResult: result });
  } catch (error) {
    console.error('Error in attestation process:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function createSchema(name: string) {
  try {
    const res = await client.createSchema({
      name: name,
      data: [
        { name: "Description", type: "string" },
        { name: "signer", type: "address" },
      ],
    });
    return { schemaUID: res.schemaId };
  } catch (error) {
    return { error };
  }
}

async function createAttestation(schemaUID: string, description: string, signer: string) {
  try {
    const result = await client.createAttestation({
      schemaId: schemaUID,
      data: {
        Description: description,
        signer: signer
      },
      indexingValue: signer.toLowerCase()
    });
    return { result };
  } catch (error) {
    return { error };
  }
}






// async function createNotaryAttestation(Description: string, signer: string, schemaId:string) {
//     const result = await client.createAttestation({
//       schemaId: schemaId,
//       data: {
//         Description,
//         signer
//       },
//       indexingValue: signer.toLowerCase()
//     });
//     console.log(result)
//     console.log("attestation complete")

//   }


// async function attest(Name:string, signer: string,Description: string){
//     const res = await client.createSchema({
//         name: Name ,
//         data: [
//           { name: "Description", type: "string" },
//           { name: "signer", type: "address" },
//         ],
//       });
//     console.log(res)
//     const id= res.attestationId
//     await  createNotaryAttestation(Description, signer,id)
// }