// Import required dependencies
const express = require('express');
const mongoose = require('mongoose');
const Web3 = require('web3');
const axios = require('axios');
const multer = require('multer');
const bodyParser = require('body-parser');

// Initialize app and middleware
const app = express();
app.use(bodyParser.json());

// MongoDB connection - replace with your connection string
mongoose.connect('mongodb://localhost:27017/bank', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Pinata and Web3 initialization - replace with your Pinata and Web3 config
const PINATA_API_URL = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
const PINATA_API_KEY = 'bbbe5ea261a462b68c1a'; // Replace with your Pinata API key
const PINATA_SECRET_KEY = 'b2645d4eacb1eca88b5827ebf36d2351e63954ae3ffa292a3f2992eaaea33b46'; // Replace with your Pinata Secret key

const web3 = new Web3('https://rpc-amoy.polygon.technology');  // Use your network URL or localhost for development
const contractAddress = '0x5B17a068FD69b75A9041326dC0B265D3d7cBBbF7'; // Replace with your contract address
const contractABI = [ {
    "inputs": [
      { "internalType": "address", "name": "_recipient", "type": "address" },
      { "internalType": "string", "name": "_encryptedLink", "type": "string" },
      { "internalType": "string", "name": "_encryptedKey", "type": "string" }
    ],
    "name": "storeDocument",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }];

// Define loan application schema
const loanSchema = new mongoose.Schema({
  type: String,
  formData: Object,
  recipientAddress: String,
  documents: Array,
  blockchainTransaction: String
});

const LoanApplication = mongoose.model('LoanApplication', loanSchema);

// Multer setup for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Endpoint to handle loan application
app.post('/apply', upload.array('documents', 5), async (req, res) => {
  const { type, formData, recipientAddress } = req.body;
  const documents = req.files;

  if (!recipientAddress) {
    return res.status(400).send('Recipient address is required');
  }

  try {
    // Upload documents to Pinata
    const documentLinks = await Promise.all(documents.map(file => uploadToPinata(file)));

    // Encrypt document links
    const encryptedLinks = documentLinks.map(link => encryptData(link));

    // Store the encrypted links on the blockchain
    const blockchainTx = await storeDocumentsOnBlockchain(recipientAddress, encryptedLinks);

    // Save loan application in MongoDB
    const newLoan = new LoanApplication({
      type,
      formData,
      recipientAddress,
      documents: documentLinks,
      blockchainTransaction: blockchainTx.transactionHash
    });

    await newLoan.save();
    res.status(200).send('Loan application submitted successfully!');
  } catch (error) {
    console.error('Error applying for loan:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Pinata file upload to IPFS
async function uploadToPinata(file) {
  const formData = new FormData();
  formData.append('file', file.buffer, file.originalname);

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
    throw new Error('Error uploading file to Pinata');
  }
}

// Encrypt data (base64 encoding for simplicity)
function encryptData(data) {
  return Buffer.from(data).toString('base64');
}

// Store documents in the blockchain using smart contract
async function storeDocumentsOnBlockchain(recipientAddress, encryptedLinks) {
  const contract = new web3.eth.Contract(contractABI, contractAddress);
  const accounts = await web3.eth.getAccounts();

  try {
    const tx = await contract.methods.storeDocument(recipientAddress, encryptedLinks[0], 'some-encryption-key')
      .send({ from: accounts[0], gas: 2000000 });

    return tx;
  } catch (error) {
    console.error('Error storing document on blockchain', error);
    throw new Error('Error storing document on blockchain');
  }
}

// Start the Express server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
