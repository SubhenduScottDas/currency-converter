const express = require("express");
const dotenv = require("dotenv").config();
// const cron = require("node-cron");
const { EXCHANGE_KEY } = process.env;
const app = express();
let symbol = require("./model/symbol");
// let exchangeRate = require("./model/exchangeRate");

var myHeaders = new Headers();
myHeaders.append("apikey", process.env.KEY || EXCHANGE_KEY);

var requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders,
};

fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
  .then((response) => response.text())
  .then((result) => {
    symbol = result;
    console.log(result);
  })
  .catch((error) => console.log("error", error));

app.use(express.json());

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
  res.send(symbol);
});

app.get("/convert", async (req, res) => {
  let to = req.body.to;
  let from = req.body.from;
  let amount = req.body.amount;
  fetch(
    `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((error) => console.log("error", error));
});

module.exports = app;
