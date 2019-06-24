const mongoose = require("mongoose");

const BillSchema = mongoose.Schema({
    IDDebitor: { type: String, required: true },
    IDCreditor: { type: String, required: true },
    IDCategory: { type: String, required: false },
    IDPayedWith: { type: String, required: false },
    total: { type: Double, required: true },
    billNo: { type: String, required: false },
    date: { type: timestamp, required: true },
    accountingPeriod: { type: timestamp, require: true },
    PayedStatus: { type: String, required: true }
});

module.exports = mongoose.model("bill", BillSchema);