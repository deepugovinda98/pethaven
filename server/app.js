require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./models/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes"); 
const adminRoutes = require("./routes/adminRoutes"); 
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/auth", authRoutes);
app.use("/user", userRoutes); 
app.use("/admin", adminRoutes);

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});