import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";
import multer from "multer";
import { GridFSBucket } from "mongodb";
import { RestaurantModel } from "./Model/Restaurant-model.js";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// MongoDB connection
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
mongoose
  .connect(
    `mongodb+srv://${USER}:${PASSWORD}@cluster0.09ugt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    if (!err.data?.message) {
      console.log(err);
      console.log("Server error please try later!");
    }
  });

const storage = multer.diskStorage({
  destination: (req, image, cb) => {
    cb(null, "public/Images");
  },
  filename: (req, image, cb) => {
    cb(
      null,
      image.fieldname + "_" + Date.now() + path.extname(image.originalname)
    );
  },
}); // Store files in memory
const upload = multer({ storage: storage });

// Attach middleware to handle file uploads
app.use("/add-new-res", upload.single("image"), async (req, res) => {
  // Add file upload handling logic here if needed

  await RestaurantModel.create({
    ...req.body,
    image: req.file ? req.file.filename : null,
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(req.file);
});

app.put("/update-res/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // If a new file is uploaded, add it to the update data
    if (req.file) {
      updateData.image = req.file.filename;
    }

    // Update the restaurant record
    const result = await RestaurantModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }

  console.log(req.file);
});

app.get("/get-restaurants", async (req, res) => {
  try {
    await RestaurantModel.find().then((result) => {
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
});

app.post("/delete-restaurant", async (req, res) => {
  console.log(req.body.id);
  await RestaurantModel.deleteOne({ _id: req.body.id })
    .then((result) => {
      res.status(200).send({ success: true, msg: "Restaurant deleted" });
    })
    .catch((error) => {
      res
        .status(400)
        .send({ success: false, msg: "Something went wrong", error: error });
    });
});

app.get("/get-one-restaurant", async (req, res) => {
  try {
    const id = req.query.id;
    console.log(id);
    await RestaurantModel.findOne({ _id: id }).then((result) => {
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
});

// Use routes
app.get('/', (req, res)=>{
  res.send("Server is running");
}
// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
