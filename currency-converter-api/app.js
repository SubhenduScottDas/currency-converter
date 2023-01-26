const express = require("express");
const dotenv = require("dotenv").config();
// const cron = require("node-cron");
const { EXCHANGE_KEY } = process.env;
const app = express();
const cors = require("cors");
let symbol = require("./model/symbol");
// let exchangeRate = require("./model/exchangeRate");

app.use(cors());
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
    result = JSON.parse(result);
    if (result["success"] == true) {
      let sym = Object.keys(result["symbols"]).sort();
      let symbolArr = [];
      for (let i = 0; i < sym.length; i++) {
        symbolArr.push({
          symbol: sym[i],
          denomination: result.symbols[sym[i]],
        });
      }
      symbol = symbolArr;
    }
    console.log(symbol);
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

app.post("/convert", async (req, res) => {
  let to = req.body.to;
  let from = req.body.from;
  let amount = req.body.amount;
  fetch(
    `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      result = JSON.parse(result);
      if (result["success"] == true) {
        console.log(result);
        res.send({
          to: to,
          from: from,
          amount: amount,
          rate: result["info"]["rate"],
          date: result["date"],
          result: result["result"],
        });
      }
    })
    .catch((error) => console.log("error", error));
});

module.exports = app;
