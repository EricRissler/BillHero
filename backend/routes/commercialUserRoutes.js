const router = require("express").Router();
const ComUserController = require("../controller/commercialUserController");
const billController = require("../controller/billController");

router.post("/", ComUserController.post);
router.get("/", ComUserController.get);
router.get("/:uid", ComUserController.getByID);
router.post("/:uid/bills", billController.postBill);

module.exports = router;
