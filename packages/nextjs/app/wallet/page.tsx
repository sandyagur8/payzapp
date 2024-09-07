"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import MerchantWalletContent from "../../components/MerchantWalletContent";
import WalletContent from "../../components/WalletContent";
import { user_props } from "../lib/interfaces";
import Loading from "~~/components/loading_content";
import axios from "axios"
function WalletComponent() {
  const [isMerchant, setIsMerchant] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [accountInfo, setAccountInfo] = useState<user_props | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const checkUserType = async () => {
      setIsLoading(true);
      try {
        const encodedAccountInfo = searchParams.get("accountInfo");
        if (encodedAccountInfo) {
          const decodedAccountInfo = JSON.parse(decodeURIComponent(encodedAccountInfo));
          console.log({decodedAccountInfo});
          const response = await axios.get(`/api/user/get?walletAddress=${decodedAccountInfo}`);
          console.log({ response });

          if (response.status!=200) {
            throw new Error("Failed to fetch user type");
          }

          const data = await response.data
          setIsMerchant(data.isMerchant);
          setAccountInfo(data);
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

  if (isLoading) {
    return <Loading />;
  }

  if (!accountInfo && !isLoading) {
    return <div>No account information available.</div>;
  }

  return (isMerchant&&accountInfo) ? (
    <MerchantWalletContent wallet_connect={accountInfo} />
  ) : (!isMerchant&&accountInfo) ?(
    <WalletContent wallet_connect={accountInfo} />
  ):(<> <div>No account information available.</div></>)
}

export default function Wallet() {
  return (
    <Suspense fallback={<Loading />}>
      <WalletComponent />
    </Suspense>
  );
}
