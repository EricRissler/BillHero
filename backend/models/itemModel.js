const commercialUserModel = (seqelize, type) => {
  return seqelize.define("items", {
    id: {
      type: type.CHAR(8),
      primaryKey: true,
      unique: true,
      defaultValue: type.UUIDV1
    },
    billID: {
      type: type.CHAR(8),
      allowNull: false
    },
    itemName: {
      type: type.STRING,
      allowNull: false
    },
    itemPrice: {
      type: type.DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    itemAmount: {
      type: type.DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  });
};

module.exports = commercialUserModel;
