const router = require("express").Router();
const UserController = require("../controller/PrivateUserController");
const CategoryController = require("../controller/categoryController");
const BillController = require("../controller/billController");
const PaymentController = require("../controller/paymentController");

router.post("/", UserController.post);
router.get("/", UserController.get);
router.get("/:uid", UserController.getByID);
router.post("/:uid/categories", CategoryController.postCat);
router.get("/:uid/categories", CategoryController.getCat);
//router.delete("/:uid/categories/:cid", CategoryController.deleteCat);
router.put("/:uid/bills/:bid", BillController.putBill);
router.get("/:uid/bills", BillController.searchBill);
router.get("/:uid/payments", PaymentController.getPayments);
router.post("/:uid/payments", PaymentController.postPayment);
router.delete("/:uid/payments", PaymentController.deletePayment);

module.exports = router;
