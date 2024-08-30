"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import OfflineTransactionInstructionsContent from "../../components/OfflineTransactionInstructionsContent";
import Loading from "~~/components/loading_content";

function OfflineTransactionInstructionsWithParams() {
  const searchParams = useSearchParams();
  const phoneNumber = searchParams.get("phoneNumber");
  const amount = searchParams.get("amount");

  if (!amount || !phoneNumber) throw new Error("Failed to get details");

  return <OfflineTransactionInstructionsContent amount={Number(amount)} phonenumber={String(phoneNumber)} />;
}

export default function OfflineTransactionInstructions() {
  return (
    <Suspense fallback={<Loading />}>
      <OfflineTransactionInstructionsWithParams />
    </Suspense>
  );
}
