import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Car, Home, Heart, ChevronRight, FileText, AlertCircle, CheckCircle } from 'lucide-react';

const insuranceTypes = [
  { icon: Car, type: 'Auto Insurance', description: 'Comprehensive vehicle protection', path: '/InsuranceApplication' },
  { icon: Home, type: 'Home Insurance', description: 'Safeguard your property', path: '/InsuranceApplication' },
  { icon: Heart, type: 'Life Insurance', description: 'Secure your family future', path: '/InsuranceApplication' },
  { icon: Shield, type: 'Health Insurance', description: 'Quality healthcare coverage', path: '/InsuranceApplication' },
];

const activePolicies = [
  { type: 'Auto Insurance', policyNumber: 'AUT-2024-123456', coverage: 'Comprehensive', renewalDate: 'Dec 31, 2024' },
  { type: 'Home Insurance', policyNumber: 'HOM-2024-789012', coverage: 'Standard', renewalDate: 'Jun 30, 2024' },
];

export default function InsurancePortal() {
  const [claimData, setClaimData] = useState({
    policyType: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClaimData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', content: '' });

    try {
      const response = await fetch('http://localhost:5008/claims', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(claimData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', content: result.message });
        setClaimData({ policyType: '', description: '' });
      } else {
        throw new Error(result.error || 'Failed to submit claim');
      }
    } catch (error) {
      setMessage({ type: 'error', content: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <h1 className="text-3xl font-semibold text-gray-900 text-center">
          Your Insurance Portal
        </h1>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {insuranceTypes.map((insurance, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <insurance.icon className="h-6 w-6 text-gray-600" />
                  <h2 className="text-lg font-medium text-gray-900">{insurance.type}</h2>
                </div>
                <p className="text-gray-600 mb-6">{insurance.description}</p>
                <Link to={insurance.path} className="w-full">
                  <button className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-300 flex items-center justify-center group">
                    Learn More
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 transform group-hover:translate-x-1" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-900">
              <FileText className="h-5 w-5 mr-2 text-gray-600" />
              Your Active Policies
            </h2>
            {activePolicies.map((policy, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">{policy.type}</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    Active
                  </span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Policy Number: {policy.policyNumber}</p>
                  <p>Coverage: {policy.coverage}</p>
                  <p>Renewal Date: {policy.renewalDate}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-900">
              <AlertCircle className="h-5 w-5 mr-2 text-gray-600" />
              File a Claim
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="policyType" className="block text-sm font-medium text-gray-700 mb-1">
                  Policy Type
                </label>
                <select
                  id="policyType"
                  name="policyType"
                  value={claimData.policyType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-shadow duration-200"
                  required
                >
                  <option value="">Select Policy Type</option>
                  <option value="Auto Insurance">Auto Insurance</option>
                  <option value="Home Insurance">Home Insurance</option>
                  <option value="Life Insurance">Life Insurance</option>
                  <option value="Health Insurance">Health Insurance</option>
                </select>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Claim Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={claimData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-shadow duration-200"
                  placeholder="Please describe your claim..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-all duration-300 flex items-center justify-center ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Claim
                    <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            {message.content && (
              <div className={`mt-4 p-4 rounded-md ${
                message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                <div className="flex items-center">
                  {message.type === 'success' ? (
                    <CheckCircle className="h-5 w-5 mr-2" />
                  ) : (
                    <AlertCircle className="h-5 w-5 mr-2" />
                  )}
                  <p>{message.content}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
