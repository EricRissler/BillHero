const generalPaymentMethodModel = (sequelize, type) => {
  return sequelize.define("generalPaymentMethod", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true
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
