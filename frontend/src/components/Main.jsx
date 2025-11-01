import React, { useEffect, useState } from "react";
import "./App.css";

const Main = () => {
  const [places, setPlaces] = useState([]);

  // Fetch all places from backend
  useEffect(() => {
    fetch("https://travel-backend-d2fb.onrender.com/places")
      .then((res) => res.json())
      .then((data) => setPlaces(data))
      .catch((err) => console.error("❌ Error fetching places:", err));
  }, []);

  return (
    <div className="main">
      <h1 className="heading">🌍 Explore Beautiful Places</h1>

      {places.length === 0 ? (
        <p className="loading">Loading places...</p>
      ) : (
        <div className="places-container">
          {places.map((place) => (
            <div className="place-card" key={place._id}>
              <img
                src={place.imageUrl}
                alt={place.name}
                className="place-image"
              />
              <h3>{place.name}</h3>
              <p>{place.description}</p>
              <p className="location">📍 {place.location}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Main;
