import { useState, useEffect } from 'react';
import { kintoSDK,LOAN_ABI } from '~~/app/lib/utils';
import { encodeFunctionData, parseEther } from "viem";
import axios from "axios"
const LOAN_ADDRESS=process.env.NEXT_PUBLIC_LOAN_ADDRESS as `0x${string}`
if(!LOAN_ADDRESS) throw new Error("LOAN_ADDRESS not set")
interface LoanModalProps {
  walletAddress: string;
  onClose: () => void;
}

const LoanModal: React.FC<LoanModalProps> = ({ walletAddress, onClose }) => {
  const [availableCredit, setAvailableCredit] = useState<number>(0);
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [tenure, setTenure] = useState<string>('');
  const [isLoading,setIsLoading]=useState<boolean>(true)

  useEffect(() => {
    const fetchAvailableCredit = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/loan/availableCredit/${walletAddress}`);
        if (response.status!=200) throw new Error('Failed to fetch available credit');
        const data = await response.data;
        setAvailableCredit((data.credit));
      } catch (error) {
        console.error('Error fetching available credit:', error);
      }finally{
        setIsLoading(false) 
      }
    };

    fetchAvailableCredit();
  }, [walletAddress]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implement loan request logic here
    await kintoSDK.createNewWallet()
    const accountInfo=await kintoSDK.connect()
    if(!accountInfo) throw new Error("No account")
      const data = encodeFunctionData({
        abi: LOAN_ABI,
        functionName: "dispatchLoan",
        args: [ parseEther(loanAmount),tenure]
      });
      console.log({data})
      try{

        await kintoSDK.sendTransaction([{to:LOAN_ADDRESS,data,value:BigInt(0)}])
      }catch(E){console.log(E)}

    console.log('Loan requested:', { loanAmount, tenure });
    setTimeout(()=>{
      console.log("Loan Done")
    },5000)
    // Close the modal after submission
    onClose();
  };

  return !isLoading? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Get a Loan</h2>
        <p className="mb-4">Available Credit: ${availableCredit}</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="loanAmount" className="block mb-2">Loan Amount</label>
            <input
              type="number"
              id="loanAmount"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tenure" className="block mb-2">Tenure (months)</label>
            <input
              type="number"
              id="tenure"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Get Loan
          </button>
        </form>
        <button
          onClick={onClose}
          className="w-full mt-4 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  ):(

    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg max-w-md w-full">
      <h2 className="text-2xl font-bold mb-4">Loading ...</h2>
      </div>
      </div>
  );
};

export default LoanModal;
