const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // To parse JSON bodies

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/bank', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Loan Application Schema
const loanApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  loanAmount: { type: Number, required: true },
  purpose: { type: String, required: true },
  documentPath: String,
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

const LoanApplication = mongoose.model('LoanApplication', loanApplicationSchema);

// Insurance Application Schema
const applicationSchema = new mongoose.Schema({
  type: { type: String, required: true },
  formData: { type: Object, required: true },
  recipientAddress: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

const Application = mongoose.model('Application', applicationSchema);

// Routes for Loan Applications
// Get all loan applications
app.get('/api/loan-applications', async (req, res) => {
  try {
    const loanApplications = await LoanApplication.find();
    res.status(200).json(loanApplications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching loan applications', error });
  }
});

// Get loan applications by status
app.get('/api/loan-applications/status/:status', async (req, res) => {
  const { status } = req.params;
  try {
    const loanApplications = await LoanApplication.find({ status });
    res.status(200).json(loanApplications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching loan applications by status', error });
  }
});

// Update loan application status
app.put('/api/loan-applications/:id', async (req, res) => {
  const { status } = req.body; // "approved" or "rejected"
  const loanId = req.params.id;

  try {
    const updatedLoan = await LoanApplication.findByIdAndUpdate(
      loanId,
      { status },
      { new: true }
    );
    res.status(200).json(updatedLoan);
  } catch (error) {
    res.status(500).json({ message: 'Error updating loan application status', error });
  }
});

// Delete loan application
app.delete('/api/loan-applications/:id', async (req, res) => {
  const loanId = req.params.id;
  try {
    await LoanApplication.findByIdAndDelete(loanId);
    res.status(200).json({ message: 'Loan application deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting loan application', error });
  }
});

// Routes for Insurance Applications
// Get all insurance applications
app.get('/api/insurance-applications', async (req, res) => {
  try {
    const insuranceApplications = await Application.find();
    res.status(200).json(insuranceApplications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching insurance applications', error });
  }
});

// Get insurance applications by status
app.get('/api/insurance-applications/status/:status', async (req, res) => {
  const { status } = req.params;
  try {
    const insuranceApplications = await Application.find({ status });
    res.status(200).json(insuranceApplications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching insurance applications by status', error });
  }
});

// Update insurance application status
app.put('/api/insurance-applications/:id', async (req, res) => {
  const { status } = req.body; // "approved" or "rejected"
  const applicationId = req.params.id;

  try {
    const updatedApplication = await Application.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true }
    );
    res.status(200).json(updatedApplication);
  } catch (error) {
    res.status(500).json({ message: 'Error updating insurance application status', error });
  }
});

// Delete insurance application
app.delete('/api/insurance-applications/:id', async (req, res) => {
  const applicationId = req.params.id;
  try {
    await Application.findByIdAndDelete(applicationId);
    res.status(200).json({ message: 'Insurance application deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting insurance application', error });
  }
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
