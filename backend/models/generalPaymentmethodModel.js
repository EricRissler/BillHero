const generalPaymentMethodModel = (sequelize, type) => {
  return sequelize.define("generalPaymentMethod", {
    id: {
      type: type.CHAR(8),
      primaryKey: true,
      unique: true,
      defaultValue: type.UUIDV1
    },
    name: {
      type: type.STRING,
      allowNull: false
    },
    //Not used in this prototype, probably needed for productive use, eg url of specific paymentProvider
    data: {
      type: type.STRING,
      allowNull: false
    }
  });
};

module.exports = generalPaymentMethodModel;
