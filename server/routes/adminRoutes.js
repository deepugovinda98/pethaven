const express = require("express");
const {
  approvePet,
  getAllPets,
  rejectPet, // Add rejectPet
} = require("../controllers/adminController");

const router = express.Router();

// Get all pets (approved & not approved) for Admin Dashboard
router.get("/pets", getAllPets);

// Approve a pet
router.patch("/approve/:petId", approvePet);

// Reject a pet (NEW Route)
router.patch("/reject/:petId", rejectPet); // <-- Add this line

module.exports = router;
