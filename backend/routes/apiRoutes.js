const router = require("express").Router();
const privateUserRoutes = require("./privateUserRoutes");
const commercialUserRoutes = require("./commercialUserRoutes");

router.use("/prvusers", privateUserRoutes);
router.use("/comusers", commercialUserRoutes);

module.exports = router;
