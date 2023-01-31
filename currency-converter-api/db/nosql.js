const mongoose = require("mongoose");

exports.connect = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/currency")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Error Connecting to Database... ", err));
}

//Create and execute checkconnecion for fault tolerance
