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
      allowNull: false
    },
    idPaymentMethod: {
      type: type.CHAR(18),
      allowNull: false
    },
    name: {
      type: type.STRING,
      allowNull: false
    },
    token: {
      type: type.STRING,
      allowNull: false,
      defaultValue: paymentrregister.registerPaymentmethod
    },
    isHistorical: {
      type: type.BOOLEAN,
      defaultValue: false
    }
  });
};
module.exports = userPaymentMethodModel;
