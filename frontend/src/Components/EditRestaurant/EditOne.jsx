import React, { useEffect, useRef, useState } from "react";
import CloudUploadSharpIcon from "@mui/icons-material/CloudUploadSharp";
import "./EditOne.css";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import defaultImage from "../../Images/default.webp";
import { Dialog } from "@mui/material";
import { useNavigate } from "react-router";
import axios from "axios";
import { BASE_URL } from "../../Config/Config";
import { toast } from "react-toastify";

const EditOne = ({ id }) => {
  // Create a ref for the file input element
  console.log(id);
  const fileInputRef = useRef(null);
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const [image, setImage] = useState();
  const [name, setName] = useState("");
  const [mealType, setMealType] = useState("Dining");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [resDetail, setResDetail] = useState();
  const [imgURL, setImgURL] = useState(defaultImage);
  const [error, setError] = useState();

  useEffect(() => {
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
    if (!name || !price || !description || !location) {
      setError("Please fill required details");
    } else {
      const formData = new FormData();
      formData.append("name", resDetail?.name);
      formData.append("mealType", resDetail?.mealType);
      formData.append("price", resDetail?.price);
      formData.append("description", resDetail?.description);
      formData.append("location", resDetail?.location);
      formData.append("image", image || resDetail?.image); // Ensure `image` is a File object
      try {
        console.log(id);
        const response = await axios.put(
          `${BASE_URL}/update-res/${id}`,
          formData
        );

        if (response?.data) {
          handleClose();
          toast.success("Resataurant modified", {
            position: toast.POSITION.TOP_RIGHT,
          });
          console.log(response.data);
          console.log("Restaurant modified");
        } else {
          console.log("Failed to modify restaurant");
        }
      } catch (error) {
        console.error("Error adding restaurant:", error);
      }
    }
  };

  useEffect(() => {
    async function getRestaurant() {
      try {
        console.log(id);
        const response = await axios.get(`${BASE_URL}/get-one-restaurant`, {
          params: { id }, // Pass the id as a query parameter
        });
        setResDetail(response?.data);
        setName(response?.data.name);
        setMealType(response.data.mealType || "Dining");
        setPrice(response.data.price || "");
        setDescription(response.data.description || "");
        setLocation(response.data.location || "");
      } catch (error) {
        console.log(error);
      }
    }
    getRestaurant();
  }, []);

  return (
    <Dialog maxWidth={1000} open={open} onClose={handleClose}>
      <div className="add-restaurant">
        <div className="image">
          <div className="edit-image">
            {image ? (
              <div className="uploaded">
                <CheckCircleOutlineIcon style={{ fontSize: "100px" }} />
                <p>Image Added</p>
              </div>
            ) : (
              <img
                src={
                  resDetail?.image
                    ? `${BASE_URL}/Images/${resDetail?.image}`
                    : defaultImage
                }
                alt="No image"
              />
            )}
          </div>
          <input
            type="file"
            id="add-image"
            name="resImage"
            className="inp-img"
            ref={fileInputRef}
            style={{ display: "none" }} // Hide the default file input
            onChange={(e) => {
              // Handle file selection if needed
              setImage(e.target.files[0]);
              setResDetail((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }));
            }}
          />
          <div className="add-img">
            <button className="upload-btn" onClick={handleIconClick}>
              Upload
            </button>
          </div>
        </div>
        <div className="res-content-parent">
          <div className="res-content">
            <div className="inp-row">
              <p>
                Name of Restaurent<span className="error">*</span> :{" "}
              </p>
              <input
                type="text"
                name="name"
                id="name"
                value={resDetail?.name}
                onChange={(event) =>
                  setResDetail((prevState) => ({
                    ...prevState,
                    [event.target.name]: event.target.value,
                  }))
                }
              />
            </div>
            <div className="inp-row">
              <p>
                Food type<span className="error">*</span> :{" "}
              </p>
              <select
                name="foodType"
                id=""
                value={resDetail?.mealType}
                onChange={(event) =>
                  setResDetail((prevState) => ({
                    ...prevState,
                    [event.target.name]: event.target.value,
                  }))
                }
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
                value={resDetail?.price}
                onChange={(event) =>
                  setResDetail((prevState) => ({
                    ...prevState,
                    [event.target.name]: event.target.value,
                  }))
                }
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
                value={resDetail?.description}
                onChange={(event) =>
                  setResDetail((prevState) => ({
                    ...prevState,
                    [event.target.name]: event.target.value,
                  }))
                }
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
                value={resDetail?.location}
                onChange={(event) =>
                  setResDetail((prevState) => ({
                    ...prevState,
                    [event.target.name]: event.target.value,
                  }))
                }
              />
            </div>
          </div>
        </div>
        <div className={error ? "error" : "invisible"}>
          <p>{error}</p>
        </div>
        <div className="add-btns">
          <button className="add" onClick={handleSubmit}>
            Modify
          </button>
          <div className="cancel" onClick={handleClose}>
            Cancel
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default EditOne;
