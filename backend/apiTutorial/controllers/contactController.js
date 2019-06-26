const contact = require("../models/contact");

exports.module = function(req, res) {
  contact.get((req, res) => {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    }
    res.json({
      status: "success",
      message: "Contacts recieved",
      data: contacts
    });
  });
};
