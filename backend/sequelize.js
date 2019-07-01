const Sequelize = require("sequelize");
const adressModel = require("./models/adressModel");
const categoryModel = require("./models/CategoryModel");
const privateUserModel = require("./models/privateUserModel");
const commercialUserModel = require("./models/commercialUserModel");
const billModel = require("./models/billModel");
const itemModel = require("./models/itemModel");
const generalPaymentMethodModel = require("./models/generalPaymentmethodModel");
const userPaymentMethodModel = require("./models/userPaymentsMethods");

const conn = new Sequelize("bill_hero", "bill_hero_admin", "billiboi", {
  host: "db4free.net",
  dialect: "mysql"
});

const adress = adressModel(conn, Sequelize);
const category = categoryModel(conn, Sequelize);
const privateUser = privateUserModel(conn, Sequelize);
const commercialUser = commercialUserModel(conn, Sequelize);
const bill = billModel(conn, Sequelize);
const item = itemModel(conn, Sequelize);
const generalPaymentMethod = generalPaymentMethodModel(conn, Sequelize);
const userPaymentMethod = userPaymentMethodModel(conn, Sequelize);

conn.sync().then(() => {
  console.log("Connected and synced to database");
});

module.exports = {
  adress: adress,
  category: category,
  privateUser: privateUser,
  commercialUser: commercialUser,
  bill: bill,
  item: item,
  generalPaymentMethod: generalPaymentMethod,
  userPaymentMethod: userPaymentMethod
};