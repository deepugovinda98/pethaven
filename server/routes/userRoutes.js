const express = require("express");
const { getApprovedPets, addPet } = require("../controllers/userController");

const router = express.Router();

router.get("/approved-pets", getApprovedPets);
router.post("/add-pet", addPet);

module.exports = router;