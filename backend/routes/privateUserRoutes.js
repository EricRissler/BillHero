const router = require("express").Router();
const UserController = require("../controller/PrivateUserController");


router.post("/", UserController.post);
router.get("/", UserController.get);
router.get("/:uid", UserController.getById);

module.exports = router;
