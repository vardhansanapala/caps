const jwt = require('jsonwebtoken');

// Middleware to verify the JWT token
exports.verifyToken = (req, res, next) => {
    try {
        // Extract token from Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Access Denied: No Token Provided' });
        }

        const token = authHeader.split(' ')[1]; // Remove 'Bearer ' prefix
        const verified = jwt.verify(token, process.env.JWT_SECRET); // Verify token with secret from .env

        req.user = verified; // Attach user payload to the request
        next(); // Pass control to the next middleware
    } catch (error) {
        return res.status(403).json({ message: 'Access Denied: Invalid Token' });
    }
};

// Middleware to check if the user is a seller
exports.isSeller = (req, res, next) => {
    try {
        // Ensure user role exists and is 'seller'
        if (req.user?.role !== 'seller') {
            return res.status(403).json({ message: 'Access Denied: You are not a seller' });
        }
        next(); // Pass control to the next middleware
    } catch (error) {
        return res.status(403).json({ message: 'Access Denied: Role Verification Failed' });
    }
};
