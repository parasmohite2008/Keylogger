<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Secure Network Access</title>
    <style>
        /* Base Page Styles */
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            transition: background-color 0.5s ease;
        }

        /* Authentication Section (Login/Register) */
        .auth-wrapper {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            width: 100%;
            max-width: 350px;
        }
        h2 { margin-top: 0; color: #333; text-align: center; }
        .form-group { margin-bottom: 1rem; }
        label { display: block; margin-bottom: 0.5rem; color: #666; }
        input[type="text"], input[type="password"] {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
        }
        button.action-btn {
            width: 100%;
            padding: 0.75rem;
            background-color: #0056b3;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1rem;
            margin-top: 0.5rem;
        }
        button.action-btn:hover { background-color: #004494; }
        .tabs {
            display: flex;
            margin-bottom: 1.5rem;
            border-bottom: 2px solid #e0e0e0;
        }
        .tab-btn {
            flex: 1;
            padding: 0.75rem;
            background: none;
            border: none;
            color: #666;
            font-size: 1rem;
            cursor: pointer;
            font-weight: bold;
        }
        .tab-btn:hover { color: #0056b3; }
        .tab-btn.active {
            color: #0056b3;
            border-bottom: 2px solid #0056b3;
            margin-bottom: -2px;
        }
        .form-panel { display: none; }
        .form-panel.active { display: block; }
        #message { margin-top: 1rem; text-align: center; font-weight: bold; }
        .success { color: green; }
        .error { color: red; }

        /* Premium Welcome Dashboard */
        .welcome-wrapper {
            display: none;
            border: 1px solid #222;
            padding: 4rem;
            border-radius: 4px;
            background: linear-gradient(145deg, #0a0a0a, #111111);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
            text-align: center;
            font-family: 'Georgia', serif;
            color: #ffffff;
        }
        .welcome-wrapper h1 {
            font-size: 2.2rem;
            font-weight: normal;
            letter-spacing: 2px;
            margin-top: 0;
            margin-bottom: 10px;
            color: #d4af37;
        }
        .welcome-wrapper p {
            font-family: 'Arial', sans-serif;
            color: #888;
            font-size: 1rem;
            letter-spacing: 1px;
            margin-bottom: 30px;
        }
        .status {
            display: inline-block;
            padding: 10px 20px;
            border: 1px solid #00ff41;
            color: #00ff41;
            font-family: 'Courier New', Courier, monospace;
            font-size: 0.9rem;
            letter-spacing: 2px;
            text-transform: uppercase;
        }
    </style>
</head>
<body>

<div id="authSection" class="auth-wrapper">
    <div class="tabs">
        <button class="tab-btn active" onclick="switchTab('login')">Log In</button>
        <button class="tab-btn" onclick="switchTab('register')">Create Account</button>
    </div>

    <div id="loginPanel" class="form-panel active">
        <h2>Portal Access</h2>
        <form id="loginForm">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" required>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" required>
            </div>
            <button type="submit" class="action-btn">Log In</button>
        </form>
    </div>

    <div id="registerPanel" class="form-panel">
        <h2>New Account</h2>
        <form id="registerForm">
            <div class="form-group">
                <label for="newUsername">Choose Username</label>
                <input type="text" id="newUsername" required>
            </div>
            <div class="form-group">
                <label for="newPassword">Create Password</label>
                <input type="password" id="newPassword" required>
            </div>
            <button type="submit" class="action-btn">Sign Up</button>
        </form>
    </div>

    <div id="message"></div>
</div>

<div id="welcomeSection" class="welcome-wrapper">
    <h1>Authentication Confirmed</h1>
    <p>Welcome to the Secure Network Dashboard, <span id="displayUsername" style="color: white; font-weight: bold;"></span>.</p>
    <div class="status">System Access Granted</div>
</div>

<script>
    function switchTab(tabName) {
        const buttons = document.querySelectorAll('.tab-btn');
        const panels = document.querySelectorAll('.form-panel');
        const messageDiv = document.getElementById('message');
        
        messageDiv.textContent = ""; 
        buttons.forEach(btn => btn.classList.remove('active'));
        panels.forEach(panel => panel.classList.remove('active'));
        
        if (tabName === 'login') {
            buttons[0].classList.add('active');
            document.getElementById('loginPanel').classList.add('active');
        } else {
            buttons[1].classList.add('active');
            document.getElementById('registerPanel').classList.add('active');
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        async function handleAuthRequest(action, user, pass) {
            const messageDiv = document.getElementById('message');
            messageDiv.textContent = "Processing...";
            messageDiv.className = "";

            try {
                const response = await fetch('/api/auth', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: action, username: user, password: pass })
                });
                const data = await response.json();
                
                if (response.ok && data.success) {
                    if (action === 'login') {
                        document.body.style.backgroundColor = '#050505';
                        document.getElementById('authSection').style.display = 'none';
                        document.getElementById('displayUsername').textContent = user;
                        document.getElementById('welcomeSection').style.display = 'block';
                    } else {
                        messageDiv.textContent = data.message;
                        messageDiv.className = 'success';
                        document.getElementById('registerForm').reset();
                    }
                } else {
                    messageDiv.textContent = data.message || 'Operation failed.';
                    messageDiv.className = 'error';
                }
            } catch (error) {
                messageDiv.textContent = 'Server error. Is the backend deployed?';
                messageDiv.className = 'error';
            }
        }

        document.getElementById('loginForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const user = document.getElementById('username').value;
            const pass = document.getElementById('password').value;
            handleAuthRequest('login', user, pass);
        });

        document.getElementById('registerForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const newUser = document.getElementById('newUsername').value;
            const newPass = document.getElementById('newPassword').value;
            handleAuthRequest('register', newUser, newPass);
        });
    });
</script>

</body>
</html>
