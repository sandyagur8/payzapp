"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import MerchantWalletContent from "../../components/MerchantWalletContent";
import WalletContent from "../../components/WalletContent";
import { user_props } from "../lib/interfaces";
import Loading from "~~/components/loading_content";

function WalletComponent() {
  const [isMerchant, setIsMerchant] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [accountInfo, setAccountInfo] = useState<user_props | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const isMerchant = async (data: any): Promise<boolean> => {
      if (data.isMerchant) return data.isMerchant;
      else return false;
    };

    const checkUserType = async () => {
      setIsLoading(true);
      try {
        const encodedAccountInfo = searchParams.get("accountInfo");
        if (encodedAccountInfo) {
          try {
            const decodedAccountInfo = JSON.parse(decodeURIComponent(encodedAccountInfo));
            // console.log(decodedAccountInfo);
            const response = await fetch(`/api/user/get?walletAddress=${decodedAccountInfo}`);
            console.log({ response });

            if (!response.ok) {
              throw new Error("Failed to fetch user type");
            }

            const data = await response.json();
            setIsMerchant(await isMerchant(data));
            setAccountInfo(data);
          } catch (error) {
            console.error("Failed to parse account info or fetch user type:", error);
          }
        } else {
          console.error("No account info found in URL parameters");
        }
      } catch (error) {
        console.error("Error checking user type:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserType();
  }, [searchParams]);

  if (!accountInfo || isLoading) {
    return <div>Loading...</div>;
  }
  return isMerchant ? (
    <MerchantWalletContent wallet_connect={accountInfo} />
  ) : (
    <WalletContent wallet_connect={accountInfo} />
  );
}

export default function Wallet() {
  <Suspense fallback={<Loading />}>
    <WalletComponent />
  </Suspense>;
}
