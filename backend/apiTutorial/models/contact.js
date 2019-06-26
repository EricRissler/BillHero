const ContactModel = (seqelize, type) => {
  return seqelize.define("contact", {
    id: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
    firstname: { type: type.STRING, allowNull: false },
    lastname: { type: type.STRING, allowNull: false },
    email: type.STRING,
    gender: type.STRING,
    phone: type.STRING,
    create_date: {
      type: type.DATE,
      default: Date.now
    }
  });
};
module.exports = ContactModel;
