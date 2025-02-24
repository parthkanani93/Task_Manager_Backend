const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: process.env.NODE_ENV === 'development', // Only create indexes in development
      serverSelectionTimeoutMS: 5000, // Timeout after 5s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      family: 4 // Use IPv4, skip trying IPv6
    });

    // Create indexes in production explicitly
    if (process.env.NODE_ENV === 'production') {
      await Promise.all([
        conn.model('User').ensureIndexes(),
        conn.model('Task').ensureIndexes(),
        conn.model('BlacklistedToken').ensureIndexes()
      ]);
    }

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
};

// Handle MongoDB connection errors
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Handle application termination
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});

module.exports = connectDB;