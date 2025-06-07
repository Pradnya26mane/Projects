const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;
const authRoute = require('./routes/authRoutes'); 

// Middleware
app.use(bodyParser.json()); // Parse JSON data
app.use(cors()); 

// Use the registration and login routes
app.use('/api', authRoute);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});