const privateUser = require("../sequelize").privateUser;
const adress = require("../sequelize").adress;
const bcrypt = require("bcrypt");
const userpayment = require("../sequelize").userPaymentMethod;

const getUser = function(req, res) {
  console.log(req.headers);
  const authdata = req.header("authData").split(":");
  const data = {
    email: authdata[0],
    password: authdata[1]
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
      bcrypt.compare(data.password, user.password).then(
        result => {
          if (
            user.idFavPaymentOne != null &&
            user.idFavPaymentOne != undefined
          ) {
            userpayment
              .findOne({
                where: {
                  id: idFavPaymentOne
                }
              })
              .then(favPaymentOne => {
                user.nameFavPaymentOne = favPaymentOne.name;
              });
          }
          if (
            user.idFavPaymentTwp != null &&
            user.idFavPaymentTwo != undefined
          ) {
            userpayment
              .findOne({
                where: {
                  id: idFavPaymentTwo
                }
              })
              .then(favPaymentTwo => {
                user.nameFavPaymentTwo = favPaymentTwo.name;
              });
          }
          res.status(200).json({
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            birthdate: user.birthdate,
            nationality: user.nationality,
            email: user.email,
            idFavPaymentOne: user.idFavPaymentOne,
            nameFavPaymentOne: user.nameFavPaymentOne,
            idFavPaymentTwo: user.idFavPaymentTwo,
            nameFavPaymentTwo: user.nameFavPaymentTwo
          });
        },
        err => {
          res.status(404).json({
            message: "Invalid Userdata"
          });
        }
      );
    });
};

const postUser = function(req, res) {
  const BCYRPT_SALTROUNDS = 12;
  const data = {
    country: req.body.country,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    nationality: req.body.nationality,
    strHouseNr: req.body.strHouseNr,
    additional: req.body.additional,
    zip: req.body.zip,
    city: req.body.city,
    bdate: req.body.bdate
  };
  console.log("Yay im Server");
  console.log(data);

  //Prüfen ob alle Felder gefüllt sind
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
            additonal: data.additional
          })
          .then(function(result) {
            console.log("Created Adress");
            bcrypt.hash(data.password, BCYRPT_SALTROUNDS).then(
              hash => {
                privateUser
                  .create({
                    firstname: data.firstname,
                    lastname: data.lastname,
                    birthdate: data.bdate,
                    nationality: data.nationality,
                    email: data.email,
                    password: hash,
                    idAdress: result.id
                  })
                  .then(result => {
                    console.log("Created User");
                    res.status(201).json({
                      message: "User created",
                      uid: result.id
                    });
                  });
              },
              err => {
                res.status(500).json({
                  message: err
                });
              }
            );
          })
          .catch(err => {
            res.status(501).json(err);
            console.log(err);
          });
      }
    });
};
//TODO: get commercial and private user
const getByID = function(req, res) {
  const reqID = req.params.uid;
  privateUser
    .findOne({
      where: {
        id: reqID
      }
    })
    .then(result => {
      if (result == null) {
        res.status(400).json({
          message: "User not found"
        });
        return;
      } else {
        res.status(200).json({
          message: "User  found",
          user: result
        });
      }
    });
};

module.exports = {
  get: getUser,
  post: postUser,
  getByID: getByID
};
