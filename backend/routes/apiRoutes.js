const router = require("express").Router();
const privateUserRoutes = require("./privateUserRoutes");
const commercialUserRoutes = require("./commercialUserRoutes");
const init = require("../initdb");

router.use("/prvusers", privateUserRoutes);
router.use("/comusers", commercialUserRoutes);
router.use("/init", init);

module.exports = router;
