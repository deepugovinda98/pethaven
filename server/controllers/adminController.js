const getAdmins = (req, res) => { res.send("Admin route") };

const getAdmin = (req, res) => { res.send(`Admin ID is ${req.params.id}`) };

const addAdmin = (req, res) => { res.json(req.body) };

const editPet = async (req, res) => {
    try {
      const updatedPet = await Pet.findByIdAndUpdate(
        req.params.petId,
        { status: "yes" }, // Change status from "no" to "yes"
        { new: true }
      );
  
      if (!updatedPet) return res.status(404).json({ error: "Pet not found" });
      res.json({ message: "Pet status updated!", pet: updatedPet });
    } catch (err) {
      res.status(500).json({ error: "Server error while updating pet status" });
    }
  }

module.exports = { getAdmins, getAdmin, addAdmin, editPet };