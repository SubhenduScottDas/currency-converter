// fetch("https://api.apilayer.com/exchangerates_data/latest", requestOptions)
//   .then((response) => response.text())
//   .then((result) => {
//     exchangeRate = result;
//     console.log(result);
//   })
//   .catch((error) => console.log("error", error));


//   fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
//   .then((response) => response.text())
//   .then((result) => {
//     if (result.success == true) symbol = Object.keys(result.symbols);
//     let exchanges = [];
//     for (let i = 0; i < symbol.length; i++) {
//       fetch(
//         `https://api.apilayer.com/exchangerates_data/latest?base=${symbol[i]}`,
//         requestOptions
//       )
//         .then((response) => response.text())
//         .then((result) => {
//           if (result.success == true)
//             exchanges.push({ base: result.base, rates: result.rates });
//           console.log(result);
//         })
//         .catch((error) => console.log("error", error));
//     }
//     exchangeRate = exchanges;
//     console.log("SYMBOLS:", symbol);
//     console.log("RATES:", exchangeRate);
//   })
//   .catch((error) => console.log("error", error));

// cron.schedule("*/10 * * * * *", function () {
//   fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// });
