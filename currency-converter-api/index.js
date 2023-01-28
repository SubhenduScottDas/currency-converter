const http = require("http");
const app = require("./app");
const nosql = require("./db/nosql");
const mongoose = require("mongoose");

nosql.connect();
const symbolSchema = new mongoose.Schema({
    symbol: String,
    denomination: String
});

const Symbol = mongoose.model('Symbol', symbolSchema)
const server = http.createServer(app);
const { API_PORT } = process.env;

const port = process.env.PORT || API_PORT;

server.listen(port, () => {
  console.log(`Running on port: ${port}`);
});
