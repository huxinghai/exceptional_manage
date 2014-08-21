var express = require('express');
var router = express.Router();
var zlib = require('zlib');

router.post("/errors", function(req, res){ 

  zlib.inflate(req.text, function(error, results){    
    if(results)
      var info = JSON.parse(results.toString());
      info.created_at = new Date();
      req.models.Exceptional.create(info, function(err, items){
        console.log(err)
        console.log(items)
      })
  })  
  res.json({})  
})

module.exports = router;