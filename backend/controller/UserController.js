const privateUser = require("../sequelize").privateUser;
const adress = require("../sequelize").adress;
const bcrypt = require("bcrypt");

//FIXME:
const getUser = function(req, res) {
  //authentification is very simple
  const data = {
    email: req.body.email,
    password: req.body.password
  };
  privateUser
    .findOne({
      where: {
        email: data.email
      }
    })
    .then(user => {
      if (user == null) {
        res.status(404).json({
          message: "Invalid Userdata"
        });
        return;
      }
      if (user.password != null && user.password == data.password) {
        res.status(200).json({
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          birthdate: user.birthdate,
          nationality: user.nationality,
          email: user.email
        });
      } else {
        res.status(404).json({
          message: "Invalid Userdata"
        });
      }
    });
};

//TODO: Bcrypt hash einfügen
const postUser = function(req, res) {
  const SALTROUNDS = 12;
  const data = {
    country: req.body.country,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    nationality: req.body.nationality,
    strHouseNr: req.body.strHouseNr,
    additonal: req.body.additonal,
    zip: req.body.zip,
    city: req.body.city,
    telNr: req.body.telNr,
    bdate: req.body.bdate
  };
  //Prüfen ob alle Felder gefüllt sein
  for (var key in data) {
    if (data[key] == null || data[key] == "") {
      if (key == "additonal") {
        //Feld additonal darf leer sein
        continue;
      }
      res.status(422).json({
        message: "value in field" + key + "is missing"
      });
    }
  }

  privateUser
    .findOne({
      where: {
        email: data.email
      }
    })
    .then(user => {
      if (user != null) {
        res.status(409).json({
          message: "email already registered"
        });
      } else {
        adress
          .create({
            strHouseNr: data.strHouseNr,
            zipCode: data.zip,
            city: data.city,
            country: data.country,
            additonal: data.additonal
          })
          .then(function(result) {
            console.log("Created Adress");
            privateUser
              .create({
                firstname: data.firstname,
                lastname: data.lastname,
                birthdate: data.bdate,
                nationality: data.nationality,
                email: data.email,
                password: data.password,
                idAdress: result.id
              })
              .then(function(result) {
                console.log("Created User");
                res.status(201).json("Contact created");
              });
          })
          .catch(err => {
            res.status(501).json(err);
            console.log(err);
          });
      }
    });
};

module.exports = {
  get: getUser,
  post: postUser
};

exports.module = function(req, res) {
  contact.get((req, res) => {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    }
    res.json({
      status: "success",
      message: "Contacts recieved",
      data: contacts
    });
  });
};
