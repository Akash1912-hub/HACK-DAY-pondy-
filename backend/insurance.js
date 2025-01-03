import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import Joi from 'joi';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (update with your MongoDB URI if needed)
mongoose.connect('mongodb://localhost:27017/insurance', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Schema for Insurance Applications
const applicationSchema = new mongoose.Schema({
  type: String,
  formData: Object,
  recipientAddress: String,
});

const Application = mongoose.model('insuranceApplication', applicationSchema);

// Schema for Insurance Claims
const claimSchema = new mongoose.Schema({
  policyType: String,
  description: String,
  date: { type: Date, default: Date.now },
});

const Claim = mongoose.model('Claim', claimSchema);

// JWT Authentication Middleware
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).send({ error: 'Access denied. No token provided.' });
  }
  try {
    const decoded = jwt.verify(token, 'your-secret-key');
    req.user = decoded;  // Attach user data to the request
    next();
  } catch (error) {
    res.status(400).send({ error: 'Invalid token.' });
  }
};

// Joi validation schema for applications
const applicationSchemaJoi = Joi.object({
  type: Joi.string().required(),
  formData: Joi.object().required(),
  recipientAddress: Joi.string().required(), // Or apply address format validation
});

// Route to save application data
app.post('/applications', verifyToken, async (req, res) => {
  try {
    const { error } = applicationSchemaJoi.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }

    const { type, formData, recipientAddress } = req.body;

    const newApplication = new Application({
      type,
      formData,
      recipientAddress,
    });

    await newApplication.save();
    res.status(201).send({ message: 'Application saved successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while saving the application.' });
  }
});

// Route to submit insurance claims
app.post('/claims', verifyToken, async (req, res) => {
  try {
    const { policyType, description } = req.body;

    if (!policyType || !description) {
      return res.status(400).send({ error: 'Policy type and description are required.' });
    }

    const newClaim = new Claim({ policyType, description });
    await newClaim.save();

    res.status(201).send({ message: 'Claim submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while submitting the claim.' });
  }
});

// Route to fetch all claims with pagination
app.get('/claims', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const claims = await Claim.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).send(claims);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while fetching claims.' });
  }
});

// Route to fetch all applications with pagination
app.get('/applications', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const applications = await Application.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).send(applications);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while fetching applications.' });
  }
});

// Start the server
const PORT = 5008;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
