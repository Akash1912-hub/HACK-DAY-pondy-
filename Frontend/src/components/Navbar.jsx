import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Menu, X } from 'lucide-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-indigo-600">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Building2 className="h-8 w-8 text-white" />
              <span className="ml-2 text-white text-xl font-bold">SecureBank</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/dashboard" className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md">Dashboard</Link>
              <Link to="/transaction" className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md">Transactions</Link>
              <Link to="/payment" className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md">Payments</Link>
              <Link to="/loan" className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md">Loans</Link>
              <Link to="/insurance" className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md">Insurance</Link>
              <Link to="/wallet" className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md">Crypto</Link>
              <Link to="/peer" className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md">Peer-to-Peer</Link>
              <Link to="/support" className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md">Support</Link>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-indigo-500"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="text-white block px-3 py-2 rounded-md hover:bg-indigo-500">Dashboard</Link>
            <Link to="/transaction" className="text-white block px-3 py-2 rounded-md hover:bg-indigo-500">Transactions</Link>
            <Link to="/payment" className="text-white block px-3 py-2 rounded-md hover:bg-indigo-500">Payment</Link>
            <Link to="/loan" className="text-white block px-3 py-2 rounded-md hover:bg-indigo-500">Loans</Link>
            <Link to="/insurance" className="text-white block px-3 py-2 rounded-md hover:bg-indigo-500">Insurance</Link>
            <Link to="/wallet" className="text-white block px-3 py-2 rounded-md hover:bg-indigo-500">wallet</Link>
            <Link to="/peer" className="text-white block px-3 py-2 rounded-md hover:bg-indigo-500">Peer-to-Peer</Link>
            <Link to="/support" className="text-white block px-3 py-2 rounded-md hover:bg-indigo-500">Support</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;