const router = require("express").Router();
const UserController = require("../controller/UserController");


router.post("/", UserController.post);
router.get("/", UserController.get);

module.exports = router;
