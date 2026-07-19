export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    
    // We expect the frontend to send an 'action' telling us what to do
    const { action, username, password } = req.body;

    // --- LOGIN LOGIC ---
    if (action === 'login') {
        if (username === 'admin' && password === 'securePassword123') {
            return res.status(200).json({ 
                success: true, 
                message: 'Congratulations, you entered the system successfully.' 
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
            return res.status(200).json({ 
                success: true, 
                message: 'Account created! You can now switch to Log In.' 
            });
        } else {
            return res.status(400).json({ 
                success: false, 
                message: 'Registration Failed: Password must be at least 6 characters.' 
            });
        }
    }

    // If the action is missing or incorrect
    return res.status(400).json({ success: false, message: 'Invalid action requested.' });
}
