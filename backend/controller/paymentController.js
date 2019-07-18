const generalPayments = require("../sequelize").generalPaymentMethod;
const prvuser = require("../sequelize").privateUser;
const userPayment = require("../sequelize").userPaymentMethod;
const paymentProvider = require("../paymentprovider/paymentprovider");

const postPayment = function (req, resp) {
  prvID = req.params.uid;
  genPaymentID = req.body.genPaymentID;
  nameP = req.body.nameP;
  data = req.body.data;
  prvuser
    .findOne({
      where: {
        id: prvID
      }
    })
    .then(result => {
      if (result == null) {
        resp.status(404).json({
          message: "User not found"
        });
      } else {
        if (
          genPaymentID != undefined &&
          nameP != undefined &&
          data != undefined
        ) {
          //const datarray = data.split(":");
          if (genPaymentID == 1) {
            //is Sepa
            generalPayments
              .findOne({
                where: { name: "SEPA" }
              })
              .then(resgPay => {
                const gPayID = resgPay.id;
                const token = paymentProvider.registerPaymentmethod(
                  result.name,
                  data
                );
                userPayment
                  .create({
                    idUser: prvID,
                    idPaymentMethod: gPayID,
                    name: nameP,
                    token: token
                  })
                  .then(resPay => {
                    resp.status(201).json({
                      message: "SEPA created",
                      paymentMethod: resPay
                    });
                  });
              });
          } else if (genPaymentID == 2) {
            //is DebitCard
            generalPayments
              .findOne({
                where: { name: "DebitCard" }
              })
              .then(resgPay => {
                const gPayID = resgPay.id;
                const token = paymentProvider.registerPaymentmethod(
                  result.name,
                  data
                );
                userPayment
                  .create({
                    idUser: prvID,
                    idPaymentMethod: gPayID,
                    name: nameP,
                    token: token
                  })
                  .then(resPay => {
                    resp.status(201).json({
                      message: "DebitCard created",
                      paymentMethod: resPay
                    });
                  });
              });
          } else {
            resp.status(400).json({ message: "invalid genpayment" });
          }
        } else {
          resp.status(400).json({ message: "keys undefined" });
        }
      }
    });
};

const getPayments = function (req, res) {
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

const deletePayment = function (req, res) {
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
