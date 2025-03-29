import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { walletConnection } from "@/lib/wallet";
import { toast } from "sonner";

const ConnectWalletPage = () => {
  const navigate = useNavigate();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectII = async () => {
    setIsConnecting(true);
    try {
      const connected = await walletConnection.connectToII();
      if (connected) {
        toast.success("Successfully connected to Internet Identity");
        navigate("/dashboard");
      } else {
        toast.error("Failed to connect to Internet Identity");
      }
    } catch (error) {
      toast.error("Error connecting to Internet Identity");
      console.error(error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleConnectPlug = async () => {
    setIsConnecting(true);
    try {
      const connected = await walletConnection.connectToPlug();
      if (connected) {
        toast.success("Successfully connected to Plug wallet");
        navigate("/dashboard");
      } else {
        toast.error("Failed to connect to Plug wallet");
      }
    } catch (error) {
      toast.error("Error connecting to Plug wallet");
      console.error(error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleConnectStoic = async () => {
    setIsConnecting(true);
    try {
      const connected = await walletConnection.connectToStoic();
      if (connected) {
        toast.success("Successfully connected to Stoic wallet");
        navigate("/dashboard");
      } else {
        toast.error("Failed to connect to Stoic wallet");
      }
    } catch (error) {
      toast.error("Error connecting to Stoic wallet");
      console.error(error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#cce7ff] via-[#e6f2ff] to-[#99ccff] p-12 flex flex-col items-center justify-center text-gray-900">
      <motion.h1
        className="text-5xl font-extrabold mb-8 drop-shadow-lg text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Connect Your Wallet
      </motion.h1>
      
      <Card className="bg-white shadow-lg p-6 rounded-2xl w-full max-w-3xl border border-gray-300 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Select a Wallet</h2>
        
        <div className="grid grid-cols-1 gap-4">
          <Button
            onClick={handleConnectII}
            disabled={isConnecting}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md font-bold w-full"
          >
            Connect with Internet Identity
          </Button>
          <Button
            onClick={handleConnectPlug}
            disabled={isConnecting}
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl shadow-md font-bold w-full"
          >
            Connect with Plug Wallet
          </Button>
          <Button
            onClick={handleConnectStoic}
            disabled={isConnecting}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl shadow-md font-bold w-full"
          >
            Connect with Stoic Wallet
          </Button>
        </div>
        
        <p className="mt-4 text-gray-600 text-sm">
          By connecting your wallet, you agree to our Terms of Service.
        </p>
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

export default ConnectWalletPage;