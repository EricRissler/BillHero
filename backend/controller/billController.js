const bill = require("../sequelize").bill;
const commercialUser = require("../sequelize").commercialUser;
const privateUser = require("../sequelize").privateUser;
const paymentProvider = require("../paymentprovider/paymentprovider");

const postBill = function(req, res) {
  const data = {
    debID: req.params.uid,
    creID: req.body.creID,
    amount: req.body.amount,
    billNr: req.body.billNr,
    date: req.body.date,
    deadline: req.body.deadline
  };
  privateUser
    .findOne({
      where: {
        id: data.creID
      }
    })
    .then(prvuser => {
      if (prvuser == null) {
        res.status(404).json({
          message: "Creditor not found"
        });
        return;
      } else {
        commercialUser
          .findOne({
            where: {
              id: data.debID
            }
          })
          .then(comuser => {
            if (comuser == null) {
              res.status(404).json({
                message: "Debitor not found"
              });
              return;
            } else {
              if (data.date == "") {
                data.date = null;
              }
              bill
                .create({
                  idDebitor: data.debID,
                  idCreditor: data.creID,
                  amount: data.amount,
                  billNr: data.billNr,
                  date: data.date,
                  deadline: data.deadline
                })
                .then(result => {
                  res.status(201).json({
                    message: "Bill created succesfully",
                    bill: result
                  });
                });
            }
          });
      }
    });
};
//TODO: getBillS

const getBill = function(req, res) {
  const data = {
    uid: req.params.uid,
    bid: req.params.bid
  };
  bill
    .findOne({
      where: {
        id: data.bid,
        idDebitor: data.uid
      }
    })
    .then(result => {
      if (result == null) {
        res.status(404).json({
          message: "bill not found",
          bills: null
        });
      } else {
        res.status(200).json({
          message: "bill found",
          bill: result
        });
      }
    });
};

const getBills = function(req, res) {
  const uid = req.params.uid;
  const status = req.query.status;
  const catID = req.query.catid;
  const credName = req.query.cred;
  const prodName = req.query.prod;
  privateUser
    .findOne({
      where: { id: uid }
    })
    .then(result => {
      if (result == null) {
        res.status(404).send();
      } else {
        if (status != null) {
          bill
            .findAll({
              raw: true,
              where: {
                idCreditor: uid,
                paymentStatus: status
              }
            })
            .then(results => {
              if (results == null) {
                res.status(204).send();
              } else {
                res.status(200).json({
                  bills: results
                });
              }
            });
        } else if (catID != null) {
          bill
            .findAll({
              raw: true,
              where: {
                idCreditor: uid,
                idCategory: catID
              }
            })
            .then(results => {
              if (results == null) {
                res.status(204).send();
              } else {
                res.status(200).json({
                  bills: results
                });
              }
            });
        } else if (credName != null) {
          //TODO:
        } else if (prodName != null) {
          //TODO:
        } else {
          bill.findAll({
            raw: true,
            where: {
              idCreditor: uid
            }.then(results => {
              if (results == null) {
                res.status(204).send();
              } else {
                res.status(200).json({
                  bills: results
                });
              }
            })
          });
        }
      }
    });
};
//TODO: Testen
const putBill = function(req, res) {
  const data = {
    userID: req.params.uid,
    billID: req.params.bid,
    catID: req.body.categoryID,
    paymentID: req.body.paymentID
  };
  if (data.paymentID == undefined && data.catID == undefined) {
    res.status(406).send();
  } else {
    bill
      .findOne({
        where: {
          id: data.billID,
          idCreditor: data.userID
        }
      })
      .then(result => {
        if (result == null) {
          res.status(404).json({
            message: "User doesn't has bill with given billID"
          });
        } else {
          if (data.catID != undefined) {
            result.update({
              idCategory: data.catID
            });
            res.status(200).send();
          } else if (data.paymentID != undefined) {
            //TODO: get paymenttopkens from creditor and debitor
            if (
              paymentProvider.payBill(
                result.idCreditor,
                result.idDebitor,
                result.amount
              )
            ) {
              result.update({
                idPayedWith: data.paymentID,
                paymentStatus: true
              });
              res.status(200).send();
            } else {
              res.status(409).json({
                message:
                  "Payment was denied by Paymentprovider. Please check your account data for used Paymentmethod"
              });
            }
          }
        }
      });
  }
};

module.exports = {
  postBill: postBill,
  getBill: getBill,
  putBill: putBill,
  getBills: getBills
};
