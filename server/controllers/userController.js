const Pet = require("../models/petModel");

// Get all pets (for admin dashboard, includes unapproved pets)
const getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find(); // Fetch all pets
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: "Server error while fetching pets" });
  }
};

// Get only approved & non-adopted pets (for Featured Pets section)
const getApprovedPets = async (req, res) => {
  try {
    const pets = await Pet.find({ approved: true, adoption_status: "no" });
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: "Server error while fetching featured pets" });
  }
};


const addPet = async (req, res) => {
  try {
    const { name, species, breed, age, gender, pet_details, health_status, vaccinated, documents_link, owner_id } = req.body;

    // Get uploaded file path
    const photoPath = req.file ? `/uploads/${req.file.filename}` : null;

    const newPet = new Pet({
      name,
      species,
      breed,
      age,
      gender,
      pet_details,
      health_status,
      vaccinated,
      documents_link,
      owner_id,
      photos: photoPath // Save image path
    });

    await newPet.save();
    res.status(201).json({ message: "Pet added successfully!", pet: newPet });
  } catch (error) {
    console.error("Error adding pet:", error);
    res.status(500).json({ error: "Failed to add pet" });
  }
};


module.exports = { getAllPets, getApprovedPets, addPet };