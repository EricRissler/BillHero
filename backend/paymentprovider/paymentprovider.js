const payBill = function (CreditorToken, DebitorToken, amount) {
  //Expects account tokens of creditors choosen account and debitors account and amount of bill
  //retuns always true
  return true;
}

const registerPaymentmethod = function (owner, data) {
  //expects legal data from accoun owner (eg. full name, adress) and data for paymentmethod (eg. IBAN, Creditcard info etc)
  //return randomized String as identifier token for paymentmethod in paymentprovider-system
  return makeToken(20);
}

function makeToken(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = {
  payBill: payBill,
  registerPaymentmethod: registerPaymentmethod
}
