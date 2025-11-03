import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  image: { type: String, required: true }
});

const Place = mongoose.model("Place", placeSchema, "places"); 
export default Place;
