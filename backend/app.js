require('dotenv').config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config");
const authRoutes = require("./routes/routes");

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json({ limit: "25mb" }));

// Database Connection
connectDB();

// Routes
app.use("/api", authRoutes);

app.get('/', (req, res) => {
    res.send('Server is running');
});

// Add error handling
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

module.exports = app;