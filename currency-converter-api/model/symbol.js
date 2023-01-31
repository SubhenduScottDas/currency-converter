const mongoose = require('mongoose');
const symbolSchema = new mongoose.Schema({
    symbol: String,
    denomination: String
});

module.exports = mongoose.model('symbol', symbolSchema);