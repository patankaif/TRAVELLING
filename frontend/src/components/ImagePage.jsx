import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ImagePage.css";

export default function ImagePage() {
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await axios.get("http://localhost:5001/places");
        setPlaces(res.data);
      } catch (err) {
        console.error("❌ Error fetching places:", err);
      }
    };

    fetchPlaces();
  }, []);

  return (
    <div className="gallery-container">
      <h1>Explore Beautiful Places</h1>

      {places.length === 0 ? (
        <p>No places found. Add one using “Add Place”.</p>
      ) : (
        <div className="image-grid">
          {places.map((place) => (
            <div
              key={place._id}
              className="image-card"
              onClick={() => setSelectedPlace(place)}
            >
              <img
                src={place.image}
                alt={place.name}
                onError={(e) => (e.target.src = "https://via.placeholder.com/300")}
              />
              <h3>{place.name}</h3>
              <p>{place.desc}</p>
            </div>
          ))}
        </div>
      )}

      {/* Fullscreen Modal */}
      {selectedPlace && (
        <div
          className="fullscreen-overlay"
          onClick={() => setSelectedPlace(null)}
        >
          <div
            className="fullscreen-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setSelectedPlace(null)}
            >
              ✖
            </button>
            <img src={selectedPlace.image} alt={selectedPlace.name} />
            <h2>{selectedPlace.name}</h2>
            <p>{selectedPlace.desc}</p>
          </div>
        </div>
      )}
    </div>
  );
}
