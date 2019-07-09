const privatUserModel = (seqelize, type) => {
  return seqelize.define("privateUser", {
    id: {
      type: type.CHAR(18),
      primaryKey: true,
      unique: true,
      defaultValue: type.UUIDV1
    },
    firstname: {
      type: type.STRING,
      allowNull: false
    },
    lastname: {
      type: type.STRING,
      allowNull: false
    },
    birthdate: { //TODO:in dm einfügen
      type: type.STRING,
      allowNull: false
    },
    nationality: { //TODO:in dm einfügen
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
    idAdress: {
      type: type.INTEGER
    }
  });
};
module.exports = privatUserModel;
