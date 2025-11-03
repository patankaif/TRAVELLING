import React, { useEffect, useState } from "react";
// import "./Main.css";

const Main = () => {
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null); // For fullscreen modal

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
            <div
              className="place-card"
              key={place._id}
              onClick={() => setSelectedPlace(place)} // 👈 open fullscreen
            >
              <img
                src={place.image || place.imageUrl}
                alt={place.name}
                className="place-image"
                onError={(e) => (e.target.src = "https://via.placeholder.com/300")}
              />
              <h3>{place.name}</h3>
              <p>{place.desc || place.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Fullscreen Modal */}
      {selectedPlace && (
        <div
          className="fullscreen-overlay"
          onClick={() => setSelectedPlace(null)} // close on outside click
        >
          <div
            className="fullscreen-content"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <button
              className="close-btn"
              onClick={() => setSelectedPlace(null)}
            >
              ✖
            </button>
            <img
              src={selectedPlace.image || selectedPlace.imageUrl}
              alt={selectedPlace.name}
            />
            <h2>{selectedPlace.name}</h2>
            <p>{selectedPlace.desc || selectedPlace.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
