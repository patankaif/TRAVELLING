import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import Login from "./Login";

export default function Navbar() {
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 100) {
        setHidden(true); // scrolling down
      } else {
        setHidden(false); // scrolling up
      }
      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <div className={`navbar ${hidden ? "navbar--hidden" : ""}`}>
      <h1 className="navbar-title" onClick={() => navigate("/")}>
        Travelling
      </h1>
      <button className="login-btn" onClick={() => navigate("/login")}>
        Login
      </button>
    </div>
  );
}
