const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection (replace with your MongoDB connection string)
mongoose.connect('mongodb://localhost:27017/insurance', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Define Loan Application Schema
const loanApplicationSchema = new mongoose.Schema({
  name: String,
  dob: String,
  occupation: String,
  annualIncome: String,
  vehicleModel: String,
  vehicleYear: String,
  registrationNumber: String,
  vehicleValue: String,
  bikeModel: String,
  bikeYear: String,
  bikeRegistrationNumber: String,
  bikeValue: String,
  loanType: String,
});

const LoanApplication = mongoose.model('LoanApplication', loanApplicationSchema);

// Route to handle form submission
app.post('/submitLoan', async (req, res) => {
  const { formData, selectedType } = req.body;

  try {
    const loanApplication = new LoanApplication({
      ...formData,
      loanType: selectedType,
    });

    await loanApplication.save();
    res.status(200).json({ message: 'Loan application saved successfully!' });
  } catch (err) {
    console.error('Error saving loan application:', err);
    res.status(500).json({ message: 'Error saving loan application' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
