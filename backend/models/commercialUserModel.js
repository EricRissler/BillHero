const commercialUserModel = (seqelize, type) => {
  return seqelize.define("commercialUser", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    longname: {
      type: type.STRING,
      allowNull: false
    },
    shortname: {
      type: type.STRING,
      allowNull: false
    },
    email: {
      type: type.STRING,
      allowNull: false
    },
    password: {
      type: type.STRING,
      allowNull: false
    },
    incomingPaymentToken: {
      type: type.STRING
    },
    idAdress: {
      type: type.INTEGER
    }
  });
};
module.exports = commercialUserModel;
