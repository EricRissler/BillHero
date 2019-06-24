const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
    IDBill: { type: String, required: true },
    IDName: { type: String, req: true },
    price: { type: Double, required: true },
    amount: { type: String, required: true }
});

module.exports = mongoose.model("item", itemSchema);