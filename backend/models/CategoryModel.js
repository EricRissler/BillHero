const categoryModel = (seqelize, type) => {
  return seqelize.define("category", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    idUser: {
      type: type.STRING,
      allowNulll: false
    },
    name: {
      type: type.STRING,
      allowNulll: false
    }
  })
}
module.exports = categoryModel;
