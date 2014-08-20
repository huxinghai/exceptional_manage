var express = require('express');
var router = express.Router();
var zlib = require('zlib');

router.post("/errors", function(req, res){  
  console.log(req.text)  
  console.log(req.body) 
  zlib.inflate(req.text, function(error, results){    
    if(results)
      console.log(results.toString()) 
  })    

  res.json({test: 111})
})

module.exports = router;