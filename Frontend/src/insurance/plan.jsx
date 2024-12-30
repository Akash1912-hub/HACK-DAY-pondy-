'use client'

import { useState } from 'react'
import { Shield, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const insurancePlans = [
  { 
    id: 1, 
    name: '5 Lakh Insurance', 
    coverage: 200000, 
    premium: 5000,
    description: 'Basic coverage for individuals looking for essential protection. Ideal for young professionals starting their financial planning journey.'
  },
  { 
    id: 2, 
    name: '10 Lakh Insurance', 
    coverage: 50000, 
    premium: 5000,
    description: 'Basic coverage for individuals looking for essential protection. Ideal for young professionals starting their financial planning journey.'
  },
  { 
    id: 3, 
    name: '20 Lakh Insurance', 
    coverage: 800000, 
    premium: 5000,
    description: 'Basic coverage for individuals looking for essential protection. Ideal for young professionals starting their financial planning journey.'
  },
  { 
    id: 4, 
    name: '40 Lakh Insurance', 
    coverage: 4500000, 
    premium: 10000,
    description: 'Comprehensive coverage for families. This plan offers a balance of affordability and substantial protection for your loved ones.'
  },
  { 
    id: 5, 
    name: '50 Lakh Insurance', 
    coverage: 1000000, 
    premium: 18000,
    description: 'Premium coverage for high-value protection. Recommended for individuals with significant financial responsibilities or high-income earners.'
  },
]

export default function InsurancePlans() {
  const [selectedPlan, setSelectedPlan] = useState(null)

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan)
  }

  const handleApply = () => {
    // In a real application, you would use a routing library like Next.js or react-router
    // to navigate to the application page. For this example, we'll just log to the console.
    console.log(`Navigating to application page for plan: ${selectedPlan.name}`)
  }

  return (
    <div className="min-h-screen w-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Choose Your Insurance Plan</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {insurancePlans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-lg shadow-md p-6 cursor-pointer transition-all ${
                selectedPlan?.id === plan.id ? 'ring-2 ring-indigo-600' : 'hover:shadow-lg'
              }`}
              onClick={() => handlePlanSelect(plan)}
            >
              <Shield className="w-12 h-12 text-indigo-600 mb-4" />
              <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
              <p className="text-gray-600 mb-4">Coverage: ₹{plan.coverage.toLocaleString()}</p>
              <p className="text-2xl font-bold text-indigo-600">₹{plan.premium.toLocaleString()}/year</p>
            </div>
          ))}
        </div>

        {selectedPlan && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">{selectedPlan.name}</h2>
            <p className="text-gray-700 mb-4">{selectedPlan.description}</p>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600">Coverage: ₹{selectedPlan.coverage.toLocaleString()}</p>
                <p className="text-gray-600">Premium: ₹{selectedPlan.premium.toLocaleString()}/year</p>
              </div>
              <Link to='/insuranceapplication'>
              <button
                onClick={handleApply}
                className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center"
              >
                Apply Now
                <ChevronRight className="ml-2 w-5 h-5" />
              </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}