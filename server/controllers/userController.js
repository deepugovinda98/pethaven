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
  const { name, species, breed, age, gender, pet_details, photos, health_status, vaccinated, documents_link, owner_id } = req.body;

  if (!owner_id) {
    return res.status(400).json({ error: "User must be logged in to add a pet." });
  }

  try {
    const newPet = new Pet({
      name,
      species,
      breed,
      age,
      gender,
      pet_details,
      photos,
      health_status,
      vaccinated,
      documents_link,
      owner_id,
      approved: false // Default: waiting for admin approval
    });

    await newPet.save();
    res.status(201).json({ message: "Pet added successfully, pending approval!", pet: newPet });
  } catch (err) {
    res.status(500).json({ error: "Server error while adding pet" });
  }
};


module.exports = { getAllPets, getApprovedPets, addPet };