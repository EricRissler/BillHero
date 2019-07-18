const categoryModel = (seqelize, type) => {
  return seqelize.define("category", {
    id: {
      type: type.CHAR(18),
      primaryKey: true,
      unique: true,
      defaultValue: type.UUIDV1
    },
    idUser: {
      type: type.CHAR(18),
      allowNull: false
    },
    name: {
      type: type.STRING,
      allowNull: false
    },
    isHitorical: {
      type: type.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });
};
module.exports = categoryModel;
