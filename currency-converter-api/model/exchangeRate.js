const mongoose = require('mongoose');
const exchangeRateSchema = new mongoose.Schema({
    to: String,
    from: String,
    amount: String,
    date: String,
    rate: String,
    result: String
});

module.exports = mongoose.model('exchangeRate', exchangeRateSchema);