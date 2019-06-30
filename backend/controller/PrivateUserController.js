const privateUser = require("../sequelize").privateUser;
const adress = require("../sequelize").adress;
const bcrypt = require("bcrypt");

const getUser = function (req, res) {

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
      bcrypt.compare(data.password, user.password).then(
        result => {
          res.status(200).json({
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            birthdate: user.birthdate,
            nationality: user.nationality,
            email: user.email
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

const postUser = function (req, res) {
  const BCYRPT_SALTROUNDS = 12;
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
          .then(function (result) {
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
                  .then((result) => {
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
const getById = function (req, res) {

};
module.exports = {
  get: getUser,
  post: postUser,
  getById: getById
};
