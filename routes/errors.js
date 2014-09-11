var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/show/:id', function(req, res) {  
  req.models.Exceptional.find({id: req.params.id}, function(err, results){
    var options = {result: results[0], error: null}    
    if(err)
      options.error = err

    res.render('errors/show', options); 
  })   
});

module.exports = router;
