const Pet = require("../models/petModel");

// Admin approves pet
const approvePet = async (req, res) => {
  try {
    const updatedPet = await Pet.findByIdAndUpdate(
      req.params.petId,
      { approved: true, rejected: false },
      { new: true }
    );

    if (!updatedPet) return res.status(404).json({ error: "Pet not found" });
    res.json({ message: "Pet approved!", pet: updatedPet });
  } catch (err) {
    res.status(500).json({ error: "Server error while approving pet" });
  }
};

// Admin rejects pet
const rejectPet = async (req, res) => {
  try {
    const updatedPet = await Pet.findByIdAndUpdate(
      req.params.petId,
      { rejected: true, approved: false }, // Correctly update rejected status
      { new: true }
    );

    if (!updatedPet) return res.status(404).json({ error: "Pet not found" });
    res.json({ message: "Pet rejected!", pet: updatedPet });
  } catch (err) {
    res.status(500).json({ error: "Server error while rejecting pet" });
  }
};

// Get all pets (approved, rejected, and not approved)
// Get all pets (approved, rejected, and pending)
const getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find(); // Fetch all pets
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: "Server error while fetching pets" });
  }
};


module.exports = { approvePet, rejectPet, getAllPets };
