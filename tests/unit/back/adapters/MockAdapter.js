'use strict';

var classes = require('../../../../src/back').utils.classes;
var Adapter = require('../../../../src/back').adapters.Adapter;

module.exports = MockAdapter;

function MockAdapter() {
  Adapter.apply(this, Array.prototype.slice.call(arguments));
}

classes.generalize(Adapter, MockAdapter);

Adapter.prototype.loadEntity = loadEntity;
Adapter.prototype.loadEntityAttribute = loadEntityAttribute;
Adapter.prototype.insertObject = insertObject;
Adapter.prototype.getObject = getObject;
Adapter.prototype.findObjects = findObjects;

function loadEntity() {}

function loadEntityAttribute() {}

function insertObject() {}

function getObject(EntityClass, query) {}

function findObjects(EntityClass, query) {}
