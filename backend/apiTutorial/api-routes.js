const router = require("express").Router();

router.get("/", function(req, res) {
  res.json({
    status: "API is working",
    message: "Crafted with pure Hate"
  });
});

module.exports = router;
