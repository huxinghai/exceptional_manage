var express = require('express');
var router = express.Router();


router.get('/new', function(req, res) {
  res.render('authentications/new', {}); 
});

router.post("/create", function(req, res){  
  req.models.Authentication.create(req.params.auth, function(err, results){
    if(err){
      res.status(403).json({error: err})
    }else{
      res.json({})
    }
  })
})

module.exports = router;
