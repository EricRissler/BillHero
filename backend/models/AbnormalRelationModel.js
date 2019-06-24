const mongoose = require("mongoose");

const abnormalRelationshipSchema = mongoose.Schema({
    IDDebitor: { type: String, required: true },
    IDCreditor: { type: String, required: true },
    IDPaymentMethod: { type: String, required: false },
    IDreminder: { type: String, required: false },
})

module.exports = mongoose.model("abnormalRelationship", abnormalRelationshipSchema);