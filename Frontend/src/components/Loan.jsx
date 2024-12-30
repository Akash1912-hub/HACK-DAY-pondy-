import React, { useState } from "react";
import { Link } from "react-router-dom";

function Loans() {
  const loanTypes = [
    { type: "Personal Loan", amount: "1,000 - 50,000", rate: "8.99%", term: "12-60 months" },
    { type: "Home Loan", amount: "50,000 - 500,000", rate: "4.99%", term: "15-30 years" },
    { type: "Auto Loan", amount: "5,000 - 100,000", rate: "5.99%", term: "12-84 months" },
    { type: "Business Loan", amount: "10,000 - 200,000", rate: "9.99%", term: "12-120 months" },
  ];

  const [loanAmount, setLoanAmount] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const calculateLoan = () => {
    if (loanAmount && loanTerm && interestRate) {
      const principal = parseFloat(loanAmount);
      const monthlyRate = parseFloat(interestRate) / 100 / 12;
      const months = parseInt(loanTerm);

      const payment =
        (principal * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -months));

      setMonthlyPayment(payment.toFixed(2));
    } else {
      alert("Please enter all loan details to calculate!");
    }
  };

  return (
    <div className="w-screen mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Loan Services</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Loan Calculator */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Loan Calculator</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Loan Amount</label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Loan Term (months)</label>
              <input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Interest Rate (%)</label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <button
              onClick={calculateLoan}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
            >
              Calculate
            </button>
          </div>
          {monthlyPayment !== null && (
            <div className="mt-4 text-center">
              <h3 className="text-lg font-medium text-gray-700">
                Monthly Payment: <span className="text-green-600">${monthlyPayment}</span>
              </h3>
            </div>
          )}
        </div>

        {/* Active Loans */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Active Loans</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Personal Loan</span>
                <span className="text-green-600">Active</span>
              </div>
              <div className="text-sm text-gray-500">
                <p>Amount: $25,000</p>
                <p>Remaining: $18,750</p>
                <p>Next Payment: Apr 1, 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Available Loan Types */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Loan Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {loanTypes.map((loan, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <h3 className="font-medium text-lg mb-2">{loan.type}</h3>
              <div className="text-sm text-gray-500 space-y-1">
                <p>Amount: ${loan.amount}</p>
                <p>Rate: {loan.rate}</p>
                <p>Term: {loan.term}</p>
              </div>
              <Link to="/loanapplication">
                <button className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
                  Apply Now
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Loans;
