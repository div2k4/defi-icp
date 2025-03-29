import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Wallet } from "lucide-react";
import { formatICPAmount } from "@/lib/utils";

const LandingPage = () => {
  const navigate = useNavigate();
  const [loanAmount, setLoanAmount] = useState(0);
  const collateral = loanAmount * 1.5; // 150% collateral requirement
  const interest = loanAmount * 0.05; // 5% interest rate

  const handleLendClick = () => navigate("/lend");
  const handleBorrowClick = () => navigate("/borrow");
  const handleConnectWalletClick = () => navigate("/connect-wallet");
  const handleSignInClick = () => navigate("/connect-wallet");
  const handleLoginClick = () => navigate("/connect-wallet");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f7fa] via-[#f1f8ff] to-[#e3f2fd] p-12 text-gray-900 flex flex-col items-center justify-center">
      <motion.h1
        className="text-6xl font-extrabold mb-8 drop-shadow-lg text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Lending & Borrowing Platform
      </motion.h1>

      {/* Action Buttons */}
      <div className="flex gap-6 w-full max-w-4xl justify-center mb-8">
        <Button
          onClick={handleLendClick}
          className="bg-blue-500 hover:bg-blue-600 text-lg px-10 py-5 rounded-xl shadow-md font-bold hover:scale-105 transition-transform text-white"
        >
          Lend Assets
        </Button>
        <Button
          onClick={handleBorrowClick}
          className="bg-green-500 hover:bg-green-600 text-lg px-10 py-5 rounded-xl shadow-md font-bold hover:scale-105 transition-transform text-white"
        >
          Borrow Assets
        </Button>
        <Button
          onClick={handleConnectWalletClick}
          className="bg-orange-500 hover:bg-orange-600 text-lg px-10 py-5 rounded-xl flex items-center gap-3 shadow-md font-bold hover:scale-105 transition-transform text-white"
        >
          <Wallet size={24} /> Connect Wallet
        </Button>
      </div>

      <div className="flex w-full max-w-6xl">
        {/* Main Content */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-white text-gray-900 shadow-lg p-8 rounded-2xl hover:scale-105 transition-transform border border-gray-300">
            <CardContent>
              <h2 className="text-2xl font-semibold text-blue-600">Total Value Locked (TVL)</h2>
              <p className="text-lg mt-2 font-medium text-gray-700">{formatICPAmount(1250000)}</p>
            </CardContent>
          </Card>
          <Card className="bg-white text-gray-900 shadow-lg p-8 rounded-2xl hover:scale-105 transition-transform border border-gray-300">
            <CardContent>
              <h2 className="text-2xl font-semibold text-green-600">Active Loans</h2>
              <p className="text-lg mt-2 font-medium text-gray-700">235 Loans</p>
            </CardContent>
          </Card>
        </div>

        {/* Knowledge Sidebar */}
        <div className="w-1/3 ml-8 bg-white shadow-lg p-6 rounded-2xl border border-gray-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose Us?</h2>
          <p className="text-gray-700 mb-4">
            Our platform is built on Internet Computer Protocol (ICP), ensuring fast, secure, and low-cost transactions.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Decentralized and Trustless Lending</li>
            <li>Near Zero Gas Fees with ICP</li>
            <li>Seamless Wallet Integration</li>
            <li>Transparent Smart Contracts</li>
            <li>Fast and Scalable Transactions</li>
          </ul>
        </div>
      </div>

      {/* Loan Calculator Section */}
      <div className="bg-white shadow-lg p-6 rounded-2xl mt-8 w-full max-w-3xl border border-gray-300">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Loan Calculator</h2>
        <input 
          type="number" 
          placeholder="Enter loan amount" 
          className="w-full p-3 border rounded-lg mb-4" 
          value={loanAmount} 
          onChange={(e) => setLoanAmount(Number(e.target.value))} 
        />
        <p className="text-gray-700">Required Collateral: <span className="font-bold">{formatICPAmount(collateral)}</span></p>
        <p className="text-gray-700">Estimated Interest: <span className="font-bold">{formatICPAmount(interest)}</span></p>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white shadow-lg p-6 rounded-2xl mt-8 w-full max-w-3xl border border-gray-300">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Transactions</h2>
        <p className="text-gray-700">🔹 User A borrowed 20 ICP</p>
        <p className="text-gray-700">🔹 User B repaid 15 ICP</p>
        <p className="text-gray-700">🔹 User C deposited 100 ICP</p>
      </div>

      {/* Extra Navigation */}
      <div className="flex gap-6 mt-12 w-full max-w-4xl justify-center">
        <Button
          onClick={handleSignInClick}
          className="bg-gray-600 hover:bg-gray-700 text-lg px-10 py-5 rounded-xl shadow-md font-bold hover:scale-105 transition-transform text-white"
        >
          Sign In
        </Button>
        <Button
          onClick={handleLoginClick}
          className="bg-gray-800 hover:bg-gray-900 text-lg px-10 py-5 rounded-xl shadow-md font-bold hover:scale-105 transition-transform text-white"
        >
          Log In
        </Button>
        <Button
          onClick={() => navigate("/")}
          className="bg-red-500 hover:bg-red-600 text-lg px-10 py-5 rounded-xl shadow-md font-bold hover:scale-105 transition-transform text-white"
        >
          Exit Page
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;