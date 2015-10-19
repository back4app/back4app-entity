'use strict';

module.exports = DBAdapter;

function DBAdapter() {
  var dbAdapter = {};
  dbAdapter.DBAdapter = null;

  dbAdapter.registerEntity = registerEntity;

  function registerEntity() {
    throw 'registerEntity must be implemented.';
  }

  return dbAdapter;
}
