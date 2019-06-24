const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    prename: { type: String, required: true },
    surname: { type: String, required: true },
    flagDebitor: { type: Boolean, required: true },
    flagCreditor: { type: Boolean, required: true },
    mailAdress: { type: String, required: true },
    password: { type: String, required: true },
    IDDefaultPaymentMethod: { type: String, required: true },


});

module.exports = mongoose.model("user", userSchema);