var mysql = require('mysql');
var orm = require("orm");
var database_config = require('./database.json');

var _loadORM = function(app){
  app.use(function(req, res, next){

    orm.connect(database_config[app.get('env')], function(err, db){

      if(err){
        console.log(err.message)
        return next()
      }
      
      var m = 

      req.models = {
        "Exceptional": db.define("exceptional", {
          id         : { type: "serial", key: true },
          title      : { type: "text" },
          content    : { type: "text" },
          url        : { type: "text" },
          header     : { type: "text" },
          created_at : { type: "date" }
        })
      }
      next()
    });

  })
}

exports.loadORM = _loadORM