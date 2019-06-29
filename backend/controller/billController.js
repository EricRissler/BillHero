const bill = require("../sequelize").bill;
const commercialUser = require("../sequelize").commercialUser;
const privateUser = require("../sequelize").privateUser;

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

module.exports = {
  postBill: postBill,
  getBill: getBill
};
