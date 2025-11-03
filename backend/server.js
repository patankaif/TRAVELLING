
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/User.js"; 

import placesRouter from "./routes/Places.js";


dotenv.config();


const app = express();


app.use(cors()); 
app.use(express.json()); 



app.use("/places", placesRouter);
app.use("/users", userRouter);

app.use("/uploads", express.static("uploads"));


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
