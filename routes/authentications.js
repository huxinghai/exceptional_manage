var express = require('express');
var util = require("../sys_util");
var router = express.Router();
var crypto = require('crypto');


router.get('/new', function(req, res) {
  req.models.Authentication.all(["created_at", "Z"], function(err, results){
    if(err){
      console.error(err)      
    }
    res.render('authentications/new', {list: results});
  })   
});

router.post("/create", function(req, res){  
  var options = util.sysUtil.extend({}, {
    access_token: crypto.randomBytes(32).toString('hex'),
    created_at: new Date
  }, req.body.auth)
  req.models.Authentication.create([options], function(err, results){
    if(err){
      res.status(403).json({error: err})
    }else{
      res.json(results)
    }
  })
})

module.exports = router;
