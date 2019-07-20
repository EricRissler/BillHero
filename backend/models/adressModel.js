const adressModel = (seqelize, type) => {
  return seqelize.define("adress", {
    id: {
      type: type.CHAR(10),
      primaryKey: true,
      unique: true,
      defaultValue: type.UUIDV1
    },
    strHouseNr: {
      type: type.STRING,
      allowNull: false
    },
    zipCode: {
      type: type.STRING,
      allowNull: false
    },
    city: {
      type: type.STRING,
      allowNull: false
    },
    country: {
      type: type.STRING,
      allowNull: false
    },
    additonal: {
      type: type.STRING,
      allowNull: true
    }
  });
};
module.exports = adressModel;
