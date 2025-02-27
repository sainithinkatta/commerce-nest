const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const TOKEN_EXPIRY = "1h"; // Token expires in 1 hour.

// User Create Account API
const createAccount = async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({
            error: true,
            message: "All fields are required"
        });
    }

    const isUser = await User.findOne({ email });

    if (isUser) {
        return res.json({
            error: true,
            message: "User already exists"
        });
    }

    // Hashing password
    const value = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, value);

    const user = new User({ 
        fullName,
        email,
        password: hashedPassword 
    });

    await user.save();

    // Generate JWT token.
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: TOKEN_EXPIRY
    });

    // Set HTTP-only cookie.
    res.cookie('auth_token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 3600000 // 1 hour.
    });

    const userInfo = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email
    };

    return res.json({
        error: false,
        user: userInfo,
        message: 'Registration Successful'
    });
};

// User Login API
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            error: true,
            message: "Email and password are required"
        });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({
            error: true,
            message: "Invalid Credentials"
        });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
        return res.status(400).json({
            error: true,
            message: "Invalid Credentials"
        });
    }

    // Generate JWT token.
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: TOKEN_EXPIRY
    });

    // Set HTTP-only cookie.
    res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure in production.
        sameSite: 'strict',
        maxAge: 3600000 // 1 hour.
    });

    // Return user data without sensitive information
    const userInfo = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email
    };

    return res.json({
        error: false,
        message: 'Login Successful',
        user: userInfo
    });
};

// Get User API
const getUser = async (req, res) => {
    try {
        const userId = req.userId; // Set by the auth middleware
        
        const user = await User.findById(userId).select('-password'); // Exclude password

        if (!user) {
            return res.status(401).json({
                error: true,
                message: "Unauthorized"
            });
        }

        return res.json({
            error: false,
            user,
            message: "User retrieved successfully"
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Server error"
        });
    }
};

// Logout API
const logout = async (req, res) => {
    res.clearCookie('auth_token');
    
    return res.json({
        error: false,
        message: 'Logged out successfully'
    });
};

const checkAuth = async (req, res) => {
    try {
        const token = req.cookies.auth_token;

        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: 'No token provided' 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'User not found' 
            });
        }

        res.json({
            success: true,
            user: { 
                _id: user._id, 
                fullName: user.fullName, 
                email: user.email 
            }
        });
    } catch (error) {
        res.status(401).json({ 
            success: false, 
            message: 'Invalid or expired token' 
        });
    }
};

module.exports = { 
    createAccount, 
    login, 
    getUser,
    logout,
    checkAuth
};