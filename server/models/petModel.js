const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
    name: String,
    species: String,
    breed: String,
    age: Number,
    gender: String,
    pet_details: String,
    photos: [String],
    health_status: String,
    adoption_status: { type: String, default: "no" }, 
    vaccinated: Boolean,
    documents_link: String,
    owner_id: String,
    approved: { type: Boolean, default: false },  // New field to check admin approval
    rejected: { type: Boolean, default: false },
});

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;