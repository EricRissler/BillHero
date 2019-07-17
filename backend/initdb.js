const sequelize = require("./sequelize");
const conn = sequelize.conn;
const adress = sequelize.adress;
const bill = sequelize.bill;
const category = sequelize.category;
const comUser = sequelize.commercialUser;
const generalPayment = sequelize.generalPaymentMethod;
const item = sequelize.item;
const prvUser = sequelize.privateUser;
const userPayment = sequelize.userPaymentMethod;
const paymentRegister = require("./paymentprovider/paymentprovider")
  .registerPaymentmethod;
const bcrypt = require("bcrypt");
const BCRYPT_SALTROUNDS = 12;

var generalPaymentID1PayPal;
var generalPaymentID2Debit;
var generalPaymentID3Sepa;

var userPaymentID1ThomasPayPal;
var userPaymentID2ThomasDebit;
var userPaymentID3PeterPayPal;
var userPaymentID4PeterDebit;

var prvuserID1;
var prvuserID2;

var comuserID1;
var comuserID2;

module.exports = function(req, res) {
  conn.drop().then(() => {
    console.log("Dropped");
    conn.sync().then(() => {
      console.log("synced");
      createGeneralPayment1(res);
    });
  });
};

const createGeneralPayment1 = res => {
  generalPayment
    .create({
      name: "PayPal",
      data: "paypal.com"
    })
    .then(result => {
      generalPaymentID1PayPal = result.id;
      createGeneralPayment2(res);
    });
};

const createGeneralPayment2 = res => {
  generalPayment
    .create({
      name: "debit Card",
      data: "genericpaymentDebitprovider.com"
    })
    .then(result2 => {
      generalPaymentID2Debit = result2.id;
      createGeneralPayment3(res);
    });
};

const createGeneralPayment3 = res => {
  generalPayment
    .create({
      name: "SEPA",
      data: "genericpaymentSEPAprovider.com"
    })
    .then(result2 => {
      generalPaymentID2Debit = result2.id;
      createUser1(res);
    });
};

const createUser1 = res => {
  const pwprvUser1 = "test";
  bcrypt.hash(pwprvUser1, BCRYPT_SALTROUNDS).then(pwhash => {
    adress
      .create({
        strHouseNr: "test",
        zipCode: "test",
        city: "test",
        country: "test",
        additonal: "test"
      })
      .then(result => {
        prvUser
          .create({
            firstname: "test",
            lastname: "User",
            birthdate: "test",
            nationality: "test",
            email: "testUser",
            password: pwhash,
            idAdress: result.id
          })
          .then(result => {
            prvuserID1 = result.id;
            userPayment
              .create({
                idUser: prvuserID1,
                idPaymentMethod: generalPaymentID1PayPal,
                name: "Thomas PayPalKonto"
              })
              .then(result => {
                userPaymentID1ThomasPayPal = result.id;
                userPayment
                  .create({
                    idUser: prvuserID1,
                    idPaymentMethod: generalPaymentID2Debit,
                    name: "Thomas DebitCardKonto"
                  })
                  .then(result => {
                    userPaymentID2ThomasDebit = result.id;
                    createUser2(res);
                  });
              });
          });
      });
  });
};

const createUser2 = res => {
  const pwprvUser2 = "mueller123";
  bcrypt.hash(pwprvUser2, BCRYPT_SALTROUNDS).then(pwhash => {
    adress
      .create({
        strHouseNr: "Waldweg 12",
        zipCode: "63576",
        city: "Freigericht",
        country: "Germany"
      })
      .then(result => {
        prvUser
          .create({
            firstname: "Peter",
            lastname: "Müller",
            birthdate: "15.09.1967",
            nationality: "german",
            email: "pmueller67@yahoo.com",
            password: pwhash,
            idAdress: result.id
          })
          .then(result => {
            prvuserID2 = result.id;
            userPayment
              .create({
                idUser: prvuserID2,
                idPaymentMethod: generalPaymentID1PayPal,
                name: "Peter PayPalKonto"
              })
              .then(result => {
                userPaymentID3PeterPayPal = result.id;
                userPayment
                  .create({
                    idUser: prvuserID2,
                    idPaymentMethod: generalPaymentID2Debit,
                    name: "Peter DebitCardKonto"
                  })
                  .then(result => {
                    userPaymentID4PeterDebit = result.id;
                    createComUser1(res);
                  });
              });
          });
      });
  });
};

