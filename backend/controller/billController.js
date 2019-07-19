const bill = require("../sequelize").bill;
const commercialUser = require("../sequelize").commercialUser;
const privateUser = require("../sequelize").privateUser;
const userpayment = require("../sequelize").userPaymentMethod;
const item = require("../sequelize").item;

const paymentProvider = require("../paymentprovider/paymentprovider");

const postBill = function (req, res) {
  const data = {
    creID: req.params.uid,
    debID: req.body.debID,
    amount: req.body.amount,
    billNr: req.body.billNr,
    date: req.body.date,
    deadline: req.body.deadline,
    items: req.body.items
  };
  commercialUser
    .findOne({
      where: {
        id: data.creID
      }
    })
    .then(comUser => {
      if (comUser == null) {
        res.status(404).json({
          message: "Creditor not found"
        });
      } else {
        privateUser
          .findOne({
            where: {
              id: data.debID
            }
          })
          .then(prvUser => {
            if (prvUser == null) {
              res.status(404).json({
                message: "Debitor not found"
              });
              return;
            } else {
              if (
                data.date == "" ||
                data.date == null ||
                data.date == undefined
              ) {
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, "0");
                var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
                var yyyy = today.getFullYear();
                data.date = dd + "." + mm + "." + yyyy;
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
                  data.items.forEach(billItem => {
                    item.create({
                      billID: result.id,
                      itemName: billItem.itemName,
                      itemPrice: billItem.itemPrice,
                      itemAmount: billItem.itemAmount
                    });
                  });
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

const getBill = function (req, res) {
  const data = {
    userId: req.params.uid,
    billId: req.params.bid
  };
  bill
    .findOne({
      where: {
        id: data.billId,
        idDebitor: data.userId
      },
      raw: true
    })
    .then(foundBill => {
      if (foundBill == null) {
        res.status(404).json({
          bill: null
        });
      } else {
        commercialUser
          .findOne({
            where: { id: foundBill.idCreditor },
            raw: true
          })
          .then(debitor => {
            item
              .findAll({
                where: {
                  billID: data.billId
                }
              })
              .then(items => {
                foundBill.shortname = debitor.shortname;
                res.status(200).json({
                  bill: foundBill,
                  items: items
                });
              });
          });
      }
    });
};

const searchBill = function (req, res) {
  const uid = req.params.uid;
  const status = req.header("status");
  const catId = req.header("catid");
  const credName = req.header("cred");
  const prodName = req.header("prod");
  privateUser
    .findOne({
      where: { id: uid }
    })
    .then(prvUser => {
      if (prvUser == null) {
        res.status(404).send();
      } else {
        if (status != null) {
          //Gint Rechnungen anhand der Bezahlt-Status zurück
          bill
            .findAll({
              where: {
                idDebitor: uid,
                paymentStatus: status
              },
              order: [["updatedAt", "DESC"]],
              raw: true
            })
            .then(bills => {
              res.status(200).json({
                bills: bills
              });
            });
        } else if (catId != null) {
          //Gibt Rechnungen anhand der Kategorie zurück
          bill
            .findAll({
              where: {
                idDebitor: uid,
                idCategory: catId
              },
              raw: true
            })
            .then(bills => {
              res.status(200).json({
                bills: bills
              })
            });
        } else if (credName != null) {
          //not implemented
        } else if (prodName != null) {
          //not implemented
        } else {
          //gibt alle Rechnungen des Users zurück
          bill
            .findAll({
              where: { idDebitor: uid },
              order: [["updatedAt", "DESC"]],
              raw: true
            })
            .then(foundBills => {
              foundBills.forEach(bill => {
                bill.shortname = "GC";
              });
              res.status(200).json({
                bills: foundBills
              });
            });
        }
      }
    });
};

const putBill = function (req, res) {

  const data = {
    userID: req.params.uid,
    billID: req.params.bid,
    catID: req.body.categoryID,
    paymentID: req.body.paymentID
  };
  if (data.paymentID == undefined && data.catID == undefined) {
    res.status(406).send();
  } else if (
    data.paymentID == "paypal" ||
    data.paymentID == "debitcard" ||
    data.paymentID == "sepa"
  ) {
    //Weg bei Bezahlung über langen weg
    bill
      .findOne({
        where: {
          id: data.billID,
          idDebitor: data.userID
        }
      })
      .then(foundBill => {
        if (foundBill == null) {
          res.status(404).json({
            message: "No bill found"
          });
        } else {
          if (foundBill.paymentStatus == false) {
            commercialUser
              .findOne({
                where: { id: foundBill.idCreditor },
                raw: true
              })
              .then(comuser => {
                const tokenIN = comuser.incomingPaymentToken;

                const tokenFrom = "userPay.token";
                if (
                  paymentProvider.payBill(
                    tokenIN,
                    foundBill.tokenFrom,
                    foundBill.amount
                  )
                ) {
                  foundBill.update({
                    idPayedWith: data.paymentID,
                    paymentStatus: true
                  });
                  res.status(200).json({ message: "Payment succeeded" });
                } else {
                  res.status(409).json({
                    message: "Payment denied by Paymentprovider"
                  });
                }
              });
          } else {
            res.status(304).json({
              message: "Bill already payed"
            });
          }
        }
      });
  } else {
    //Bezahlungweg bei ClickToPay
    bill
      .findOne({
        where: {
          id: data.billID,
          idDebitor: data.userID
        }
      })
      .then(foundBill => {
        if (foundBill == null) {
          res.status(404).json({
            message: "No bill found"
          });
        } else {
          if (data.catID != undefined) {
            //Änderung der Kategorie
            foundBill.update({
              idCategory: data.catID
            });
            res.status(200).send();
          } else if (data.paymentID != undefined) {
            //Bezahlen der Rechnung
            if (foundBill.paymentStatus == false) {
              commercialUser
                .findOne({
                  where: { id: foundBill.idCreditor },
                  raw: true
                })
                .then(comuser => {
                  const tokenIN = comuser.incomingPaymentToken;
                  userpayment
                    .findOne({
                      where: { id: data.paymentID }
                    })
                    .then(userPay => {
                      if (userPay == null) {
                        res.status(404).json({
                          message: "PaymentMethod not found"
                        });
                      } else {
                        tokenFrom = userPay.token;
                        if (
                          paymentProvider.payBill(
                            tokenIN,
                            tokenFrom,
                            foundBill.amount
                          )
                        ) {
                          foundBill.update({
                            idPayedWith: data.paymentID,
                            paymentStatus: true
                          });
                          res
                            .status(200)
                            .json({ message: "Payment succeeded" });
                        } else {
                          res.status(409).json({
                            message: "Payment denied by Paymentprovider"
                          });
                        }
                      }
                    });
                });
            } else {
              res.status(304).json({
                message: "Bill already payed"
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
  searchBill: searchBill
};
