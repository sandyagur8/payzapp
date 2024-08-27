'use client'

import { useState, useEffect } from 'react';
import WalletContent from '../../components/WalletContent';
import MerchantWalletContent from '../../components/MerchantWalletContent';

export default function Wallet() {
  const [isMerchant, setIsMerchant] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating an API call to check if the user is a merchant
    const checkUserType = async () => {
      try {
        // Replace this with your actual API call
        const response: boolean = await new Promise((resolve) => 
          setTimeout(() => resolve(Math.random() > 0.5), 1000)
        );
        setIsMerchant(response);
      } catch (error) {
        console.error("Error checking user type:", error);
        // Handle the error appropriately
      } finally {
        setIsLoading(false);
      }
    };

    checkUserType();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isMerchant ? <MerchantWalletContent /> : <WalletContent />;
}