const createComUser1 = res => {
  const paymentToken = paymentRegister("DB AG", "KontoNr 123");
  const pwcomUser3 = "habeVerspätung";
  bcrypt.hash(pwcomUser3, BCRYPT_SALTROUNDS).then(pwhash => {
    adress
      .create({
        strHouseNr: "Europaplatz 1",
        zipCode: "10557",
        city: "Berlin",
        country: "Germany"
      })
      .then(result => {
        comUser
          .create({
            longname: "Deutsche Bahn AG",
            shortname: "DB AG",
            email: "info@deutschebahn.com",
            password: pwhash,
            incomingPaymentToken: paymentToken,
            idAdress: result.id
          })
          .then(result => {
            comuserID1 = result.id;
            createComUser2(res);
          });
      });
  });
};

const createComUser2 = res => {
  const paymentToken = paymentRegister("DB AG", "KontoNr 123");
  const pwcomUser4 = "test";
  bcrypt.hash(pwcomUser4, BCRYPT_SALTROUNDS).then(pwhash => {
    adress
      .create({
        strHouseNr: "John-F.-Kennedy-Straße 4",
        zipCode: "65189",
        city: "Wiesbaden",
        country: "Germany"
      })
      .then(result => {
        comUser
          .create({
            longname: "MEWA Textil OHG",
            shortname: "MEWA",
            email: "mewa",
            password: pwhash,
            incomingPaymentToken: paymentToken,
            idAdress: result.id
          })
          .then(result => {
            comuserID2 = result.id;
            createBill1(res);
          });
      });
  });
};

const createBill1 = res => {
  category
    .create({
      idUser: prvuserID1,
      name: "Mobilität"
    })
    .then(result => {
      bill
        .create({
          idDebitor: prvuserID1,
          idCreditor: comuserID1,
          amount: 98.99,
          billNr: "2368265386",
          date: "18.07.2019",
          deadline: "21.08.2019",
          idCategory: result.id,
          paymentStatus: true,
          idPayedWith: userPaymentID1ThomasPayPal
        })
        .then(result => {
          item.create({
            billID: result.id,
            itemName: "ICE 201, Frankfurt -> Berlin, 12.08.2019",
            itemPrice: 95.99,
            itemAmount: 1
          });
          item.create({
            billID: result.id,
            itemName:
              "Reservierung für ICE 201, Frankfurt -> Berlin, 12.08.2019",
            itemPrice: 4.0,
            itemAmount: 1
          });
          createBill2(res);
        });
    });
};

const createBill2 = res => {
  category
    .create({
      idUser: prvuserID1,
      name: "Kleidung"
    })
    .then(result => {
      bill
        .create({
          idDebitor: prvuserID1,
          idCreditor: comuserID2,
          amount: 500,
          billNr: "98445nf098347509",
          date: "11.06.2019",
          deadline: "21.08.2019",
          idCategory: result.id
        })
        .then(result => {
          item.create({
            billID: result.id,
            itemName: "GuciGuciHemd",
            itemPrice: 350,
            itemAmount: 1
          });
          item.create({
            billID: result.id,
            itemName: "Hugo Boss Unterhose",
            itemPrice: 50,
            itemAmount: 3
          });
          createBill3(res);
        });
    });
};

const createBill3 = res => {
  category
    .create({
      idUser: prvuserID2,
      name: "Mobilität"
    })
    .then(result => {
      bill
        .create({
          idDebitor: prvuserID2,
          idCreditor: comuserID1,
          amount: 98.99,
          billNr: "2368265386",
          date: "18.07.2019",
          deadline: "21.08.2019",
          idCategory: result.id,
          paymentStatus: true,
          idPayedWith: userPaymentID4PeterDebit
        })
        .then(result => {
          item.create({
            billID: result.id,
            itemName: "ICE 201, hanover -> hanau, 12.08.2019",
            itemPrice: 95.99,
            itemAmount: 1
          });
          item.create({
            billID: result.id,
            itemName: "Reservierung für ICE 201, hanover -> hanau, 12.08.2019",
            itemPrice: 4.0,
            itemAmount: 1
          });
          createBill4(res);
        });
    });
};

const createBill4 = res => {
  category
    .create({
      idUser: prvuserID2,
      name: "Schuhe"
    })
    .then(result => {
      bill
        .create({
          idDebitor: prvuserID2,
          idCreditor: comuserID2,
          amount: 150,
          billNr: "2368265386",
          date: "18.07.2019",
          deadline: "21.08.2019",
          idCategory: result.id
        })
        .then(result => {
          item.create({
            billID: result.id,
            itemName: "Geile Schue größe 46",
            itemPrice: 95.99,
            itemAmount: 1
          });
          item
            .create({
              billID: result.id,
              itemName: "rote Strümpfe größe 46",
              itemPrice: 54.01,
              itemAmount: 1
            })
            .then(() => {
              finish(res);
            });
        });
    });
};

const finish = res => {
  console.log("Database initialized");
  res.status(201).send("Database initialized");
};
