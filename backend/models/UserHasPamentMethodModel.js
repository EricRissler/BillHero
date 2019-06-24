const mongoose = require("mongoose");

const UserHasPaymentMethodSchema = mongoose.Schema({
    IDUser: { type: String, required: true },
    IDPaymentMethod: { type: String, required: true },
    toke: { Type: String, required: true }
});


module.exports = mongoose.model("UserHasPaymentMethod", UserHasPaymentMethodSchema);