const express = require("express");
const dotenv = require("dotenv").config();
// const cron = require("node-cron");
const app = express();
const cors = require("cors");

const SymbolController = require("./controller/symbolController")
const ExchangeController = require("./controller/exchangeController")

app.use(cors());
app.use(express.json());

//ADD CRON JOB TO UPDATE SYMBOLS TO DB ONCE EVERY DAY. REDUCES CALLS TO API TO MAX 31 PER MONTH//
// SymbolController.insert();

app.get("/", async (req, res) => {
  console.log("I'm here at the start...");
  res.send("Welcome to Currency Factory");
});

app.get("/welcome", async (req, res) => {
  let name = req.body.name;
  console.log(req.body);
  if (!name) return res.status(200).send("Hello Anonymous");

  return res.status(300).send(`Hello ${name}`);
});

app.get("/currency", async (req, res) => {
  SymbolController.get(req, res);
});

app.post("/convert", async (req, res) => {
  ExchangeController.post(req, res);
});

module.exports = app;
