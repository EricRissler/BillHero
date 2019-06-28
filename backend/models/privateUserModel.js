const privatUserModel = (seqelize, type) => {
  return seqelize.define("privateUser", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    firstname: {
      type: type.STRING,
      allowNull: false
    },
    lastname: {
      type: type.STRING,
      allowNull: false
    },
    birthdate: {
      type: type.STRING,
      allowNull: false
    },
    nationality: {
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
