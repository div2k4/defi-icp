import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const transactions = [
  { user: "User1", amount: "500 ICP", status: "Healthy", date: "2025-03-29" },
  { user: "User2", amount: "750 ICP", status: "Warning", date: "2025-03-28" },
  { user: "User3", amount: "200 ICP", status: "Critical", date: "2025-03-27" },
];

const TransactionLedger = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#b3e0ff] via-[#d9f2ff] to-[#80c1ff] p-12 text-gray-900 flex flex-col items-center justify-center">
      <motion.h1
        className="text-5xl font-extrabold mb-8 drop-shadow-lg text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Transaction Ledger
      </motion.h1>
      
      <Card className="bg-white shadow-lg p-6 rounded-2xl w-full max-w-4xl border border-gray-300 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Loan Transactions</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3">User</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Loan Health</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={index} className="border-b text-center">
                <td className="p-3">{tx.user}</td>
                <td className="p-3 font-bold text-blue-600">{tx.amount}</td>
                <td className={`p-3 font-bold ${tx.status === "Healthy" ? "text-green-500" : tx.status === "Warning" ? "text-orange-500" : "text-red-500"}`}>{tx.status}</td>
                <td className="p-3 text-gray-600">{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      
      <Button 
        onClick={() => navigate("/dashboard")}
        className="mt-6 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-xl shadow-md font-bold"
      >
        Back
      </Button>
    </div>
  );
};

export default TransactionLedger;