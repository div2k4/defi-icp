import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import LandingPage from "./pages/LandingPage";
import LendingPage from "./pages/LendingPage";
import BorrowingPage from "./pages/BorrowingPage";
import DashboardPage from "./pages/DashboardPage";
import TransactionLedger from "./pages/TransactionLedger";
import ConnectWalletPage from "./pages/ConnectWalletPage";

const App = () => {
  return (
    <Router>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/lend" element={<LendingPage />} />
        <Route path="/borrow" element={<BorrowingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/transactions" element={<TransactionLedger />} />
        <Route path="/connect-wallet" element={<ConnectWalletPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;