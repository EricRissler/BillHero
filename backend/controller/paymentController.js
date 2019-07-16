const generalPayments = require("../sequelize").generalPaymentMethod;
const prvuser = require("../sequelize").privateUser;
const userPayment = require("../sequelize").userPaymentMethod;
const paymentProvider = require("../paymentprovider/paymentprovider");

const postPayment = function(req, res) {
  prvID = req.params.uid;
  genPaymentID = req.body.generalPaymentID;
  nameP = req.body.name;
  data = req.body.data;
  prvuser
    .findOne({
      where: {
        id: prvID
      }
    })
    .then(result => {
      if (result == null) {
        res.status(404).send();
      } else {
        if (
          genPaymentID != undefined &&
          nameP != undefined &&
          data != undefined
        ) {
          const data = data.split(":");
          if (genPaymentID == 1) {
            //is Sepa
            generalPayments
              .findOne({
                where: { name: "SEPA" }
              })
              .then(res => {
                const token = paymentProvider.registerPaymentmethod(
                  result.name,
                  data
                );
                userPayment.create(
                  {
                    idUser: prvID,
                    idPayment: res.id,
                    name: nameP,
                    token: token
                  }.then(resPay => {
                    res.status(201).json({
                      paymentMethod: resPay
                    });
                  })
                );
              });
          } else if (genPaymentID == 2) {
            generalPayments
              .findOne({
                where: { name: "DebitCard" }
              })
              .then(res => {
                const token = paymentProvider.registerPaymentmethod(
                  result.name,
                  data
                );
                userPayment.create(
                  {
                    idUser: prvID,
                    idPayment: res.id,
                    name: nameP,
                    token: token
                  }.then(resPay => {
                    res.status(201).json({
                      paymentMethod: resPay
                    });
                  })
                );
              });
          } else {
            res.status(400).send();
          }
        } else {
          res.status(400).send();
        }
      }
    });
};

const getPayments = function(req, res) {
  prvID = req.params.uid;
  userPayment
    .findAll({
      where: {
        idUser: prvID,
        isHistorical: false
      },
      raw: true
    })
    .then(result => {
      if (result.length == 0) {
        res.status(404).send();
      } else {
        res.status(200).json({
          payment: result
        });
      }
    });
};

const deletePayment = function(req, res) {
  prvID = req.params.uid;
  userPaymentID = req.body.paymentID;
  userPayment
    .update({
      isHistorical: true,
      where: { id: userPaymentID }
    })
    .then(result => {
      res.status(201).json({ payment: result });
    });
};

module.exports = {
  postPayment: postPayment,
  getPayments: getPayments,
  deletePayment: deletePayment
};
