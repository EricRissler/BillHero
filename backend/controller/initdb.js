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

var user1id;
var prvuser2id;

module.exports = function (req, res) {
  conn.drop().then(() => {
    console.log("Dropped");
    conn.sync().then(() => {
      console.log("synced");
      const result = createUser1();
    });
  });
};
/*Insert General Payments */

const createUser1 = () => {
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
      password: "thomashuan123",
      idAdress: result.id
      /*Insert Payments */
    }).then((result) => {
      prvuser1id = result.id;
      createUser2();
    })
  })
}

const createUser2 = () => {
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
      password: "thomashuan123",
      idAdress: result.id
      /*Insert Payments */
    }).then((result) => {
      prvuser2id = result.id;
      createComUser1();
    });
  })
}
const createComUser1 = () => {

}
const createComUser2 = () => {

}
const ComPaymernt1 = () => {

}
const ComPaymernt2 = () => {

}
