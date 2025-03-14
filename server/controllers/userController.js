// const getUsers = (req, res) => { res.send("User route") };

const getPets = async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: "Server error while fetching pets" });
  }
}

const getPet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.petId);
    if (!pet) return res.status(404).json({ error: "Pet not found" });
    res.json(pet);
  } catch (err) {
    res.status(500).json({ error: "Server error while fetching pet details" });
  }
}

const addPet = async (req, res) => {
  const { name, breed, age, description, image } = req.body;

  try {
    const newPet = new Pet({ name, breed, age, description, image });
    await newPet.save();
    res.status(201).json({ message: "Pet added successfully!", pet: newPet });
  } catch (err) {
    res.status(500).json({ error: "Server error while adding pet" });
  }
}

// const addUser = (req, res) => { res.json(req.body) };

module.exports = { getPets, getPet, addPet }