const bill = require("../sequelize").bill;
const commercialUser = require("../sequelize").commercialUser;
const privateUser = require("../sequelize").privateUser;
const userpayment = require("../sequelize").userPaymentMethod;
const item = require("../sequelize").item;
const op = require("../sequelize").op;

const paymentProvider = require("../paymentprovider/paymentprovider");

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

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

//TODO: searchBillS
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
              const modBills = [];
              /*await asyncForEach(bills, async(bill)=>{
                commercialUser.findOne({
                  where: {id: bill.idCreditor}
                }).then(comUser=>{
                  bill.longname = comUser.longname;
                  bill.shortname = comUser.shortname;
                  modBills.push(bill);
                })
              });*/
              res.status(200).json({
                bills: bills
              });
            });
        } else if (catId != null) {
          bill
            .findAll({
              where: {
                idDebitor: uid,
                idCategory: catId
              },
              raw: true
            })
            .then(bills => {
              //TODO: get shortnames for each Bill
            });
        } else if (credName != null) {
          commercialUser
            .findALL({
              where: {
                [op.or]: [
                  {
                    shortname: credName
                  },
                  {
                    longname: credName
                  }
                ]
              },
              raw: true
            })
            .then(comUsers => {
            });
        } else if (prodName != null) {
          //TODO:
        } else {
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
  } else {
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
            foundBill.update({
              idCategory: data.catID
            });
            res.status(200).send();
          } else if (data.paymentID != undefined) {
            if (foundBill.paymentStatus == false) {
              commercialUser.findOne({
                where: { id: foundBill.idCreditor },
                raw: true
              }).then(comuser => {
                const tokenIN = comuser.incomingPaymentToken;
                userpayment.findOne({
                  where: { id: paymentID }
                }).then(userPay => {
                  tokenFrom = userPay.token;

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
                      message:
                        "Payment was denied by Paymentprovider. Please check your account data for used Paymentmethod"
                    });
                  }
                })
              })

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
