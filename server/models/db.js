const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.mongoURI; 

  // if (!uri) {
  //   console.error("❌ MongoDB URI is missing! Check your .env file.");
  //   process.exit(1);
  // }

  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;