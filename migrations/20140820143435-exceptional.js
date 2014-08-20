var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('exceptional', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    title: 'string',
    content: 'string',
    url: 'string',
    header: 'string',
    created_at: 'datetime'
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('exceptional', callback)
};
