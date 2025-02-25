const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

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

    return res.json({
        error: false,
        user,
        message: 'Registration Successful'
    });
};

// User Login API
const login = async (req, res) => {
    console.log('Logged In');

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            error: true,
            message: "Email and password are required"
        });
    }

    const userInfo = await User.findOne({ email });
    const fullName = await User.findOne({ fullName });

    if (!userInfo || userInfo.password !== password) {
        return res.status(400).json({
            error: true,
            message: "Invalid Credentials"
        });
    }

    return res.json({
        error: false,
        message: 'Login Successful',
        fullName,
    });
};

// Get User API
const getUser = async (req, res) => {
    const { user } = req.user;

    const isUser = await User.findOne({_id: user._id});

    if(!isUser) {
        return res.sendStatus(401);
    }

    return res.json({
        user: isUser,
        message: ""
    })
};

module.exports = { 
    createAccount, 
    login, 
    getUser
};