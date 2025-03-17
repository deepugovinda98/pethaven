const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.mongoURI;

  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the application if the database connection fails
  }
};

module.exports = connectDB;