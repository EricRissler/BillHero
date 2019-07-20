const express = require("express");
const bodyParser = require("body-parser");
const apiroutes = require("./routes/apiRoutes");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authData, status, catid, cred, prod"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
  next();
});

app.use("/api", apiroutes);

module.exports = app;
