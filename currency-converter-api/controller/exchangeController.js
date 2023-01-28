const { EXCHANGE_KEY } = process.env;
const ExchangeRate = require("../model/exchangeRate");

var myHeaders = new Headers();
myHeaders.append("apikey", process.env.KEY || EXCHANGE_KEY);

var requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders,
};

exports.get = (reqObj) => {
  return ExchangeRate.findOne(reqObj)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

exports.post = (req, res) => {
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
        this.get({ to: to, from: from })
          .then((resp) => {
            if (resp == null) {
              ExchangeRate.create(updateObj)
                .then((result) => {
                  console.log(result);
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              ExchangeRate.updateOne(updateObj)
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
      this.get({ to: to, from: from })
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
};
