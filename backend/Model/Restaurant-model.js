import mongoose from "mongoose";

const newSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  name: {
    type: String,
  },
  mealType: {
    type: String,
  },
  price: {
    type: String,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
  },
});

const RestaurantModel = mongoose.model("RestaurantModel ", newSchema);

export { RestaurantModel };
