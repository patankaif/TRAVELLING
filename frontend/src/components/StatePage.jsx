import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./StatePage.css"; // optional, for custom styling

const API = process.env.REACT_APP_API_BASE || "https://travel-backend-d2fb.onrender.com";

const StatePage = () => {
  const { stateName } = useParams();
  const [statePlaces, setStatePlaces] = useState([]);

  useEffect(() => {
    fetch(`${API}/places/state/${encodeURIComponent(stateName)}`)
      .then((res) => res.json())
      .then((data) => setStatePlaces(data))
      .catch((err) => console.error(`❌ Error fetching places for ${stateName}:`, err));
  }, [stateName]);

  return (
    <div className="state-page">
      <h1 className="state-heading">🌆 Places in {stateName}</h1>

      <div className="places-container">
        {Array.isArray(statePlaces) && statePlaces.length === 0 ? (
          <p>No places found for this state.</p>
        ) : (
          statePlaces.map((place) => (
            <div key={place._id} className="place-card">
              <img
                src={place.imageUrl}
                alt={place.name}
                className="place-image"
                onError={(e) =>
                  (e.target.src = "https://placehold.co/300x200?text=No+Image")
                }
              />
              <h3>{place.name}</h3>
              <p>{place.location}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StatePage;
