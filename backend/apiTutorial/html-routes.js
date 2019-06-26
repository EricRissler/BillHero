const router = require("express").Router();

router.get("/", function(req, res) {
  res.send(
    "<html><body><h1>HTML is working</h1><p>Crafted with hate</p></body></html>"
  );
});

module.exports = router;
