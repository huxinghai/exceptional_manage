var mysql = require('mysql');
var orm = require("orm");
var dateFormat = require('dateformat');
var database_config = require('./database.json');

var _loadORM = function(app){
  app.use(function(req, res, next){

    orm.connect(database_config[app.get('env')], function(err, db){

      if(err){
        console.log(err.message)
        return next()
      }
      
      req.models = {
        "Exceptional": db.define("exceptional", {
          id         : { type: "serial", key: true },
          title      : { type: "text" },
          content    : { type: "text" },
          url        : { type: "text" },
          header     : { type: "text" },
          remote_ip  : { type: "text" },
          session    : { type: "text" },
          parameters : { type: "text" }, 
          environment: { type: "text" },
          occurred_at: { type: "date" },
          created_at : { type: "date" }
        }, {
          methods: {
            created_at_for: function(str){
              return dateFormat(this.created_at, str);
            }
          },
          validations: {
            title: orm.validators.rangeLength(1, undefined, "不能为空！")
          }
        })
      }
      next()
    });

  })
}

exports.loadORM = _loadORM