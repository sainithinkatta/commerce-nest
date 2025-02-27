const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        // Get token from the cookie.
        const token = req.cookies.auth_token;
        
        if (!token) {
            return res.status(401).json({
                error: true,
                message: "No token, authorization denied"
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.userId = decoded.userId;
        
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                error: true,
                message: "Token expired"
            });
        }
        
        return res.status(401).json({
            error: true,
            message: "Invalid token"
        });
    }
};

module.exports = authMiddleware;