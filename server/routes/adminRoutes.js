const express = require("express");
const { approvePet, getAllPets } = require("../controllers/adminController");

const router = express.Router();

// Get all pets (approved & not approved) for Admin Dashboard
router.get("/pets", getAllPets);

// Approve a pet
router.patch("/approve/:petId", approvePet);

module.exports = router;