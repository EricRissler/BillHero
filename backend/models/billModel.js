const billModel = (sequelize, type) => {
  return sequelize.define("bill", {
    id: {
      type: type.CHAR(18),
      primaryKey: true,
      unique: true,
      defaultValue: type.UUIDV1
    },
    idDebitor: {
      type: type.CHAR(18),
      allownull: false
    },
    idCreditor: {
      type: type.CHAR(18),
      allownull: false
    },
    amount: {
      type: type.DataTypes.DECIMAL(10, 2),
      allownull: false
    },
    billNr: {
      type: type.STRING,
      allownull: true
    },
    date: {
      type: type.STRING,
      allownull: false,
      default: Date.now()
    },
    deadline: {
      type: type.STRING,
      allownull: false
    },
    paymentStatus: {
      type: type.STRING,
      defaultValue: "unpayed"
    },
    idPayedWith: {
      type: type.CHAR(18),
      allownull: true,
    },
    idCategory: {
      type: type.CHAR(18),
      allownull: true
    }

  });
};

module.exports = billModel;
