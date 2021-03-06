const billModel = (sequelize, type) => {
  return sequelize.define("bill", {
    id: {
      type: type.CHAR(8),
      primaryKey: true,
      unique: true,
      defaultValue: type.UUIDV1
    },
    idDebitor: {
      type: type.CHAR(8),
      allowNull: false
    },
    idCreditor: {
      type: type.CHAR(8),
      allowNull: false
    },
    amount: {
      type: type.DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    billNr: {
      type: type.STRING,
      allowNull: true
    },
    date: {
      type: type.STRING,
      allowNull: true
    },
    deadline: {
      type: type.STRING,
      allowNull: false
    },
    paymentStatus: {
      type: type.BOOLEAN,
      defaultValue: false
    },
    idPayedWith: {
      type: type.CHAR(8),
      allowNull: true
    },
    idCategory: {
      type: type.CHAR(8),
      allowNull: true
    }
  });
};

module.exports = billModel;
