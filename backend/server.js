import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const port = 5007;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection (Change the Mongo URI if needed)
const mongoURI = 'mongodb://127.0.0.1:27017/bank'; // Replace with your MongoDB URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Define User Schema and Model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// JWT Secret Key (for signing tokens)
const jwtSecret = 'my_secret_key';

// Login Endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // If the user doesn't exist
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Compare entered password with the hashed password in the database
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      // If passwords match, generate JWT token
      const token = jwt.sign({ email: user.email }, jwtSecret, { expiresIn: '1h' });
      return res.status(200).json({ success: true, message: 'Login successful.', token });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid credentials.' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
