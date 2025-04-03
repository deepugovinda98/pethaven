const express = require("express");
const { getApprovedPets, addPet } = require("../controllers/userController");
const upload = require("../middlewares/uploadMiddleware"); // Import Multer

const router = express.Router();

router.get("/approved-pets", getApprovedPets);
router.post("/add-pet", addPet);
// Route to add a pet with image upload
router.post("/add-pet", upload.single("photos"), addPet);

module.exports = router;