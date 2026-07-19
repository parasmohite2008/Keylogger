// This creates a temporary "database" in the server's memory
// We will leave the admin account in here as a permanent backup!
const users = [
    { username: 'admin', password: 'securePassword123' }
];

export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    
    const { action, username, password } = req.body;

    // --- LOGIN LOGIC ---
    if (action === 'login') {
        // Look through our 'users' list to see if the username and password match
        const foundUser = users.find(u => u.username === username && u.password === password);
        
        if (foundUser) {
            return res.status(200).json({ 
                success: true, 
                message: `Congratulations ${username}! You hacked the password and entered the system!` 
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
            
            // Check if the username is already taken in our list
            const userExists = users.find(u => u.username === username);
            if (userExists) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Registration Failed: Username is already taken!' 
                });
            }

            // Save the new user to our temporary list!
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

    // If the action is missing or incorrect
    return res.status(400).json({ success: false, message: 'Invalid action requested.' });
}
