const router = require("express").Router();
const userRoutes = require("./user_routes");

/*router.use("/", function (req, res) {
  res.status(404).json({
    "Type": "error",
    "message": "requested site nonexistent"
  });
});*/

router.use("/user", userRoutes);

module.exports = router;
