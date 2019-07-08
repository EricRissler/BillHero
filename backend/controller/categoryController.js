const category = require("../sequelize").category;
const prvUser = require("../sequelize").privateUser;

const post = function(req, res) {
  const uid = req.params.uid;
  const catName = req.body.name;
  prvUser
    .findOne({
      where: {
        id: uid
      }
    })
    .then(result => {
      if (result == null) {
        res.status(404).json({
          message: "User not found"
        });
      } else {
        category
          .findOne({
            where: {
              idUser: uid,
              name: catName
            }
          })
          .then(result => {
            if (result != null) {
              res.status(201).json({
                message: "Category already existing",
                cid: result.id
              });
            } else {
              category
                .create({
                  idUser: uid,
                  name: catName
                })
                .then(result => {
                  res.status(201).json({
                    message: "Category created",
                    cid: result.id
                  });
                });
            }
          });
      }
    });
};
const get = function(req, res) {
  const uid = req.params.uid;
  prvUser
    .findOne({
      where: {
        id: uid
      }
    })
    .then(result => {
      if (result == null) {
        res.status(404).json({
          message: "User not found"
        });
      } else {
        category
          .findAll({
            attributes: [["id", "categoryID"], ["name", "categoryName"]],
            raw: true,
            where: {
              idUser: uid,
              isHitorical: false
            }
          })
          .then(results => {
            //console.log(results);
            res.status(200).json(results);
          });
      }
    });
};
module.exports = {
  post: post,
  get: get
};
