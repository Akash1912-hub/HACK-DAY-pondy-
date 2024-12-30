'use client'

import { useState, useEffect } from 'react'
import Web3 from 'web3'
import axios from 'axios'
import { Car, Bike, Heart, Upload, HomeIcon } from 'lucide-react'

// Pinata credentials (replace with actual keys)
const PINATA_API_URL = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
const PINATA_API_KEY = 'bbbe5ea261a462b68c1a';  // Replace with your API key
const PINATA_SECRET_KEY = 'b2645d4eacb1eca88b5827ebf36d2351e63954ae3ffa292a3f2992eaaea33b46';  // Replace with your secret key
const web3 = new Web3(window.ethereum || "https://rpc-amoy.polygon.technology"); // For local or network-specific RPC URL

// Contract ABI and address (replace with actual contract details)
const contractAddress = '0x5B17a068FD69b75A9041326dC0B265D3d7cBBbF7';  // Replace with your contract address
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

const loanTypes = [
  { id: 'life', name: 'Personal Loan', icon: Heart },
  { id: 'car', name: 'Home Loan', icon: HomeIcon },
  { id: 'bike', name: 'Car Loan', icon: Car },
]

const formFields = {
  life: ['Full Name', 'Date of Birth', 'Occupation', 'Annual Income'],
  car: ['Vehicle Model', 'Vehicle Year', 'Registration Number', 'Vehicle Value'],
  bike: ['Bike Model', 'Bike Year', 'Registration Number', 'Bike Value'],
}

export default function LoanApplication() {
  const [selectedType, setSelectedType] = useState(null)
  const [formData, setFormData] = useState({})
  const [documents, setDocuments] = useState([])

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' });
    } else {
      console.error('Please install MetaMask!');
    }
  }, [])

  const handleTypeSelect = (type) => {
    setSelectedType(type)
    setFormData({})
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileUpload = (e) => {
    setDocuments([...documents, ...e.target.files])
  }

  const encryptData = (data) => {
    // Simple encryption logic (you can use libraries like CryptoJS for more secure encryption)
    const encrypted = btoa(data); // Base64 encoding as a placeholder for encryption
    return encrypted;
  }

  const uploadToPinata = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const config = {
      headers: {
        'pinata_api_key': PINATA_API_KEY,
        'pinata_secret_api_key': PINATA_SECRET_KEY
      }
    };
    try {
      const response = await axios.post(PINATA_API_URL, formData, config);
      return response.data.IpfsHash;
    } catch (error) {
      console.error('Error uploading to Pinata', error);
      alert('Error uploading file to Pinata');
    }
  }

  const storeDocumentInBlockchain = async (encryptedLink, encryptedKey) => {
    const contract = new web3.eth.Contract(contractABI, contractAddress)
    const accounts = await web3.eth.getAccounts()

    try {
      await contract.methods.storeDocument(accounts[0], encryptedLink, encryptedKey)
        .send({ from: accounts[0], gas: 2000000 })

      alert('Document stored successfully on the blockchain!')
    } catch (error) {
      console.error('Error storing document:', error)
      alert(`Error: ${error.message}`)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      for (const document of documents) {
        // Upload the document to Pinata
        const ipfsLink = await uploadToPinata(document);
        const encryptedLink = encryptData(ipfsLink);  // Encrypt the IPFS link
        const encryptedKey = encryptData('some-encryption-key');  // You should securely encrypt the key in production

        // Store the encrypted data on the blockchain
        await storeDocumentInBlockchain(encryptedLink, encryptedKey);
      }

      alert('Loan application submitted successfully!');
    } catch (error) {
      console.error('Error submitting the form:', error);
      alert('Error submitting the form');
    }
  }

  return (
    <div className="min-h-screen w-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Apply for Loan</h1>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Select Loan Type</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {loanTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => handleTypeSelect(type.id)}
                className={`flex items-center justify-center p-4 rounded-lg transition-colors ${selectedType === type.id ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <type.icon className="w-6 h-6 mr-2" />
                {type.name}
              </button>
            ))}
          </div>
        </div>

        {selectedType && (
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Enter Details</h2>
            {formFields[selectedType].map((field) => (
              <div key={field} className="mb-4">
                <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
                  {field}
                </label>
                <input
                  type="text"
                  id={field}
                  name={field}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            ))}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Documents
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileUpload} multiple />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit Loan Application
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
