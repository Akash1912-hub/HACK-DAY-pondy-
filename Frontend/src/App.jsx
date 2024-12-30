import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Loans from "./components/Loan";
import Insurance from "./components/Insurance";
import Payments from "./components/Payment";
import Support from "./components/Support";
import CryptoWallet from "./components/Cryptowallet";
import Navbar from "./components/Navbar";
import PeerTransfer from "./components/PeerTransfer";
import TransactionList from "./components/Transaction";
import LoginPage from "./components/Login";
import InsuranceApplication from "./insurance/application";
import InsurancePlans from "./insurance/plan";
import EnhancedLoanApplication from "./loan/loanapplication";
import LoanApplicationForm from "./loan/loanapplication";
import RegisterPage from "./components/Register";
import PeersTransfer from "./components/PeersTransfer";
import AdminPage from "./admin/admindashboard";
import LoginAdmin from "./admin/adminlogin";
import BalanceCard from "./components/BalanceCard";
import RequestDetails from "./admin/RequestDetails";
import VoiceAssistant from "./components/VoiceAssistant"; // Import the voice assistant component

// App component
function AppContent() {
  const location = useLocation(); // Use useLocation to determine the current route
  const hideNavbarRoutes = ["/login", "/","/admindashboard"]; // Specify routes where Navbar should be hidden

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Conditionally render Navbar */}
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <main>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/loan" element={<Loans />} />
          <Route path="/support" element={<Support />} />
          <Route path="/wallet" element={<CryptoWallet />} />
          <Route path="/payment" element={<Payments />} />
          <Route path="/insurance" element={<Insurance />} />
          <Route path="/transaction" element={<TransactionList />} />
          <Route path="/peer" element={<PeerTransfer />} />
          <Route path="/insuranceapplication" element={<InsuranceApplication />} />
          <Route path="/plan" element={<InsurancePlans />} />
          <Route path="/loanapplication" element={<LoanApplicationForm />} />
          <Route path="/" element={<RegisterPage />} />
          <Route path="/peers" element={<PeersTransfer />} />
          <Route path="/admindashboard" element={<AdminPage />} />
          <Route path="/adminlogin" element={<LoginAdmin />} />
          <Route path="/balance" element={<BalanceCard />} />
          <Route path="/request" element={<RequestDetails />} />
        </Routes>
      </main>
      <VoiceAssistant /> {/* Add the VoiceAssistant component */}
    </div>
  );
}

// Main App Component wrapped in BrowserRouter
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
