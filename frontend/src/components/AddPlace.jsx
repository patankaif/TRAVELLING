import { useState } from "react";
import axios from "axios";

export default function AddPlace() {
  const [form, setForm] = useState({ name: "", location: "", imageUrl: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/places", form);
      alert("✅ Place added successfully!");
      setForm({ name: "", location: "", imageUrl: "" });
    } catch (err) {
      console.error("❌ Error adding place:", err);
      alert("Failed to add place");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px", margin: "auto" }}
    >
      <input name="name" placeholder="Place Name" value={form.name} onChange={handleChange} required />
      <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
      <input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} required />
      <button type="submit">Add Place</button>
    </form>
  );
}
