const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  pet_details: { type: String, required: true },
  photos: [String], // Ensure photos is an array of strings (file paths)
  health_status: { type: String, required: true },
  vaccinated: { type: Boolean, required: true },
  documents_link: { type: String },
  owner_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  adoption_status: { type: String, default: "no" },
  approved: { type: Boolean, default: false },
  rejected: { type: Boolean, default: false }
});

module.exports = mongoose.model("Pet", petSchema);
