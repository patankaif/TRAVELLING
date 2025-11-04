// import mongoose from "mongoose";

// const placeSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   desc: { type: String, required: true },
//   image: { type: String, required: true }
// });

// const Place = mongoose.model("Place", placeSchema, "places"); 
// export default Place;


// import mongoose from "mongoose";

// const placeSchema = new mongoose.Schema({
//   name: String,
//   desc: String,
//   image: String,
//   state: {
//     type: String,
//     required: true, // ensure every place has a state
//   },
// });

// export default mongoose.model("Place", placeSchema);


// import express from "express";
// import Place from "../models/Place.js";

// const router = express.Router();

// // ✅ Get places by state
// router.get("/state/:stateName", async (req, res) => {
//   const { stateName } = req.params;

//   try {
//     const places = await Place.find({ state: stateName });
//     res.json(places);
//   } catch (err) {
//     res.status(500).json({ message: `Error fetching places for ${stateName}`, error: err.message });
//   }
// });

// export default router;

import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true, // Make sure it matches what frontend uses
  },
  state: {
    type: String,
    required: true,
  }
});

const Place = mongoose.model("Place", placeSchema);

export default Place;
