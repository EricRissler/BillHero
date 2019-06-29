const router = require("express").Router();
const privateUserRoutes = require("./privateUserRoutes");
const commercialUserRoutes = require("./commercialUserRoutes");

router.use("/prvuser", privateUserRoutes);
router.use("/comuser", commercialUserRoutes);

module.exports = router;
