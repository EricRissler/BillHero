const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect(
    "mongodb+srv://admin:EQs3mlnHF1DQQHCR@mean-czp2d.mongodb.net/BillHero?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Succesfully connected to Database");
  })
  .catch(err => {
    console.log("Failed to Connect to Database");
    console.log(err);
    //die("Bye");
  });

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.get("/api/signin", function(req, res, next) {
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
    Anz: 4,
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
      },
      {
        RechnungsID: "B_jkl",
        KreditorenID: "U_789",
        DebitorenID: "U_123",
        Status: "PAYED",
        Betrag: "1308.04",
        Frist: "2019.07.13",
        FavPayB: "P_nmo"
      },
      {
        RechnungsID: "B_963",
        KreditorenID: "U__789",
        DebitorenID: "U_123",
        Status: "PAYED",
        Betrag: "13.04",
        Frist: "2019.07.23",
        FavPayB: "P_nmo"
      }
    ]
  });
});

module.exports = app;
