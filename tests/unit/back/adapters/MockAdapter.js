'use strict';

var Promise = require('bluebird');
var classes = require('../../../../src/back').utils.classes;
var Adapter = require('../../../../src/back').adapters.Adapter;

module.exports = MockAdapter;

function MockAdapter() {
  Adapter.apply(this, Array.prototype.slice.call(arguments));
}

classes.generalize(Adapter, MockAdapter);

MockAdapter.prototype.loadEntity = loadEntity;
MockAdapter.prototype.loadEntityAttribute = loadEntityAttribute;
MockAdapter.prototype.insertObject = insertObject;
MockAdapter.prototype.getObject = getObject;
MockAdapter.prototype.findObjects = findObjects;

function loadEntity() {}

function loadEntityAttribute() {}

function insertObject() {
  var promise = new Promise(function (resolve) {
    resolve();
  });

  return promise;
}

function getObject() {}

function findObjects() {}
