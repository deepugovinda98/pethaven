const Pet = require("../models/petModel");

// Admin approves pet
const approvePet = async (req, res) => {
  try {
    const updatedPet = await Pet.findByIdAndUpdate(
      req.params.petId,
      { approved: true },
      { new: true }
    );

    if (!updatedPet) return res.status(404).json({ error: "Pet not found" });
    res.json({ message: "Pet approved!", pet: updatedPet });
  } catch (err) {
    res.status(500).json({ error: "Server error while approving pet" });
  }
};

// Get all pets (approved and not approved)
const getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: "Server error while fetching pets" });
  }
};

module.exports = { approvePet, getAllPets };