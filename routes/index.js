var express = require('express');
var router = express.Router();
var zlib = require('zlib');

/* GET home page. */
router.get('/', function(req, res) {  
  req.models.Exceptional.all(["created_at", "Z"], function(err, results){
    var options = {results: results, error: null}    
    if(err)
      options.error = err
    
    res.render('index', options); 
  })   
});

module.exports = router;
