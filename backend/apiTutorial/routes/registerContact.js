const contact = require("../sequlize");
const regContact = (app) => {
    app.post("/regContact", (req, res) => {
        const data = {
            firstName: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            gender: req.body.gender,
            phone: req.body.phone,
        };
        if (data.firstName === "" || data.lastname === "") {
            res.json("Du brauchst einen namen, junge")
        }
        contact.findOne({
            where: {
                firstname: data.firstName,
                lastname: data.lastname
            }
        }).then(user => {
            if (user != null) {
                res.json("Kontakt bereits vorhanden")
            } else {
                contact.create({
                    firstName: data.firstName,
                    latname: data.lastname,
                    email: data.email,
                    gender: data.gender,
                    phone: data.phone
                }).then(() => {
                    res.status(201).json("Contact created");
                })
            }
        }).catch(err => {
            res.status(500).json(err);
        })
    })
}

module.exports = regContact;