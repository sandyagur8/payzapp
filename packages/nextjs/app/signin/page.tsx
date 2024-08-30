"use client";

import { useRouter } from "next/navigation";
import { createKintoSDK } from "kinto-web-sdk";

export default function SignIn() {
  const appAddress = process.env.NEXT_PUBLIC_KINTO_APP_ADDRESS;
  if (!appAddress) {
    throw new Error("NEXT_PUBLIC_KINTO_APP_ADDRESS is not defined");
  }
  const kintoSDK = createKintoSDK(appAddress);
  const router = useRouter();

  const handleClick = async () => {
    console.log("Button clicked");
    try {
      await kintoSDK.createNewWallet();
      const newAccountInfo = await kintoSDK.connect();
      console.log("Connected account info:", newAccountInfo);

      const encodedAccountInfo = encodeURIComponent(JSON.stringify(newAccountInfo.walletAddress));
      const url = `/wallet?accountInfo=${encodedAccountInfo}`;
      console.log("Redirecting to:", url);
      router.push(url);
    } catch (error) {
      console.error("Failed to connect:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
            onClick={handleClick}
          >
            Sign in using Kinto Wallet
          </button>
        </div>
      </main>
    </div>
  );
}
