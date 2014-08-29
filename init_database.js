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
        }),
        "Authentication": db.define("authentication", {
          id            : { type: 'serial', key: true },
          access_token  : { type: 'text' },
          provider_name : { type: 'text' },
          describe      : { type: 'text' },
          created_at    : { type: 'date'}
        }, {
          validations: {
            access_token: [orm.validations.notEmptyString("不能为空!"), orm.validations.unique("token 不能重复")],
            provider_name: [orm.validations.notEmptyString("不能为空!"), orm.validations.unique("名称不能重复")]
          }
        })
      }
      next()
    });

  })
}

exports.loadORM = _loadORM