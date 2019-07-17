const bill = require("../sequelize").bill;
const commercialUser = require("../sequelize").commercialUser;
const privateUser = require("../sequelize").privateUser;
const paymentProvider = require("../paymentprovider/paymentprovider");
const item = require("../sequelize").item;
const op = require("../sequelize").op;

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
        console.log("BILL " + foundBill.idCreditor);
        commercialUser
          .findOne({
            where: { id: foundBill.idCreditor },
            raw: true
          })
          .then(debitor => {
            console.log(debitor);
            console.log("suche items");
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
const searchBill = function(req, res) {
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
          console.log("looking for bills wit status "+status);
          bill
            .findAll({
              where: {
                idDebitor: uid,
               
                paymentStatus: status               
              }, order: [["updatedAt", "DESC"]],
              raw: true
            })

            .then(bills => {
             // console.log(bills);
              //no shortname
              res.status(200).json({
                bills: bills
              })

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
              console.log(comUsers);
            });
        } else if (prodName != null) {
          //TODO:
        } else {
          console.log("getting all")
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
