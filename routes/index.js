var express = require('express');
var router = express.Router();
var zlib = require('zlib');

/* GET home page. */
router.get('/', function(req, res) {  
  res.render('index', { title: "中国我爱你"});  
});

module.exports = router;
