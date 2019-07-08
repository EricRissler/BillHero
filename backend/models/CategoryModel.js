const categoryModel = (seqelize, type) => {
  return seqelize.define("category", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    idUser: {
      type: type.INTEGER,
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
