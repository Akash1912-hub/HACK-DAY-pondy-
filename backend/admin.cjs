const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Application = require('./model/Application.cjs'); // Ensure this path is correct

const app = express();
const PORT = process.env.PORT || 5007;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/bank', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB Connection Error:', err));

// Fetch all applications (loan and insurance)
app.get('/api/applications', async (req, res) => {
  try {
    const applications = await Application.find({});
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications', error });
  }
});

// Update application status (approve or reject)
app.put('/api/applications/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated document
    );
    
    if (!updatedApplication) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.status(200).json(updatedApplication);
  } catch (error) {
    res.status(500).json({ message: 'Error updating application', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
