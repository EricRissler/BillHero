const adressModel = (seqelize, type) => {
  return seqelize.define("adress", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    strHouseNr: {
      type: type.STRING,
      allowNulll: false
    },
    zipCode: {
      type: type.STRING,
      allowNulll: false
    },
    city: {
      type: type.STRING,
      allowNulll: false
    },
    country: {
      type: type.STRING,
      allowNulll: false
    },
    additonal: {
      type: type.STRING,
      allowNulll: true
    },
  })
}
module.exports = adressModel;