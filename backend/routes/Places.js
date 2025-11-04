import express from "express";
import Place from "../models/Place.js";

const router = express.Router();

// ✅ Get all places
router.get("/", async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Add a new place (insert manually or through frontend API later)
router.post("/", async (req, res) => {
  try {
    const { name, location, imageUrl, state } = req.body;
    const newPlace = new Place({ name, location, imageUrl, state });
    await newPlace.save();
    res.status(201).json(newPlace);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Get places by state name (for /state/:stateName)
router.get("/state/:stateName", async (req, res) => {
  try {
    const places = await Place.find({ state: req.params.stateName });
    res.json(places);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Delete a place by ID
router.delete("/:id", async (req, res) => {
  try {
    const place = await Place.findByIdAndDelete(req.params.id);
    if (!place) return res.status(404).json({ message: "Place not found" });
    res.json({ message: "Place deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
