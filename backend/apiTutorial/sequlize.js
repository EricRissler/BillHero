const Sequelize = require("sequelize");
const contactModel = require("./models/contact");

const conn = new Sequelize("bill_hero", "bill_hero_admin", "billiboi", {
  host: "db4free.net",
  dialect: "mysql"
});

const contact = contactModel(conn, Sequelize);

conn.sync().then(() => {
  console.log("Users db and table have been created");
});

module.exports = contact;
