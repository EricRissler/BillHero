const generalPaymentMethodModel = (sequelize, type) => {
  return sequelize.define("generalPaymentMethod", {
    id: {
      type: type.CHAR(18),
      primaryKey: true,
      unique: true,
      defaultValue: type.UUIDV1
    },
    name: {
      type: type.STRING,
      allownull: false
    },
    //Not used in this prototype, probably needed for productive use, eg url of specific paymentProvider
    data: {
      type: type.STRING,
      allownull: false
    }
  });
};

module.exports = generalPaymentMethodModel;
