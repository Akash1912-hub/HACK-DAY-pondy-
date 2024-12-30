// This is a mock API file to simulate authentication
export default function handler(req, res) {
    if (req.method === 'POST') {
      const { username, password } = req.body;
  
      // Mock credentials
      const mockUsername = 'admin';
      const mockPassword = 'password123';
  
      if (username === mockUsername && password === mockPassword) {
        res.status(200).json({ success: true, message: 'Login successful' });
      } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
  
  