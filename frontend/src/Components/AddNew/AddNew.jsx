import React, { useEffect, useRef, useState } from "react";
import CloudUploadSharpIcon from "@mui/icons-material/CloudUploadSharp";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import "./AddNew.css";
import defaultImage from "../../Images/default.webp";
import { Dialog } from "@mui/material";
import { useNavigate } from "react-router";
import axios from "axios";
import { BASE_URL } from "../../Config/Config";
import { toast } from "react-toastify";

const AddNew = () => {
  // Create a ref for the file input element
  const fileInputRef = useRef(null);
  const [open, setOpen] = useState(true);
  const [image, setImage] = useState();
  const [name, setName] = useState("");
  const [mealType, setMealType] = useState("Dining");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [imgURL, setImgURL] = useState(defaultImage);
  const [error, setError] = useState();
  const navigate = useNavigate();

  // let imgURL = defaultImage;

  useEffect(() => {
    console.log(image);
    setImgURL(image || defaultImage);
  }, [image, defaultImage]);

  const handleClose = () => {
    setOpen(false);
    navigate("/manage-restaurants");
  };
  const handleOpen = () => {
    setOpen(true);
  };

  // Function to trigger the file input click
  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async () => {
    // console.log(name);
    if (!name || !price || !description || !location || !image) {
      setError("Please fill required details");
    } else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("mealType", mealType);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("location", location);
      formData.append("image", image); // Ensure `image` is a File object
      // }

      try {
        const response = await axios.post(`${BASE_URL}/add-new-res`, formData);

        if (response?.data) {
          handleClose();
          console.log(response.data);
          toast.success("Resataurant added", {
            position: toast.POSITION.TOP_RIGHT,
          });
          console.log("Restaurant added");
        } else {
          console.log("Failed to add restaurant");
        }
      } catch (error) {
        console.error("Error adding restaurant:", error);
      }
    }
  };

  return (
    <Dialog
      maxWidth={1000}
      open={open}
      onClose={handleClose}
      PaperProps={{
        className: "custom-dialog", // Apply the custom CSS class
      }}
    >
      <div className="add-restaurant">
        <div className="image">
          <div className="added-image">
            {image ? (
              <div className="uploaded">
                <CheckCircleOutlineIcon style={{ fontSize: "100px" }} />
                <p>Image Added</p>
              </div>
            ) : (
              <img src={imgURL} alt="No image" />
            )}
          </div>
          {/* <input type="file" name="" id="" /> */}
          <input
            type="file"
            id="add-image"
            name="resImage"
            className="inp-img"
            ref={fileInputRef}
            style={{ display: "none" }} // Hide the default file input
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
          <div className="add-img">
            <button className="upload-btn" onClick={handleIconClick}>
              Upload
            </button>
            {image ? (
              ""
            ) : (
              <p>
                Add image <p className="error"> *</p>
              </p>
            )}
          </div>
        </div>
        <div className="res-content-parent">
          <div className="res-content">
            <div className="inp-row">
              <p>
                Name of Restaurent<span className="error">*</span> :
              </p>
              <input
                type="text"
                name="name"
                id="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="inp-row">
              <p>
                Food type<span className="error">*</span> :{" "}
              </p>
              <select
                name="foodType"
                id=""
                onChange={(e) => setMealType(e.target.value)}
              >
                <option value="fastfood">FastFood</option>
                <option value="Dining">Dining</option>
                <option value="both">All type</option>
              </select>
            </div>
            <div className="inp-row">
              <p>
                Price per person<span className="error">*</span> :{" "}
              </p>
              <input
                type="text"
                name="price"
                id="price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="inp-row">
              <p>
                Description<span className="error">*</span> :{" "}
              </p>
              <input
                type="text"
                name="description"
                id=""
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="inp-row">
              <p>
                Location<span className="error">*</span> :{" "}
              </p>
              <input
                type="text"
                name="location"
                id=""
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
          <div className={error ? "error" : "invisible"}>
            <p>{error}</p>
          </div>
        </div>

        <div className="add-btns">
          <button className="add" onClick={handleSubmit}>
            Add
          </button>
          <div className="cancel" onClick={handleClose}>
            Cancel
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default AddNew;
