import React from "react";
import "./EditRestaurant.css";
import { useParams } from "react-router-dom";
import AddNew from "../AddNew/AddNew";
import EditOne from "./EditOne";

const EditRestaurant = () => {
  const { id } = useParams();

  return (
    <div>
      {/* hello from edit{id} */}
      <EditOne id={id} />
    </div>
  );
};

export default EditRestaurant;
