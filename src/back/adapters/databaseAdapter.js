'use strict';

module.exports = DBAdapter;

function DBAdapter() {
  var dbAdapter = {};
  dbAdapter.DBAdapter = null;

  dbAdapter.registerEntity = registerEntity;

  function registerEntity() {
    console.log("registerEntity must be implemented.");
  }

  return dbAdapter;
}
