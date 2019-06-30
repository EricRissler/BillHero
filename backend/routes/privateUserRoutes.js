const router = require("express").Router();
const UserController = require("../controller/PrivateUserController");
const CategoryController = require("../controller/categoryController");
const BillController = require("../controller/billController");


router.post("/", UserController.post);
router.get("/", UserController.get);
router.get("/:uid", UserController.getByID);
router.post("/:uid/categories", CategoryController.post);
router.get("/:uid/categories", CategoryController.get);
router.put("/:uid/bills/:bid", BillController.putBill)

module.exports = router;
