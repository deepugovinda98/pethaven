const mongoose = require("mongoose");

const connectDB = async () => {
  const URI = process.env.mongoURI;

  try {
    await mongoose.connect(URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the application if the database connection fails
  }
};

module.exports = connectDB;