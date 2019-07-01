const commercialUserModel = (seqelize, type) => {
  return seqelize.define("items", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    billID: {
      type: type.INTEGER,
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
