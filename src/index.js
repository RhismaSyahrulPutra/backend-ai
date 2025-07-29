const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const replicateRoutes = require('./routes/replicate');
const apiRoutes = require('./api');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/', apiRoutes);
app.use('/api/replicate', replicateRoutes);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Backend running at ${PORT}`);
});
