const express = require("express");
const bodyParser = require("body-parser");
const apiRoutes = require("./api-routes");
const htmlRoutes = require("./html-routes");
//https://medium.com/@dinyangetoh/how-to-build-simple-restful-api-with-nodejs-expressjs-and-mongodb-99348012925d
//https://medium.com/@paigen11/sequelize-the-orm-for-sql-databases-with-nodejs-daa7c6d5aca3
const app = express();
const con = mysql.createConnection({
  host: "db4free.net",
  user: "bill_hero_admin",
  password: "billiboi",
  database: "bill_hero"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => res.send("Hello World with Express"));
app.use("/api", apiRoutes);
app.use("/html", htmlRoutes);
module.exports = app;
