'use strict';

var Adapters = require('./adapters');
var databaseAdapter = require('./databaseAdapter');
//var expect = require('chai').expect;

module.exports = Adapters;
module.exports.databaseAdapter = databaseAdapter;

