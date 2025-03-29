import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

import { Card } from "../components/ui/card";
import { motion } from "framer-motion";
import { formatICPAmount } from "../lib/utils";

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#cce7ff] via-[#e6f2ff] to-[#99ccff] p-12 text-gray-900 flex flex-col items-center justify-center">
      <motion.h1
        className="text-5xl font-extrabold mb-8 drop-shadow-lg text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Dashboard
      </motion.h1>
      
      <Card className="bg-white shadow-lg p-6 rounded-2xl w-full max-w-4xl border border-gray-300 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Overview</h2>
        
        <div className="grid grid-cols-2 gap-6">
          <Card className="p-4 bg-gray-100 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-700">Total Balance</h3>
            <p className="text-3xl font-bold text-blue-600">{formatICPAmount(1000)}</p>
          </Card>
          
          <Card className="p-4 bg-gray-100 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-700">Borrowed Amount</h3>
            <p className="text-3xl font-bold text-red-500">{formatICPAmount(500)}</p>
          </Card>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-6">
          <Card className="p-4 bg-gray-100 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-700">LTV Ratio</h3>
            <p className="text-3xl font-bold text-orange-500">50%</p>
          </Card>
          
          <Card className="p-4 bg-gray-100 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-700">Collateral</h3>
            <p className="text-3xl font-bold text-green-500">{formatICPAmount(750)}</p>
          </Card>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-6">
          <Card className="p-4 bg-gray-100 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-700">Loan Health Tracker</h3>
            <p className="text-3xl font-bold text-purple-500">Healthy</p>
          </Card>
          
          <Card className="p-4 bg-gray-100 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-700">Transaction Ledger</h3>
            <p className="text-lg text-gray-600">View all loan transactions</p>
            <Button 
              onClick={() => navigate("/transactions")}
              className="mt-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-xl shadow-md font-bold"
            >
              View Ledger
            </Button>
          </Card>
        </div>
        
        <div className="mt-6 flex gap-4 justify-center">
          <Button 
            onClick={() => navigate("/borrow")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md font-bold"
          >
            Borrow More
          </Button>
          <Button 
            onClick={() => navigate("/lend")}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl shadow-md font-bold"
          >
            Repay Loan
          </Button>
        </div>
      </Card>
      
      <Button 
        onClick={() => navigate("/")}
        className="mt-6 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-xl shadow-md font-bold"
      >
        Back
      </Button>
    </div>
  );
};

export default DashboardPage;