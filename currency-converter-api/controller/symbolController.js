// const cron = require("node-cron");
const { EXCHANGE_KEY } = process.env;
const Symbol = require("../model/symbol");

var myHeaders = new Headers();
myHeaders.append("apikey", process.env.KEY || EXCHANGE_KEY);

var requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders,
};

exports.insert = () => {
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
        Symbol.deleteMany({})
          .then(() => {
            Symbol.insertMany(symbolArr, function (error) {
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
};

exports.get = (req, res) => {
  Symbol.find({})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("error", err);
      res.send(err);
    });
};
