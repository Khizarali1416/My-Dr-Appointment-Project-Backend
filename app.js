const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');

// Initialize express app
require('dotenv').config();
const app = express();
connectDB();
require('dotenv').config();


// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS for cross-origin requests
app.use('/upload', express.static(path.join(__dirname, 'upload')));

// Serve static files (e.g., images) from 'public' directory

// Routes
app.use('/api/users', require('./routes/User'));
app.use('/api/admin', require('./routes/Admin'));
app.use('/api/appointments', require('./routes/Appointment'));
app.use('/api/doctors', require('./routes/Doctor'));


// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
