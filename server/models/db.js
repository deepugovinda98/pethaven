const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoURI = "mongodb://localhost:27017/MainProject";

  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the application if the database connection fails
  }
};

module.exports = connectDB;