const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  pass: { type: String, required: true },
  address: { type: String, required: true },
  state: { type: String, required: true },
  phone: { type: Number, required: true },
  role: { type: String, required: true, enum: ["user", "admin"], default: "user" }
});

const User = mongoose.model('User', userSchema);

module.exports = User;