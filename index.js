const express = require('express');
const { database } = require('./config/firebase');
const { ref, get, child, set } = require('firebase/database');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Register endpoint
app.post('/auth/register', async (req, res) => {
    try {
        console.log('Received registration request:', req.body); // Debug log

        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Generate unique user ID
        const userId = 'user_' + Date.now();

        // Create user data object
        const userData = {
            username,
            email,
            password, // Note: In production, hash this password
            createdAt: new Date().toISOString(),
            userId
        };

        // Save to Firebase
        const userRef = ref(database, 'users/' + userId);
        await set(userRef, userData);

        console.log('User registered successfully:', userId); // Debug log

        res.status(201).json({
            success: true,
            message: 'Registration successful',
            userId
        });

    } catch (error) {
        console.error('Registration error:', error); // Debug log
        res.status(500).json({
            success: false,
            message: 'Registration failed: ' + error.message
        });
    }
});

// Login endpoint
app.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login attempt:', { email }); // Debug log

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        // Get reference to the database
        const dbRef = ref(database);
        const usersSnapshot = await get(child(dbRef, 'users'));

        if (!usersSnapshot.exists()) {
            console.log('No users found in database');
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        let userFound = false;
        let userData = null;

        // Search through users
        usersSnapshot.forEach((childSnapshot) => {
            const user = childSnapshot.val();
            if (user.email === email && user.password === password) {  // Compare email and password
                userFound = true;
                userData = user;
            }
        });

        if (userFound) {
            // Remove sensitive data before sending
            const { password, ...safeUserData } = userData;  // Exclude password from the response
            
            res.status(200).json({
                success: true,
                message: 'Login successful',
                user: safeUserData  // Send user data without password
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Login failed'
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
