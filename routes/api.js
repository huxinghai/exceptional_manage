var express = require('express');
var router = express.Router();
var zlib = require('zlib');


var to_json = function(val){  
  if(typeof(val) == "object"){
    return JSON.stringify(val);
  }else{
    return val;
  }
}

var convert_format = function(info){
  var results = {},
     et = info.exception,
     irh = info.request.header;

  results.title = et.exception_class + et.message
  results.occurred_at = new Date(et.occurred_at)
  results.created_at = new Date
  results.content = et.exception_class
  results.content += et.message +"\n"
  et.backtrace.forEach(function(item){
    results.content += to_json(item) + "\n"
  }) 
  results.url = info.request.url

  results.header = "request_method: "+ info.request.request_method +"\n"
  for(k in irh){
    results.header += k +":"+ to_json(irh[k])
  }
  results.remote_ip = info.request.remote_ip
  results.session = to_json(info.request.session);
  results.parameters = to_json(info.request.parameters)
  results.environment = to_json(info.application_environment)
  
  return results
}

router.post("/errors", function(req, res){ 

  zlib.inflate(req.text, function(error, results){    
    if(results){
      var info = convert_format(JSON.parse(results.toString()));      
      req.models.Exceptional.create(info, function(err, items){
        if(err){
          console.error(err)
          res.json({error: err})           
        }else{
          console.log(items)  
          res.json({})
        }
      })
    }
  })  
   
})

module.exports = router;