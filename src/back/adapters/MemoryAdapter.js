'use strict';

var util = require('util');
var Promise = require('bluebird');
var Adapter = require('./Adapter');

module.exports = MemoryAdapter;

/* Adapter Constructor */

function MemoryAdapter() {
  this.store = {};
}

util.inherits(MemoryAdapter, Adapter);

/* Public API */

MemoryAdapter.prototype.loadEntity = loadEntity;
MemoryAdapter.prototype.loadEntityAttribute = loadEntityAttribute;
MemoryAdapter.prototype.insertObject = insertObject;
MemoryAdapter.prototype.updateObject = updateObject;
MemoryAdapter.prototype.deleteObject = deleteObject;
MemoryAdapter.prototype.getObject = getObject;
MemoryAdapter.prototype.findObjects = findObjects;

function loadEntity() {
  // noop
}

function loadEntityAttribute() {
  // noop
}

function insertObject(entity) {
  var self = this;
  return Promise.try(function () {
    // find collection name
    var collection = _collectionName(entity.Entity);
    // initialize possible empty collection
    self.store[collection] = self.store[collection] || {};
    // insert object into collection
    self.store[collection][entity.id] = entity;
  });
}

function updateObject(entity) {
  // same as insert
  return this.insertObject(entity);
}

function deleteObject(entity) {
  var self = this;
  return Promise.try(function () {
    // find collection name
    var collection = _collectionName(entity.Entity);
    // initialize possible empty collection
    self.store[collection] = self.store[collection] || {};
    // remove object from collection
    delete self.store[collection][entity.id];
  });
}

function getObject(EntityClass, query) {
  return this.findObjects(EntityClass, query)
    .then(function (objects) {
      // check for number of results
      if (!objects || objects.length !== 1) {
        throw new Error('Query does not match exactly one object');
      }
      // return found object
      return objects[0];
    });
}

function findObjects(EntityClass, query) {
  var self = this;
  return Promise.try(function () {
    // find collection name
    var collection = _collectionName(EntityClass);
    // initialize possible empty collection
    self.store[collection] = self.store[collection] || {};
    // list all entities in collection
    var entities = _values(self.store[collection]);
    // filter entities matching query
    var filter = _buildFilter(query);
    return entities.filter(filter);
  });
}

/* Private util functions */

function _collectionName(EntityClass) {
  var Entity = EntityClass;
  while (Entity.General !== null && !Entity.General.specification.isAbstract) {
    Entity = Entity.General;
  }
  return Entity.dataName;
}

function _values(object) {
  return Object.keys(object).map(function (key) {
    return object[key];
  });
}

function _buildFilter(query) {
  var attrs = Object.keys(query);
  return function (entity) {
    try {
      attrs.forEach(function (attr) {
        if (entity[attr] !== query[attr]) {
          throw new Error('Object does not match query');
        }
      });
    } catch (e) {
      return false;
    }
    return true;
  };
}
