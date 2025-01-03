const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  applicantName: {
    type: String,
    required: true
  },
  amountRequested: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['Loan', 'Insurance'],
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  documents: [
    {
      name: String,
      url: String
    }
  ]
}, { timestamps: true });

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
