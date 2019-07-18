const router = require("express").Router();
const UserController = require("../controller/PrivateUserController");
const CategoryController = require("../controller/categoryController");
const billController = require("../controller/billController");
const PaymentController = require("../controller/paymentController");

router.post("/", UserController.postUser);
router.get("/", UserController.getUser);
router.get("/:uid", UserController.getUserByID);
router.put("/:uid", UserController.putUser);
router.post("/:uid/categories", CategoryController.postCat);
router.get("/:uid/categories", CategoryController.getCat);
//router.delete("/:uid/categories/:cid", CategoryController.deleteCat);
router.put("/:uid/bills/:bid", billController.putBill);
router.get("/:uid/bills", billController.searchBill);
router.get("/:uid/bills/:bid", billController.getBill);
router.get("/:uid/payments", PaymentController.getPayments);
router.post("/:uid/payments", PaymentController.postPayment);
router.delete("/:uid/payments", PaymentController.deletePayment);

module.exports = router;
