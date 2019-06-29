const router = require("express").Router();
const ComUserController = require("../controller/commercialUserController");


router.post("/", ComUserController.post);
router.get("/", ComUserController.get);

module.exports = router;
