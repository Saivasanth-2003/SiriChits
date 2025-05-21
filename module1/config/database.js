const mongoose = require('mongoose');
const data = require("dotenv");

data.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;


