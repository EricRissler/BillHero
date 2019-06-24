const mongoose = require("mongoose");

const generalPaymentMethodSchema = mongoose.Schema({
    name: { type: String, required: true },
    apiURL1: { type: String, required: true },
    apiURL2: { type: String, required: false }
});

module.exports = mongoose.model("generalPaymentMethod", generalPaymentMethodSchema);