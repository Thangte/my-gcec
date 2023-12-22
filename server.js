const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const studentRoute = require("./routes/studentRoute");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Static file
app.use(express.static(path.join(__dirname, "./client/build")));

const PORT = process.env.PORT || 7000;

app.use("/api/v1/student", studentRoute);

//rest api
app.get("*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} && Database connected`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
