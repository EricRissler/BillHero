const commercialUserModel = (seqelize, type) => {
  return seqelize.define("items", {
    id: {
      type: type.CHAR(18),
      primaryKey: true,
      unique: true,
      defaultValue: type.UUIDV1
    },
    billID: {
      type: type.CHAR(18),
      allownull: false
    },
    itemName: {
      type: type.STRING,
      allownull: false
    },
    itemPrice: {
      type: type.DataTypes.DECIMAL(10, 2),
      allownull: false
    },
    itemAmount: {
      type: type.DataTypes.DECIMAL(10, 2),
      allownull: false
    }
  });
};

module.exports = commercialUserModel;
