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
    createGeneralPayment2();
  })
}

const createGeneralPayment2 = () => {
  generalPayment.create({
    name: "debit Card",
    data: "genericpaymentprovider.com"
  }).then((result2) => {
    generalPaymentID2Debit = result2.id;
    createUser1();
  });
}

const createUser1 = () => {
  const pwprvUser1 = "thomashuan123";
  const pwhash = bcrypt.hash(pwprvUser1, BCRYPT_SALTROUNDS).then(() => {
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
          idUser: prvuserID1,
          idPaymentMethod: generalPaymentID1PayPal,
          name: "Thomas PayPalKonto"
        }).then((result) => {
          userPaymentID1ThomasPayPal = result.id;
          userPayment.create({
            idUser: prvuserID1,
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
  const pwprvUser2 = "mueller123";
  const pwhash = bcrypt.hash(pwprvUser2, BCRYPT_SALTROUNDS).then(() => {
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
          idUser: prvuserID2,
          idPaymentMethod: generalPaymentID2PayPal,
          name: "Peter PayPalKonto"
        }).then((result) => {
          userPaymentID3PeterPayPal = result.id;
          userPayment.create({
            idUser: prvuserID2,
            idPaymentMethod: generalPaymentID2Debit,
            name: "Peter DebitCardKonto"
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
  const paymentToken = paymentRegister("DB AG", "KontoNr 123");
  const pwcomUser3 = "habeVerspätung";
  const pwhash = bcrypt.hash(pwcomUser3, BCRYPT_SALTROUNDS).then(() => {
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
  const paymentToken = paymentRegister("DB AG", "KontoNr 123");
  const pwcomUser4 = "bieteKleidung";
  const pwhash = bcrypt.hash(pwcomUser4, BCRYPT_SALTROUNDS).then(() => {
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
      date: "18.07.2019",
      deadline: "21.08.2019",
      idCategory: result.id,
      paymentStatus: true,
      idPayedWith: userPaymentID1ThomasPayPal
    }).then((result) => {
      item.create({
        billID: result.id,
        itemName: "ICE 201, Frankfurt -> Berlin, 12.08.2019",
        itemPrice: 95.99,
        itemAmount: 1
      });
      item.create({
        billID: result.id,
        itemName: "Reservierung für ICE 201, Frankfurt -> Berlin, 12.08.2019",
        itemPrice: 4.00,
        itemAmount: 1
      });
      createBill2();
    })
  })
}
const createBill2 = () => {

  category.create({
    idUser: prvuserID1,
    name: "Kleidung"
  }).then((result) => {
    bill.create({
      idDebitor: comuserID2,
      idCreditor: prvuserID1,
      amount: 500,
      billNr: "98445nf098347509",
      date: "11.06.2019",
      deadline: "21.08.2019",
      idCategory: result.id
    }).then((result) => {
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
      createBill3();
    })
  })
}
const createBill3 = () => {

  category.create({
    idUser: prvuserID2,
    name: "Mobilität"
  }).then((result) => {
    bill.create({
      idDebitor: comuserID2,
      idCreditor: prvuserID2,
      amount: 98.99,
      billNr: "2368265386",
      date: "18.07.2019",
      deadline: "21.08.2019",
      idCategory: result.id,
      paymentStatus: true,
      idPayedWith: userPaymentID1ThomasPayPal
    }).then((result) => {
      item.create({
        billID: result.id,
        itemName: "ICE 201, Frankfurt -> Berlin, 12.08.2019",
        itemPrice: 95.99,
        itemAmount: 1
      });
      item.create({
        billID: result.id,
        itemName: "Reservierung für ICE 201, Frankfurt -> Berlin, 12.08.2019",
        itemPrice: 4.00,
        itemAmount: 1
      });
      createBill4();
    })
  })
}
const createBill4 = () => {

}
