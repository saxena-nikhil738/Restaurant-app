import React, { useEffect, useState } from "react";
import "./Collection.css";
import resImage from "../../Images/res-image.jpg";
import OneCard from "../OneCard/OneCard";
import ControlPointSharpIcon from "@mui/icons-material/ControlPointSharp";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../Config/Config";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// Helper function to truncate text

const Collection = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [collections, setCollections] = useState(null); // Set initial state to null
  const [loading, setLoading] = useState(true);

  const addNewRes = () => {
    navigate("/add-new-restaurant");
  };

  useEffect(() => {
    async function getRestaurants() {
      try {
        const response = await axios.get(`${BASE_URL}/get-restaurants`);

        if (response.status === 200) {
          // Check for successful response status
          setCollections(response.data); // Update collections directly with fetched data
          setLoading(false);
        } else {
          console.error("Failed to fetch restaurants:", response.status);
        }
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    }

    getRestaurants();
  }, []);

  const filteredCollections = collections?.filter(
    (collection) =>
      collection.name?.toLowerCase().includes(query.toLowerCase()) ||
      collection.items?.toLowerCase().includes(query.toLowerCase())
  );
  console.log(collections);

  if (loading) {
    return (
      <Box sx={{ display: "flex" }} className="loading">
        <CircularProgress />
        fetching Data
      </Box>
    );
  }

  return (
    <div className="collections-content">
      <div className="heading">
        <p>Restaurant Collections</p>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by name or items..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="collections-parent">
        <div className="collections">
          <div className="add-card">
            <div className="inner-add" onClick={addNewRes}>
              <ControlPointSharpIcon style={{ fontSize: "60px" }} />
              <p>Add new Restaurant</p>
            </div>
          </div>
          {filteredCollections?.map((collection, index) => (
            <OneCard e={{ collection, index }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
