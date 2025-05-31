// index.js

require('dotenv').config();
const express = require('express');
const connectDB = require('./utils/db'); // 🌱 Our modular DB connection
const eventRoutes = require('./routes/events');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', eventRoutes);

// Connect to MongoDB
connectDB(); // 🧠 Handles the DB connection logic inside db.js

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
