const bill = require("../sequelize").bill;
const commercialUser = require("../sequelize").commercialUser;
const privateUser = require("../sequelize").privateUser;
const paymentProvider = require("../paymentprovider/paymentprovider");
const item = require("../sequelize").item;
const op = require("../sequelize").op;

//TODO: ITEMS
const postBill = function(req, res) {
  const data = {
    creID: req.params.uid,
    debID: req.body.debID,
    amount: req.body.amount,
    billNr: req.body.billNr,
    date: req.body.date,
    deadline: req.body.deadline
  };
  console.log(data);
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

//TODO: ITEMS
const getBill = function(req, res) {
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
            attributes: ["shortname"],
            raw: true
          })
          .then(debitor => {
            res.status(200).json({
              bill: foundBill,
              shortname: debitor.shortname
            });
          });
      }
    });
};

//TODO: searchBillS
const searchBill = function(req, res) {
  const uid = req.params.uid;
  const status = req.query.status;
  const catId = req.query.catid;
  const credName = req.query.cred;
  const prodName = req.query.prod;

  privateUser
    .findOne({
      where: { id: uid }
    })
    .then(prvUser => {
      console.log(prvUser);
      if (prvUser == null) {
        res.status(404).send();
      } else {
        if (status != null) {
          bill
            .findALL({
              where: {
                idDebitor: uid,
                paymentStatus: status
              },
              raw: true
            })
            .then(bills => {
              //TODO: get shortnames for each Bill
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
                  { shortname: credName },
                  {
                    longname: credName
                  }
                ]
              },
              raw: true
            })
            .then(comUsers => {
              console.log(comUsers);
            });
        } else if (prodName != null) {
        } else {
          bill
            .findAll({
              where: { idDebitor: uid },
              raw: true
            })
            .then(foundBills => {
              console.log(foundBills);

              foundBills.forEach(bill => {
                bill.shortname = "Generic companyname";
              });

              res.status(200).json({
                bills: foundBills
              });
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
          idDebitor: data.userID
        }
      })
      .then(result => {
        if (result == null) {
          res.status(404).json({
            message: "No bill found"
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
              res.status(200).json({ message: "Payment succeeded" });
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
  searchBill: searchBill
};
