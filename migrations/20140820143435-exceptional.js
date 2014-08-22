var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('exceptional', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    title: 'text',
    content: 'text',
    url: 'string',
    header: 'text',
    remote_ip: 'string',
    session: 'text',
    parameters: 'string', 
    environment: 'text',
    created_at: 'datetime',
    occurred_at: 'datetime'
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('exceptional', callback)
};
