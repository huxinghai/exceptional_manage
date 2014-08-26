var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('authentication', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    access_token: 'string',
    provider_name: 'string',
    describe: 'text',
    created_at: 'datetime'
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable("authentication", callback)
};
