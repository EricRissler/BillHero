const express = require("express");
const bodyParser = require("body-parser");
const mysql2 = require("mysql2");
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
    "Origin, X-Requested-With, Content-Type, Accept, authData"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api", apiroutes);
app.get("/", function(req, res, next) {
  //Input: E-Mail, Passwort
  res.status(201).json({
    Type: true,
    UserID: "U_123"
  });
});

app.get("/api/payBill", function(req, res, next) {
  //Input: UserID, RechnungsID, ZahlungsmethodeID
  res.status(201).json({
    Type: true,
    Message: ""
  });
});

app.get("/api/newCat", function(req, res, next) {
  //Input: Category_Name, UserID
  res.status(201).json({
    Type: true,
    UserID: "U_123"
  });
});

app.get("/api/BillDetail", (req, res, next) => {
  //Input: RechnungsID, UserID
  res.status(201).json({
    RechnungsID: "B_abc",
    KreditorenID: "U_456",
    DebitorenID: "U_123",
    Status: "UNPAYED",
    Betrag: "105.90",
    Frist: "2019.06.26",
    FavPayB: "P_xyz",
    Items: [
      {
        ItemID: "I_123",
        Name: "Wurst",
        Menge: 5.0,
        Preis: 3.99
      },
      {
        ItemID: "I_987",
        Name: "Käse",
        Menge: 9.0,
        Preis: 1.59
      }
    ]
  });
});

app.get("/api/dahsboard", function(req, res, next) {
  //Input: UserID
  res.status(201).json({
    User: {
      UserID: "U_123",
      Nachname: "Rissler",
      Vorname: "Eric",
      FavPayU: "P_298376"
    },
    Anz: 2,
    RechnungsHeader: [
      {
        RechnungsID: "B_abc",
        KreditorenID: "U_456",
        DebitorenID: "U_123",
        Status: "UNPAYED",
        Betrag: "105.90",
        Frist: "2019.06.26",
        FavPayB: "P_xyz"
      },
      {
        RechnungsID: "B_def",
        KreditorenID: "U_789",
        DebitorenID: "U_123",
        Status: "UNPAYED",
        Betrag: "1308.04",
        Frist: "2019.07.13",
        FavPayB: "P_nmo"
      }
    ]
  });
});
app.get("/api/buildPayBill", (req, res, next) => {
  //Input: UserID
  res.status(201).json({
    PayMethods: [
      {
        Name: "PayPal",
        ID: "P_nmo"
      },
      {
        Name: "Girokonto",
        ID: "P_qrs"
      }
    ]
  });
});
app.get("/api/mybills", function(req, res, next) {
  //Input: UserID
  res.status(201).json({
    RechnungsHeader: [
      {
        RechnungsID: "B_abc",
        KreditorenID: "U_456",
        DebitorenID: "U_123",
        Status: "UNPAYED",
        Betrag: "105.90",
        Frist: "2019.06.26",
        Status: "true"
      },
      {
        Name: "B_abc",
        Betrag: "105.90",
        Frist: "2019.06.26",
        Status: "true"
      },
      {
        Name: "B_abc",
        Betrag: "105.90",
        Frist: "2019.06.26",
        Status: "false"
      },
      {
        Name: "B_abc",
        Betrag: "105.90",
        Frist: "2019.06.26",
        Status: "false"
      }
    ]
  });
});

module.exports = app;
