import React, { useState, useEffect } from 'react'
import Web3 from 'web3'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Heart, Car, Bike, Upload, X } from 'lucide-react'

// Constants moved to a separate config file in a real application
const PINATA_API_URL = 'https://api.pinata.cloud/pinning/pinFileToIPFS'
const PINATA_API_KEY = 'bbbe5ea261a462b68c1a'
const PINATA_SECRET_KEY = 'b2645d4eacb1eca88b5827ebf36d2351e63954ae3ffa292a3f2992eaaea33b46'
const contractAddress = '0x5B17a068FD69b75A9041326dC0B265D3d7cBBbF7'
const contractABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "_recipient", "type": "address" },
      { "internalType": "string", "name": "_encryptedLink", "type": "string" },
      { "internalType": "string", "name": "_encryptedKey", "type": "string" }
    ],
    "name": "storeDocument",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

const insuranceTypes = [
  { id: 'life', name: 'Life Insurance', icon: Heart, color: 'from-pink-500 to-rose-500' },
  { id: 'car', name: 'Car Insurance', icon: Car, color: 'from-blue-500 to-cyan-500' },
  { id: 'bike', name: 'Bike Insurance', icon: Bike, color: 'from-green-500 to-emerald-500' },
]

const formFields = {
  life: ['Full Name', 'Date of Birth', 'Occupation', 'Annual Income'],
  car: ['Vehicle Model', 'Vehicle Year', 'Registration Number', 'Vehicle Value'],
  bike: ['Bike Model', 'Bike Year', 'Registration Number', 'Bike Value'],
}

const InsuranceCard = ({ type, selected, onSelect }) => (
  <motion.div
    className={`p-6 rounded-xl shadow-lg cursor-pointer transition-all ${
      selected ? 'bg-gradient-to-br ' + type.color + ' text-white' : 'bg-white hover:shadow-xl'
    }`}
    onClick={() => onSelect(type.id)}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <type.icon className="w-12 h-12 mb-4" />
    <h3 className="text-xl font-semibold">{type.name}</h3>
  </motion.div>
)

const FileUpload = ({ documents, setDocuments }) => {
  const [error, setError] = useState('')

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    const validFiles = files.filter(file => {
      const isValidType = ['application/pdf', 'image/png', 'image/jpeg', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)
      const isValidSize = file.size <= 10 * 1024 * 1024 // 10MB in bytes

      if (!isValidType) {
        setError('Invalid file type. Only PDF, PNG, JPG, and Word documents are allowed.')
        return false
      }

      if (!isValidSize) {
        setError('File size exceeds 10MB limit.')
        return false
      }

      return true
    })

    if (validFiles.length > 0) {
      setDocuments([...documents, ...validFiles])
      setError('')
    }
  }

  const removeDocument = (index) => {
    setDocuments(documents.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-full">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-10 h-10 mb-3 text-gray-400" />
            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500">PDF, PNG, JPG or Word (MAX. 10MB)</p>
          </div>
          <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} multiple />
        </label>
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm"
        >
          {error}
        </motion.p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {documents.map((file, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-center justify-between p-3 bg-gray-100 rounded-lg"
          >
            <span className="text-sm truncate">{file.name}</span>
            <button
              onClick={() => removeDocument(index)}
              className="text-red-500 hover:text-red-700"
            >
              <X size={20} />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const ProgressSteps = ({ currentStep }) => {
  const steps = ['Choose Insurance', 'Enter Details', 'Upload Documents']
  return (
    <div className="flex justify-between mb-8">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            index + 1 <= currentStep ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            {index + 1}
          </div>
          <span className="mt-2 text-xs">{step}</span>
        </div>
      ))}
    </div>
  )
}

export default function InsuranceApplication() {
  const [selectedType, setSelectedType] = useState(null)
  const [formData, setFormData] = useState({})
  const [documents, setDocuments] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const web3 = new Web3(window.ethereum)
  const dummyRecipientAddress = '0x0000000000000000000000000000000000000000'

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
    } else {
      console.error('Please install MetaMask!')
    }
  }, [])

  const handleTypeSelect = (type) => {
    setSelectedType(type)
    setFormData({})
    setCurrentStep(2)
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    // First, submit the application data to our backend
    const applicationResponse = await axios.post('http://localhost:5008/applications', {
      selectedType,
      formData
    });

    // Then handle document uploads to IPFS and blockchain
    for (const document of documents) {
      const formData = new FormData();
      formData.append('file', document);
      const response = await axios.post(PINATA_API_URL, formData, {
        headers: {
          'pinata_api_key': PINATA_API_KEY,
          'pinata_secret_api_key': PINATA_SECRET_KEY,
          'Content-Type': 'multipart/form-data'
        }
      });

      const ipfsHash = response.data.IpfsHash;
      const encryptedLink = btoa(ipfsHash);
      const encryptedKey = btoa('some-encryption-key');

      const contract = new web3.eth.Contract(contractABI, contractAddress);
      const accounts = await web3.eth.getAccounts();

      await contract.methods.storeDocument(
        dummyRecipientAddress,
        encryptedLink,
        encryptedKey
      ).send({ from: accounts[0], gas: 2000000 });
    }

    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  } catch (error) {
    console.error('Error submitting the form:', error);
    alert('Error submitting the form: ' + error.message);
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600" />
      <div className="absolute inset-0 overflow-auto py-12 px-4 sm:px-6 lg:px-8">
        {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
        
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <motion.h1 
              className="text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Smart Insurance Portal
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Secure your future with blockchain-powered insurance
            </motion.p>
          </div>

          <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl p-8 mb-8">
            <ProgressSteps currentStep={currentStep} />

            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <h2 className="text-2xl font-semibold mb-6 text-center">Choose Your Insurance Type</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {insuranceTypes.map((type) => (
                      <InsuranceCard
                        key={type.id}
                        type={type}
                        selected={selectedType === type.id}
                        onSelect={handleTypeSelect}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && selectedType && (
                <motion.form
                  key="step2"
                  onSubmit={(e) => { e.preventDefault(); setCurrentStep(3); }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-semibold mb-6 text-center">Enter Your Details</h2>
                  {formFields[selectedType].map((field) => (
                    <motion.div
                      key={field}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {field}
                      </label>
                      {field === 'Date of Birth' ? (
                        <DatePicker
                          selected={formData[field] || null}
                          onChange={(date) => setFormData({ ...formData, [field]: date })}
                          dateFormat="MM/dd/yyyy"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                          required
                        />
                      ) : (
                        <input
                          type="text"
                          name={field}
                          value={formData[field] || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                          required
                        />
                      )}
                    </motion.div>
                  ))}
                  <motion.button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    Continue to Documents
                  </motion.button>
                </motion.form>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-2xl font-semibold mb-6 text-center">Upload Documents</h2>
                  <FileUpload documents={documents} setDocuments={setDocuments} />

                  <motion.button
                    onClick={handleSubmit}
                    disabled={isSubmitting || documents.length === 0}
                    className={`mt-6 w-full py-3 px-6 rounded-lg text-white transition-all ${
                      isSubmitting ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

