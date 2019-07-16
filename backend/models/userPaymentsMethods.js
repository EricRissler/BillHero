const paymentrregister = require("../paymentprovider/paymentprovider");
const userPaymentMethodModel = (sequelize, type) => {
  return sequelize.define("userPaymentMethod", {
    id: {
      type: type.CHAR(18),
      primaryKey: true,
      unique: true,
      defaultValue: type.UUIDV1
    },
    idUser: {
      type: type.CHAR(18),
      allownull: false
    },
    idPaymentMethod: {
      type: type.CHAR(18),
      allownull: false
    },
    name: {
      type: type.STRING,
      allownull: false
    },
    //TODO: Testen, wenn nicht funktional. erstellen des Tokens in aufrufender Methode
    token: {
      type: type.STRING,
      allownull: false /*,
      defaultValue: paymentrregister.registerPaymentmethod*/
    },
    isHistorical: {
      type: type.BOOLEAN,
      defaultValue: false
    }
  });
};
module.exports = userPaymentMethodModel;
