const express = require("express");
const bodyParser = require("body-parser");
const init = require("./initdb");
const apiroutes = require("./routes/apiRoutes");

const app = express();

app.use(bodyParser.json());
/*app.use(bodyParser.urlencoded({
  extended: false
}));*/

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authData, status, catid, cred, prod"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});
app.use("/api/init", init);

app.use("/api", apiroutes);

module.exports = app;
