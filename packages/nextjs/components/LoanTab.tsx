import { useEffect, useState } from "react";
import axios from "axios";
import { encodeFunctionData } from "viem";
import { Loan } from "~~/app/lib/utils";
import { LOAN_ABI, kintoSDK } from "~~/app/lib/utils";

interface LoanTabProps {
  walletAddress: string;
}

const LOAN_ADDRESS = process.env.NEXT_PUBLIC_LOAN_ADDRESS as `0x${string}`;
if (!LOAN_ADDRESS) throw new Error("LOAN_ADDRESS not set");
const LoanTab: React.FC<LoanTabProps> = ({ walletAddress }) => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLoans = async () => {
      setIsLoading(true);
      try {
        const activeLoans: Loan[] = [];
        const response = await axios.get(`/api/loan/existingLoans/${walletAddress}/0`, {
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
            Accept: "application/json",
          },
        }); //loan id hardcoded as 0
        if (response.status != 200) throw new Error("Failed to fetch loans");
        const data = await response.data;
        console.log(data.loan);
        activeLoans.push(data.loan);
        console.log({ activeLoans });
        setLoans(activeLoans);
      } catch (error) {
        setLoans([]);
        console.error("Error fetching loans:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLoans();
  }, [walletAddress]);

  const handleRepay = async (loanId: string) => {
    await kintoSDK.createNewWallet();
    const accountInfo = await kintoSDK.connect();
    if (!accountInfo) throw new Error("No account");
    const data = encodeFunctionData({
      abi: LOAN_ABI,
      functionName: "repay_tenure",
      args: [loanId],
    });
    console.log({data})
   try{ await kintoSDK.sendTransaction([{ to: LOAN_ADDRESS, data, value: BigInt(0) }]);}catch(e){console.log(e)}
    console.log("Repaying loan:", loanId);
  };

  return !isLoading && loans.length > 0 ? (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Active Loans</h2>
      {loans.length > 0 ? (
        <ul>
          {loans.map(loan => (
            <li key={loan.id} className="border-b py-4 last:border-b-0">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Loan Amount: ${loan.amount}</span>
                <button
                  onClick={() => handleRepay(loan.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Repay
                </button>
              </div>
              <p>Remaining Amount: ${loan.remainingAmount}</p>
              <p>Next Tenure Date: {new Date(loan.nextTenureDate).toLocaleDateString()}</p>
              <p>Remaining Tenures: {loan.remainingTenures}</p>
              <p>Tenure Amount: ${loan.tenureAmount}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No active loans.</p>
      )}
    </div>
  ) : !isLoading && loans.length == 0 ? (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Active Loans</h2>
      <p>No active loans.</p>
    </div>
  ) : (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Loading...</h2>
    </div>
  );
};

export default LoanTab;
