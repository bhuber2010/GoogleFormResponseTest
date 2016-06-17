var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
  // req.body.forEach((el, i) => {
  //   console.log(el);
  // })
  console.log(req.body);
  res.sendStatus(200);
});

module.exports = router;
