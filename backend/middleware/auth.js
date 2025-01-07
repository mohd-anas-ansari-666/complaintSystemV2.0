const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify if user is authenticated
function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
}

// Middleware to verify if the authenticated user is an admin
async function verifyAdmin(req, res, next) {
    try {
        // Check if req.user exists
        if (!req.user || !req.user.id) {
            return res.status(401).json({ msg: 'Authorization required' });
        }

        //console.log('User from token:', req.user); // Log user info
        
        // Check if user information is already attached to the request
        const user = await User.findById(req.user.id);
        //console.log('Fetched user from DB:', user); // Log fetched user details
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Check if the user has the 'admin' role
        if (user.role !== 'admin') {
            console.error('Access denied: User is not an admin', user.role); // Log the user's role
            return res.status(403).json({ msg: 'Access denied: Admins only' });
        }

        next(); // If the user is an admin, proceed to the next middleware or route
    } catch (err) {
        console.error('Error verifying admin access:', err.message, err.stack);
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
}

// module.exports = auth;
module.exports = { auth, verifyAdmin };