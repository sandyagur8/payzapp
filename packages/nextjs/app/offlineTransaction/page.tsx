"use client";

import { useSearchParams } from "next/navigation";
import OfflineTransactionInstructionsContent from "../../components/OfflineTransactionInstructionsContent";

export default function OfflineTransactionInstructions() {
  const searchParams = useSearchParams();
  const phoneNumber = searchParams.get("phoneNumber");
  console.log({ searchParams });
  console.log({ phoneNumber });
  const amount = searchParams.get("amount");
  if (!amount && !phoneNumber) throw new Error("Failed to get details");

  return <OfflineTransactionInstructionsContent amount={Number(amount)} phonenumber={String(phoneNumber)} />;
}
