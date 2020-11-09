var express = require('express');
var router = express.Router();
var Twitter = require('twitter');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:username', function(req, res, next) {
  res.write('user [' + req.params.username + '] received');
  res.send('user [' + req.params.username + '] received');
});

module.exports = router;
