import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="header-parent">
      <div className="header">
        <div className="logo">
          <span>F</span>OODIE<span>D</span>ELIGHT
        </div>

        <div className="nav-link">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/manage-restaurants">Manage Restaurants</a>
            </li>
            <li>
              <a href="/profile">Hello, Admin</a>
            </li>
          </ul>
        </div>
        {menuOpen ? (
          <div className="ham-link">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/manage-restaurants">Manage Restaurants</a>
              </li>
              <li>
                <a href="/profile">Hello, Admin</a>
              </li>
            </ul>
          </div>
        ) : (
          <div className="temp" style={{ display: "none" }}></div>
        )}

        <div className="hamburger">
          <RestaurantMenuIcon
            onClick={(e) => {
              setMenuOpen(!menuOpen);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
