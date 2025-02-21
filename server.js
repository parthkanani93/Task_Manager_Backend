const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
require('dotenv').config();

// New Swagger imports
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml'); // Save the documentation as swagger.yaml

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ extended: false }));

// Routes
app.use('/auth', require('./src/routes/auth'));
app.use('/tasks', require('./src/routes/tasks'));

// Base route
app.get('/', (req, res) => {
  res.send('Task Management API is running...');
});

//swagger Doc
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Environment variables
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`
=========================================
🚀 Server running on port ${PORT}
  
📌 API URL:           http://localhost:${PORT}
📚 API Documentation: http://localhost:${PORT}/api-docs
=========================================
  `);
});