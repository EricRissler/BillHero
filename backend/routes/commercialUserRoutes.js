const router = require("express").Router();
const ComUserController = require("../controller/commercialUserController");
const billController = require("../controller/billController");

router.post("/", ComUserController.post);
router.get("/", ComUserController.get);
router.get("/:uid", ComUserController.getByID);
router.post("/:uid/bills", billController.postBill);
//router.get("/:uid/bills/:bid", billController.getBill);

module.exports = router;
