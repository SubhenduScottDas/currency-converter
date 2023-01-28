const http = require("http");
const mongoose = require("mongoose");

const app = require("./app");

mongoose
  .connect("mongodb://127.0.0.1:27017/currency")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error Connecting to Database... ", err));



const symbolSchema = new mongoose.Schema({
    symbol: String,
    denomination: String
});

const server = http.createServer(app);
const { API_PORT } = process.env;

const port = process.env.PORT || API_PORT;

server.listen(port, () => {
  console.log(`Running on port: ${port}`);
});
