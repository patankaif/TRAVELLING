import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";  // ✅ ADD THIS
import "./Main.css";

const API = process.env.REACT_APP_API_BASE || "https://travel-backend-d2fb.onrender.com";

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

let debounceTimer;

const Main = () => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();  // ✅ INITIALIZE useNavigate

  // 🧭 Fetch all places
  useEffect(() => {
    fetch(`${API}/places`)
      .then((res) => res.json())
      .then((data) => {
        setPlaces(data);
        setFilteredPlaces(data);
      })
      .catch((err) => console.error("❌ Error fetching places:", err));
  }, []);

  // 🧠 Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔍 Handle search input
  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowDropdown(true);

    if (value.trim() === "" || value.length < 3) {
      setFilteredPlaces(places);
      setCitySuggestions([]);
      return;
    }

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      // Local filtering
      const filtered = places.filter((place) =>
        place.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredPlaces(filtered);

      // Fetch city suggestions
      try {
        const res = await fetch(
          `${API}/cities?search=${encodeURIComponent(value)}`
        );
        const cityData = await res.json();
        const suggestions =
          cityData.data?.map((city) => `${city.city}, ${city.country}`) || [];
        setCitySuggestions(suggestions);
      } catch (err) {
        console.error("❌ City suggestion error:", err);
        setCitySuggestions([]);
      }
    }, 400);
  };

  // 📍 Handle selection from dropdown
  const handleSelect = async (name) => {
    setSearchTerm(name);
    setShowDropdown(false);

    // 📌 If a state is selected, navigate to its page
    if (indianStates.includes(name)) {
      navigate(`/state/${encodeURIComponent(name)}`); // ✅ ONLY CHANGE
      return;
    }

    // Filter from existing places
    const matchedPlaces = places.filter(
      (place) =>
        place.name.toLowerCase().includes(name.toLowerCase()) ||
        place.desc?.toLowerCase().includes(name.toLowerCase())
    );
    setFilteredPlaces(matchedPlaces.length > 0 ? matchedPlaces : []);
  };

  // ❌ Clear input and reset
  const handleClear = () => {
    setSearchTerm("");
    setFilteredPlaces(places);
    setShowDropdown(false);
    setCitySuggestions([]);
  };

  // 🧭 Filter Indian states by name
  const filteredStates = indianStates.filter((state) =>
    state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main">
      <h1 className="heading">🌍 Explore Beautiful Places</h1>

      {/* 🔍 Search Bar */}
      <div className="search-container" ref={searchRef}>
        <input
          type="text"
          placeholder="Search places, states, or cities..."
          className="search-bar"
          value={searchTerm}
          onChange={handleSearch}
          onFocus={() => setShowDropdown(true)}
        />

        {searchTerm && (
          <button className="clear-btn" onClick={handleClear}>
            ✕
          </button>
        )}

        {/* 🧭 Dropdown */}
        {showDropdown && (
          <div className="state-dropdown">
            {searchTerm.trim() === "" ? (
              <div className="state-grid">
                {indianStates.map((state, index) => (
                  <div
                    key={index}
                    className="state-item"
                    onClick={() => handleSelect(state)}
                  >
                    {state}
                  </div>
                ))}
              </div>
            ) : Array.isArray(filteredPlaces) && filteredPlaces.length > 0 ? (
              <ul className="search-dropdown">
                {filteredPlaces.map((place, index) => (
                  <li
                    key={index}
                    className="search-item"
                    onClick={() => handleSelect(place.name)}
                  >
                    {place.name}
                  </li>
                ))}
              </ul>
            ) : citySuggestions.length > 0 ? (
              <ul className="search-dropdown">
                {citySuggestions.map((city, index) => (
                  <li
                    key={index}
                    className="search-item"
                    onClick={() => handleSelect(city)}
                  >
                    {city}
                  </li>
                ))}
              </ul>
            ) : filteredStates.length > 0 ? (
              <ul className="search-dropdown">
                {filteredStates.map((state, index) => (
                  <li
                    key={index}
                    className="search-item"
                    onClick={() => handleSelect(state)}
                  >
                    {state}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-results">No results found...</p>
            )}
          </div>
        )}
      </div>

      {/* 🏙️ Places Section */}
      {Array.isArray(filteredPlaces) && filteredPlaces.length === 0 ? (
        <p className="loading">No places found...</p>
      ) : Array.isArray(filteredPlaces) ? (
        <div className="places-container">
          {filteredPlaces.map((place) => (
            <div
              className="place-card"
              key={place._id}
              onClick={() => setSelectedPlace(place)}
            >
              <img
                src={place.imageUrl}
                alt={place.name}
                className="place-image"
                onError={(e) =>
                  (e.target.src = "https://placehold.co/300x200?text=No+Image")
                }
              />
              <h3>{place.name}</h3>
              <p>{place.desc || place.description}</p>
            </div>
          ))}
        </div>
      ) : null}

      {/* 🖼️ Fullscreen Modal */}
      {selectedPlace && (
        <div
          className="fullscreen-overlay"
          onClick={() => setSelectedPlace(null)}
        >
          <div
            className="fullscreen-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={() => setSelectedPlace(null)}>
              ✖
            </button>
            <img
              src={selectedPlace.imageUrl}
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
