require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./models/db");
const authRoutes = require("./routes/authRoutes");

const PORT = process.env.PORT || 3004;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectDB();

app.use("/auth", authRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});