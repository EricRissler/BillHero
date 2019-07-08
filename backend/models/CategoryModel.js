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
      allowNulll: false
    },
    name: {
      type: type.STRING,
      allowNulll: false
    },
    isHitorical: {
      type: type.BOOLEAN,
      allowNulll: false,
      defaultValue: false
    }
  })
}
module.exports = categoryModel;
