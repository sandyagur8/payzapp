import { NextRequest, NextResponse } from "next/server";
import { EvmChains, SignProtocolClient, SpMode } from "@ethsign/sp-sdk";
import { privateKeyToAccount } from "viem/accounts";

// const { privateKeyToAccount } = require("viem/accounts");
const privateKey = "0xe50a8044caa2310f92ee21fd616836f9bf023e384b8ac950e9bd29a676b02b82" as `0x${string}`;
const account = privateKeyToAccount(privateKey);
if (!account) throw new Error();
//@ts-ignore
const client = new SignProtocolClient(SpMode.OnChain, {
  chain: EvmChains.baseSepolia,
  account: account,
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
  const { signerName, signerAddress, description, merchantaddress, rating } = body;

  if (!signerName || !signerAddress || !description || !merchantaddress || !rating) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    // Create attestation
    const { error: attestationError, result } = await createAttestation(
      "0x19f",
      description,
      signerAddress,
      merchantaddress,
      rating,
    );
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
  rating: number,
) {
  try {
    const result = await client.createAttestation({
      schemaId: schemaUID,
      data: {
        description: description,
        signer: signer,
        merchant: merchant,
        rating: rating,
      },
      indexingValue: signer.toLowerCase(),
    });
    return { result };
  } catch (error) {
    return { error };
  }
}
