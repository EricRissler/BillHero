const sequelize = require("../sequelize");
const conn = sequelize.conn;
const adress = sequelize.adress;
const bill = sequelize.bill;
const category = sequelize.category;
const comUser = sequelize.commercialUser;
const generalPayment = sequelize.generalPaymentMethod;
const itemModel = sequelize.item;
const prvUser = sequelize.privateUser;
const userPayment = sequelize.userPaymentMethod;
const paymentRegister = require("../paymentprovider/paymentprovider").registerPaymentmethod;
const bcrypt = require("bcrypt");
const BCRYPT_SALTROUNDS = 12;

var generalPaymentID1PayPal;
var generalPaymentID2Debit;

var userPaymentID1ThomasPayPal;
var userPaymentID2ThomasDebit;
var userPaymentID3PeterPayPal;
var userPaymentID4PeterDebit;

var prvuserID1;
var prvuserID2;

var comuserID1;
var comuserID2;

module.exports = function (req, res) {
  conn.drop().then(() => {
    console.log("Dropped");
    conn.sync().then(() => {
      console.log("synced");
      createGeneralPayment1();
    });
  });
};

const createGeneralPayment1 = () => {
  generalPayment.create({
    name: "PayPal",
    data: "paypal.com",
  }).then((result) => {
    generalPaymentID1PayPal = result.id;
  }).then(() => {
    createGeneralPayment2();
  })
}

const createGeneralPayment2 = () => {
  generalPayment.create({
    name: "debit Card",
    data: "genericpaymentprovider.com"
  }).then((result2) => {
    generalPaymentID2Debit = result2.id;
  }).then(() => {
    createUser1();
  });
}

const createUser1 = () => {
  const pwhash = bcrypt.hash("thomashuan123", BCRYPT_SALTROUNDS).then(() => {
    adress.create({
      strHouseNr: "Musterstraße 1",
      zipCode: "12345",
      city: "Berlin",
      country: "Germany",
      additonal: "Wohnung 0-30"
    }).then(result => {
      prvUser.create({
        firstname: "Thomas",
        lastname: "Huan",
        birthdate: "12.03.1985",
        nationality: "german",
        email: "thomas.huan@gmail.com",
        password: pwhash,
        idAdress: result.id
      }).then((result) => {
        prvuserID1 = result.id;
        userPayment.create({
          idUser: result.id,
          idPaymentMethod: generalPaymentID1PayPal,
          name: "Thomas PayPalKonto"
        }).then((result) => {
          userPaymentID1ThomasPayPal = result.id;
          userPayment.create({
            idUser: result.id,
            idPaymentMethod: generalPaymentID2Debit,
            name: "Thomas DebitCardKonto"
          }).then((result) => {
            userPaymentID2ThomasDebit = result.id;
            createUser2();
          });
        });
      })
    })
  })
}

const createUser2 = () => {
  const pwhash = bcrypt.hash("mueller123", BCRYPT_SALTROUNDS).then(() => {
    adress.create({
      strHouseNr: "Waldweg 12",
      zipCode: "63576",
      city: "Freigericht",
      country: "Germany"
    }).then(result => {
      prvUser.create({
        firstname: "Peter",
        lastname: "Müller",
        birthdate: "15.09.1967",
        nationality: "german",
        email: "pmueller67@yahoo.com",
        password: pwhash,
        idAdress: result.id
      }).then((result) => {
        prvuserID2 = result.id;
        userPayment.create({
          idUser: result.id,
          idPaymentMethod: generalPaymentID2PayPal,
          name: "Peter PayPalKonto"
        }).then((result) => {
          userPaymentID3PeterPayPal = Result.id;
          userPayment.create({
            idUser: result.id,
            idPaymentMethod: generalPaymentID2Debit,
            name: "Thomas DebitCardKonto"
          }).then((result) => {
            userPaymentID4PeterDebit = result.id;
            createComUser1();
          });
        });
      })
    })
  })
}

const createComUser1 = () => {
  const pwhash = bcrypt.hash("habeVerspätung", BCRYPT_SALTROUNDS).then(() => {
    const paymentToken = paymentRegister("DB AG", "KontoNr 123");
    adress.create({
      strHouseNr: "Europaplatz 1",
      zipCode: "10557",
      city: "Berlin",
      country: "Germany"
    }).then((result) => {
      comUser.create({
        longname: "Deutsche Bahn AG",
        shortname: "DB AG",
        email: "info@deutschebahn.com",
        password: pwhash,
        incomingPaymentToken: paymentToken,
        idAdress: result.id
      }).then((result) => {
        comuserID1 = result.id;
        createComUser2();
      })
    })
  })
}

const createComUser2 = () => {
  const pwhash = bcrypt.hash("bieteKleidung", BCRYPT_SALTROUNDS).then(() => {
    const paymentToken = paymentRegister("DB AG", "KontoNr 123");
    adress.create({
      strHouseNr: "John-F.-Kennedy-Straße 4",
      zipCode: "65189",
      city: "Wiesbaden",
      country: "Germany"
    }).then((result) => {
      comUser.create({
        longname: "MEWA Textil OHG",
        shortname: "MEWA",
        email: "info@mewa.com",
        password: pwhash,
        incomingPaymentToken: paymentToken,
        idAdress: result.id
      }).then((result) => {
        comuserID1 = result.id;
        createBill1();
      })
    })
  })
}

const createBill1 = () => {
  category.create({
    idUser: prvuserID1,
    name: "Mobilität"
  }).then((result) => {
    bill.create({
      idDebitor: comuserID1,
      idCreditor: prvuserID1,
      amount: 98.99,
      billNr: "2368265386",
      date: Date.now(),
      deadline: Date.now,
      idCategory: result.id
    }).then((result) => {

    })
  })
}
const createBill2 = () => {

}
const createBill3 = () => {

}
const createBill4 = () => {

}
