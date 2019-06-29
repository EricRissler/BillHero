const commercialUser = require("../sequelize").commercialUser;
const adress = require("../sequelize").adress;
const bcrypt = require("bcrypt");


const getUser = function (req, res) {
  //authentification is very simple
  const data = {
    email: req.body.email,
    password: req.body.password
  };
  commercialUser
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
            longname: user.longname,
            shortname: user.shortname,
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
    longname: req.body.longname,
    shortname: req.body.shortname,
    email: req.body.email,
    password: req.body.password,
    strHouseNr: req.body.strHouseNr,
    additonal: req.body.additonal,
    zip: req.body.zip,
    city: req.body.city,
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

  commercialUser
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
                commercialUser
                  .create({
                    longname: data.longname,
                    shortname: data.shortname,
                    email: data.email,
                    password: hash,
                    idAdress: result.id
                  })
                  .then(function (result) {
                    console.log("Created User");
                    res.status(201).json("User created");
                  });
              },
              err => {
                res.status(500).json({
                  message
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

module.exports = {
  get: getUser,
  post: postUser
};
