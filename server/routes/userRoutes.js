const express = require("express");
const { getApprovedPets, addPet, getPet, adoptPet } = require("../controllers/userController");

const router = express.Router();

router.get("/approved-pets", getApprovedPets);
router.post("/add-pet", addPet);
// router.get("/pet/:petId", getPet);
// router.patch("/adopt/:petId", adoptPet);

module.exports = router;