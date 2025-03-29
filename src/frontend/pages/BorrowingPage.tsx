import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { formatICPAmount, calculateInterest, calculateMonthlyPayment } from "@/lib/utils";

const BorrowingPage = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);
  const [duration, setDuration] = useState(1);
  const [collateral, setCollateral] = useState(0);
  const [interestRate] = useState(5); // 5% APR
  const [ltv] = useState(150); // 150% collateral requirement
  const [repayment, setRepayment] = useState(0);
  const [monthlyRepayment, setMonthlyRepayment] = useState(0);
  const [liquidationThreshold, setLiquidationThreshold] = useState(0);

  const calculateRepayment = () => {
    const totalInterest = calculateInterest(amount, interestRate, duration);
    const totalRepayment = amount + totalInterest;
    const monthlyPayment = calculateMonthlyPayment(amount, totalInterest, duration);
    const liquidationLevel = collateral * (ltv / 100) * 0.8; // 80% of collateral value
    
    setRepayment(totalRepayment);
    setMonthlyRepayment(monthlyPayment);
    setLiquidationThreshold(liquidationLevel);
  };

  const handleBorrow = () => {
    const requiredCollateral = amount * 1.5; // Ensure at least 150% collateral
    if (collateral < requiredCollateral) {
      alert(`Insufficient collateral! You need at least ${formatICPAmount(requiredCollateral)} to borrow ${formatICPAmount(amount)}.`);
      return;
    }
    calculateRepayment();
    alert(`Borrowing ${formatICPAmount(amount)} for ${duration} months with ${formatICPAmount(collateral)} as collateral. Total repayment: ${formatICPAmount(repayment)}. Monthly payment: ${formatICPAmount(monthlyRepayment)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#cce7ff] via-[#e6f2ff] to-[#99ccff] p-12 text-gray-900 flex flex-col items-center justify-center">
      <motion.h1
        className="text-5xl font-extrabold mb-8 drop-shadow-lg text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Borrow ICP
      </motion.h1>
      
      <Card className="bg-white shadow-lg p-6 rounded-2xl w-full max-w-3xl border border-gray-300 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Borrowing Details</h2>
        <div className="flex flex-col gap-4 text-left">
          <label className="font-semibold text-gray-700">Amount to Borrow</label>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(Number(e.target.value))} 
            className="p-3 border rounded-lg" 
          />
          
          <label className="font-semibold text-gray-700">Duration (months)</label>
          <input 
            type="number" 
            value={duration} 
            onChange={(e) => setDuration(Number(e.target.value))} 
            className="p-3 border rounded-lg" 
          />
          
          <label className="font-semibold text-gray-700">Collateral (ICP) (Minimum: {formatICPAmount(amount * 1.5)})</label>
          <input 
            type="number" 
            value={collateral} 
            onChange={(e) => setCollateral(Number(e.target.value))} 
            className="p-3 border rounded-lg" 
          />
          
          <p className="text-gray-600">Loan-to-Value (LTV): {ltv}% | Interest Rate: {interestRate}% per year</p>
          <p className="text-gray-700 font-semibold">Estimated Total Repayment: {formatICPAmount(repayment)}</p>
          <p className="text-gray-700 font-semibold">Estimated Monthly Payment: {formatICPAmount(monthlyRepayment)}</p>
          <p className="text-red-600 font-semibold">Liquidation Threshold: {formatICPAmount(liquidationThreshold)}</p>

          <Button 
            onClick={handleBorrow}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl shadow-md font-bold"
          >
            Borrow
          </Button>
          <Button 
            onClick={() => navigate("/")}
            className="mt-4 bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-xl shadow-md font-bold"
          >
            Back
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default BorrowingPage;