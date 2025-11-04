import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios"; // ✅ Import axios to make external API requests
import userRouter from "./routes/User.js";
import placesRouter from "./routes/Places.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/places", placesRouter);
app.use("/users", userRouter);



app.use("/uploads", express.static("uploads"));

// ✅ Teleport Proxy Route
// ✅ Updated Teleport Proxy Route with headers

app.get("/cities", async (req, res) => {
  const { search } = req.query;

  if (!search) {
    return res.status(400).json({ error: "Missing search query" });
  }

  try {
    const response = await axios.get(
      "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
      {
        params: { namePrefix: search, limit: 5 },
        headers: {
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
          "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("❌ GeoDB API error:", error.response?.data || error.message);
    res.status(500).json({
      error: "Failed to fetch cities from GeoDB API",
      details: error.response?.data || error.message,
    });
  }
});




const PORT = process.env.PORT || 5001;

console.log("🔄 Connecting to MongoDB...");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("🌎 Travel API running...");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
