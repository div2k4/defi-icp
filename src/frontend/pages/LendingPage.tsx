import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Wallet } from "lucide-react";
import { formatICPAmount } from "@/lib/utils";

const LendingPage = () => {
  const navigate = useNavigate();
  const [depositAmount, setDepositAmount] = useState(0);
  const [estimatedEarnings, setEstimatedEarnings] = useState(0);
  
  const handleDepositChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = Number(e.target.value);
    setDepositAmount(amount);
    setEstimatedEarnings(amount * 0.08); // Assuming 8% APR
  };

  const handleDeposit = async () => {
    if (depositAmount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    // TODO: Implement deposit functionality with backend canister
    alert(`Depositing ${formatICPAmount(depositAmount)}`);
  };

  const handleWithdraw = () => {
    navigate("/dashboard");
  };

  const handleConnectWallet = () => {
    navigate("/connect-wallet");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#dfefff] via-[#f1f8ff] to-[#e3f2fd] p-12 text-gray-900 flex flex-col items-center justify-center">
      <motion.h1
        className="text-5xl font-extrabold mb-8 drop-shadow-lg text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Lend Your Assets
      </motion.h1>
      
      <div className="bg-white shadow-lg p-6 rounded-2xl w-full max-w-3xl border border-gray-300">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Deposit ICP</h2>
        <input 
          type="number" 
          placeholder="Enter amount to lend" 
          className="w-full p-3 border rounded-lg mb-4" 
          value={depositAmount} 
          onChange={handleDepositChange} 
        />
        <p className="text-gray-700">Estimated Annual Earnings: <span className="font-bold">{formatICPAmount(estimatedEarnings)}</span></p>
      </div>
      
      <div className="bg-white shadow-lg p-6 rounded-2xl mt-8 w-full max-w-3xl border border-gray-300">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Deposits</h2>
        <p className="text-gray-700">🔹 User A deposited 50 ICP</p>
        <p className="text-gray-700">🔹 User B deposited 100 ICP</p>
        <p className="text-gray-700">🔹 User C deposited 200 ICP</p>
      </div>
      
      <div className="flex gap-6 mt-12 w-full max-w-4xl justify-center">
        <Button
          onClick={handleDeposit}
          className="bg-blue-500 hover:bg-blue-600 text-lg px-10 py-5 rounded-xl shadow-md font-bold hover:scale-105 transition-transform text-white"
        >
          Deposit
        </Button>
        <Button
          onClick={handleWithdraw}
          className="bg-gray-500 hover:bg-gray-600 text-lg px-10 py-5 rounded-xl shadow-md font-bold hover:scale-105 transition-transform text-white"
        >
          Withdraw
        </Button>
        <Button
          onClick={handleConnectWallet}
          className="bg-orange-500 hover:bg-orange-600 text-lg px-10 py-5 rounded-xl flex items-center gap-3 shadow-md font-bold hover:scale-105 transition-transform text-white"
        >
          <Wallet size={24} /> Connect Wallet
        </Button>
      </div>

      <Button
        onClick={() => navigate("/")}
        className="mt-6 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-xl shadow-md font-bold"
      >
        Back
      </Button>
    </div>
  );
};

export default LendingPage;