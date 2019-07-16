const paymentProvider = require("../paymentprovider/paymentprovider");
const commercialUserModel = (seqelize, type) => {
  return seqelize.define("commercialUser", {
    id: {
      type: type.CHAR(18),
      primaryKey: true,
      unique: true,
      defaultValue: type.UUIDV1
    },
    longname: {
      type: type.STRING,
      allowNull: false
    },
    shortname: {
      type: type.STRING,
      allowNull: false
    },
    email: {
      type: type.STRING,
      allowNull: false
    },
    password: {
      type: type.STRING,
      allowNull: false
    },
    incomingPaymentToken: {
      type: type.STRING,
      defaultValue: paymentProvider.registerPaymentmethod
    },
    idAdress: {
      type: type.CHAR(18)
    }
  });
};
module.exports = commercialUserModel;
