'use client'

import { useState, useEffect } from 'react';
import WalletContent from '../../components/WalletContent';
import MerchantWalletContent from '../../components/MerchantWalletContent';
import { useSearchParams } from 'next/navigation';
import { KintoAccountInfo } from 'kinto-web-sdk';


export default function Wallet() {
  const [isMerchant, setIsMerchant] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [accountInfo, setAccountInfo] = useState<KintoAccountInfo >();
  const searchParams = useSearchParams();
  
  useEffect(() => {  
    const isMerchant=async(data:any):Promise<boolean>=>{
      if (data.isMerchant)
        return data.isMerchant
      else return false
    }
   
    const checkUserType = async () => {
      setIsLoading(true)
      try {
        const encodedAccountInfo = searchParams.get('accountInfo');
        if (encodedAccountInfo) {
          try {
            const decodedAccountInfo = JSON.parse(decodeURIComponent(encodedAccountInfo));
            setAccountInfo(decodedAccountInfo);
            console.log(decodedAccountInfo);
            const response = await fetch(`/api/user/type?walletAddress=${decodedAccountInfo}`);
            console.log({response})
    
            if (!response.ok) {
              throw new Error('Failed to fetch user type');
            }
    
            const data = await response.json();
            setIsMerchant(await isMerchant(data));
          } catch (error) {
            console.error('Failed to parse account info or fetch user type:', error);
          }
        } else {
          console.error('No account info found in URL parameters');
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
  return isMerchant ? <MerchantWalletContent /> : <WalletContent />;
}
