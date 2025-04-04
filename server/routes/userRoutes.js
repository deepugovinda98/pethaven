const express = require("express");
const { getApprovedPets } = require("../controllers/userController");
const upload = require("../middlewares/uploadMiddleware"); // Import Multer
const Pet = require("../models/petModel");

const router = express.Router();

// ✅ Get approved pets
router.get("/approved-pets", getApprovedPets);

// ✅ Add pet with image upload (FIXED ROUTE)
router.post("/add-pet", upload.array("photos", 5), async (req, res) => {
  try {
    console.log("Uploaded files:", req.files);
    console.log("Received pet data:", req.body); // Debugging log

    // ✅ Check if files were uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No images uploaded!" });
    }

    const newPet = new Pet({
      name: req.body.name,
      species: req.body.species,
      breed: req.body.breed,
      age: req.body.age,
      gender: req.body.gender,
      pet_details: req.body.pet_details,
      photos: req.files.map(file => `/uploads/images/${file.filename}`), // ✅ FIXED PATH
      health_status: req.body.health_status,
      vaccinated: req.body.vaccinated === "true",
      documents_link: req.body.documents_link || "",
      owner_id: req.body.owner_id,
      adoption_status: "no",
      approved: false,
      rejected: false
    });

    await newPet.save();
    res.json({ success: true, message: "Pet added successfully!", pet: newPet });

  } catch (err) {
    console.error("Error saving pet:", err);
    res.status(500).json({ success: false, message: "Failed to add pet. Please try again.", error: err.message });
  }
});

// ✅ Get pet by ID
router.get("/pet/:id", async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
