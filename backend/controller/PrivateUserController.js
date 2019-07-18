const privateUser = require("../sequelize").privateUser;
const adress = require("../sequelize").adress;
const bcrypt = require("bcrypt");
const userpayment = require("../sequelize").userPaymentMethod;

const getUser = function (req, res) {
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

          userpayment
            .findOne({
              where: {
                id: user.idFavPaymentOne
              }
            })
            .then(favPaymentOne => {
              let favname1;
              if (favPaymentOne == null) {
                favname1 = "";
              } else {
                favname1 = favPaymentOne.name;
              }
              user.nameFavPaymentOne = favname1;

              userpayment
                .findOne({
                  where: {
                    id: user.idFavPaymentTwo
                  }
                })
                .then(favPaymentTwo => {
                  let favname2;
                  if (favPaymentTwo == null) {
                    favname2 = "";
                  } else {
                    favname2 = favPaymentTwo.name;
                  }
                  user.nameFavPaymentTwo = favname2;

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
                });
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
    additional: req.body.additional,
    zip: req.body.zip,
    city: req.body.city,
    bdate: req.body.bdate
  };

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
          .then(function (result) {
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
          });
      }
    });
};
//TODO: get commercial and private user
const getByID = function (req, res) {
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

const putUser = function (req, res) {
  let IDfavOne = req.body.IDfavPaymentOne;
  let IDfavTwo = req.body.IDfavPaymentTWO;
  const uid = req.params.uid;
  privateUser.findOne({
    where: {
      id: uid
    }
  }).then(user => {
    if (user == null) {
      res.status(404).send();
    } else {
      if (IDfavOne == null || IDfavOne == "" || IDfavOne == undefined) {
        IDfavOne = user.idFavPaymentOne;
      }
      if (IDfavTwo == null || IDfavTwo == "" || IDfavTwo == undefined) {
        IDfavTwo = user.idFavPaymentTwo;
      }
      privateUser.update({
        where: {
          id: uid
        },
        idFavPaymentOne: IDfavOne,
        idFavPaymentTwo: IDfavTwo
      }).then(result => {
        res.status(201).json({
          message: "Paymentmethod changed",
          user: result
        })
      })

    }

  })

}

module.exports = {
  get: getUser,
  post: postUser,
  getByID: getByID
};