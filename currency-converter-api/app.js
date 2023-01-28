const express = require("express");
const dotenv = require("dotenv").config();
// const cron = require("node-cron");
const { EXCHANGE_KEY } = process.env;
const app = express();
const cors = require("cors");
const symbol = require("./model/symbol");
const exchangeRate = require("./model/exchangeRate");

app.use(cors());
var myHeaders = new Headers();
myHeaders.append("apikey", process.env.KEY || EXCHANGE_KEY);

var requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders,
};

//ADD CRON JOB TO UPDATE SYMBOLS TO DB ONCE EVERY DAY. REDUCES CALLS TO API TO MAX 31 PER MONTH//
fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
  .then((response) => response.text())
  .then((result) => {
    console.log(result);
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
      symbol
        .deleteMany({})
        .then(() => {
          symbol.insertMany(symbolArr, function (error) {
            if (error) console.log(error);
            else {
              console.log("Symbols Created");
              console.log(symbolArr);
            }
          });
        })
        .catch((error) => console.log("error", error));
    }
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
  symbol
    .find({})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("error", error);
    });
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
        console.log("FROM API EXT:", result);
        let responseObj = {
          to: to,
          from: from,
          amount: amount,
          rate: result["info"]["rate"],
          date: result["date"],
          result: result["result"],
        };
        let updateObj = {
          to: to,
          from: from,
          rate: result["info"]["rate"],
          date: result["date"],
        };
        exchangeRate
          .findOne({ to: to, from: from })
          .then((resp) => {
            if (resp == null) {
              exchangeRate
                .create(updateObj)
                .then((result) => {
                  console.log(result);
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              exchangeRate
                .updateOne(updateObj)
                .then((result) => {
                  console.log(result);
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          })
          .catch((error) => {
            console.log(error);
          });

        res.send(responseObj);
      }
    })
    .catch((error) => {
      exchangeRate
        .findOne({ to: to, from: from })
        .then((resp) => {
          resp = { amount: amount, result: amount * resp["rate"], ...resp };
          console.log("error", error);
          console.log(resp);
          res.send(resp);
        })
        .catch((error) => {
          console.log("error", error);
        });
    });
});

module.exports = app;
