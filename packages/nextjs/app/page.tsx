"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    title: "Offline Payment",
    description:
      "Sent Crypto to your friends and merchants without internet using phone number instead of wallet address. Each user will be having a KYC ed Account abstracted wallet",
    image: "https://i.postimg.cc/629rHnVF/offline.png",
  },
  {
    title: "Dedicated payment alert system for merchants",
    description: "We have a custom designed hardware which will give audio alerts to merchants on every transactions.",
    image: "https://i.postimg.cc/t1HCWHF4/alerts.png",
  },
  {
    title: "EMI loans at small interest",
    description:
      "Normal users can now take low interest no collateral loans and repay them as monthly tenure. The kinto network KYC ID will act as a the proof of humanhood, so we can be sure that the user is real.And if the user commits some fraud he would be blacklisted from payzapp",
    image: "https://i.postimg.cc/pycfZ9m1/EMI.png",
  },
  {
    title: "Dedicated Broadcast channel for merchants using XMTP",
    description: "Merchants can push offers running on their shop to subscribed loyal users.",
    image: "https://i.postimg.cc/RJhcmmDR/xmtp-broadcast.png",
  },
  {
    title: "Users review attestation using sign protocol",
    description: "Users can give reviews to merchants. And merchants can see these review on their dashboard. ",
    image: "https://i.postimg.cc/ftBx1yBy/sign-review.png",
  },
  {
    title: "Payzapp is payments redefined",
    description:
      "Payzapp belives in 'crypto as payment' narrative. Banking should be available to each and everyone. We aim to become the end to end merchant onboarding platform for Kinto blockchain",
    image: "https://i.postimg.cc/CR8xRKB2/kinto-payment.png",
  },
];

export default function LandingPage() {
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeature(prev => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);
  //#001f3d
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#001f3d] text-[#f2d16a]">
      {/* <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-500 to-purple-600 text-white"> */}
      <main className="container mx-auto px-4 py-8 flex-grow flex flex-col justify-center">
        <div className="text-center mb-12">
          {/* <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full mx-auto mb-8 justify-center "> */}
          <Image
            src="https://i.postimg.cc/PPZzS3bC/Designer.png"
            alt="PayZapp Logo"
            width={200}
            height={200}
            className="mx-auto rounded-full"
          />
          {/* </div> */}
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">PayZapp</h1>
          <p className="text-lg sm:text-xl mb-8 max-w-md mx-auto">
            Seamless digital payments and financial services at your fingertips. PayZapp has been built with the power
            of account abstraction and kinto blockchain network.
          </p>
          <Link
            href="/getstarted"
            className="bg-white text-[#001f3d] px-6 py-2 sm:px-8 sm:py-3 rounded-full font-semibold text-base sm:text-lg hover:bg-[#f2d16a] transition duration-300 "
          >
            Get Started
          </Link>
        </div>

        <div className="max-w-4xl mx-auto bg-white bg-opacity-10 rounded-lg p-4 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center">

            {/* <div className="w-full sm:w-1/3 aspect-square bg-white rounded-lg mb-4 sm:mb-0 sm:mr-8 justify-center align-middle">
            <Image
              src={features[currentFeature].image}
              alt={features[currentFeature].title}
              width={500}
              height={500}
              className="rounded-lg mr-8 flex-shrink-0"
            /> </div> */}
            <div className="sm:w-2/3 ">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4 justify-center">{features[currentFeature].title}</h2>
              <p className="text-base sm:text-lg justify-center">{features[currentFeature].description}</p>
            </div>
          </div>
          <div className="flex justify-center mt-4 sm:mt-6">
            {features.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full mx-1 ${
                  index === currentFeature ? "bg-white" : "bg-gray-400"
                }`}
                onClick={() => setCurrentFeature(index)}
              ></button>
            ))}
          </div>
        </div>
      </main>

      <footer className="text-center py-4 text-xs sm:text-sm opacity-75">© 2023 PayZapp. All rights reserved.</footer>
    </div>
  );
}
