const userPaymentMethodModel = (sequelize, type) => {
  return sequelize.define("userPaymentMethod", {
    id: {
      type: type.CHAR(18),
      primaryKey: true,
      unique: true,
      defaultValue: type.UUIDV1
    },
    idUser: {
      type: type.INTEGER,
      allownull: false
    },
    name: {
      type: type.STRING,
      allownull: false
    },
    token: {
      type: type.STRING,
      allownull: false
    },
    isHistorical: {
      type: type.BOOLEAN,
      defaultValue: false
    }
  });
};
module.exports = userPaymentMethodModel;
