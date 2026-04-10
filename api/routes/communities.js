var express = require('express');
var router = express.Router();


const Community = require("../models/Community")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router