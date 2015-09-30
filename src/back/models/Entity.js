'use strict';

var expect = require('chai').expect;
var classes = require('../utils/classes');

module.exports = Entity;

/**
 * Base class for entities.
 * @constructor
 * @memberof module:back4app/entity/models
 */
function Entity() {}

/**
 * This is a read-only property to get the general Entity Class of the current
 * Entity Class.
 * @type {Class}
 */
Entity.General = null;

Object.defineProperty(Entity, 'General', {
  get: function () {
    return null;
  },
  set: function () {
    throw new Error('General cannot be changed');
  }
});

/**
 * This is a dictionary with the Entity's attributes.
 * @type {Dictionary}
 */
Entity.attributes = {};

/**
 * This is a dictionary with the Entity's methods.
 * @type {Dictionary}
 */
Entity.methods = {};

/**
 * Private function used to get the specify function specific for the current
 * Entity class.
 * @memberof module:back4app/entity/models.Entity
 * @param {Class} CurrentEntity The currentEntity for which the specify function
 * will be got.
 * @returns {Function} The specify function.
 * @private
 */
var _getSpecifyFunction = function (CurrentEntity) {
  return function (specification) {
    function SpecificEntity() {}

    classes.generalize(CurrentEntity, SpecificEntity);

    Object.defineProperty(SpecificEntity, 'General', {
      get: function () {
        return CurrentEntity;
      },
      set: function () {
        throw new Error('General cannot be changed');
      }
    });

    SpecificEntity.attributes = {};
    SpecificEntity.methods = {};

    if (specification) {
      if (specification.attributes) {
        SpecificEntity.attributes = specification.attributes;
      }

      if (specification.methods) {
        SpecificEntity.methods = specification.methods;
      }
    }

    SpecificEntity.specify = _getSpecifyFunction(SpecificEntity);
    SpecificEntity.new = _getNewFunction(SpecificEntity);

    Object.defineProperty(SpecificEntity.prototype, 'Entity', {
      get: function () {
        return SpecificEntity;
      },
      set: function () {
        throw new Error('Entity cannot be changed');
      }
    });

    return SpecificEntity;
  };
};

/**
 * Creates a new Entity Class by specifying a general one.
 * @function
 * @param {Object} specification The new Entity specification.
 * @returns {Class} The new Entity Class.
 */
Entity.specify = _getSpecifyFunction(Entity);

/**
 * Private function used to get the new function specific for the current Entiy
 * class.
 * @memberof module:back4app/entity/models.Entity
 * @param {Class} CurrentEntity The current entity class for which the new
 * function will be created.
 * @returns {Function} The new function.
 * @private
 */
var _getNewFunction = function (CurrentEntity) {
  return function (entity) {
    var EntityClass = CurrentEntity;
    if (entity) {
      expect(entity).to.be.a('string');
      try {
        EntityClass = require('../../../tests/unit/back/models/' + entity);
      }
      catch (e) {
        throw new Error('Cannot find Entity \'' + entity + '\'');
      }
    }

    return function () {
      return new EntityClass();
    };
  };
};

/**
 * Returns a function that creates new instances of an Entity Class.
 * @function
 * @param {String} entity The Entity Class of which the new instances will be
 * created. If the parameter is not given, the function will create instances of
 * the current Entity Class.
 * @returns {Function}
 */
Entity.new = _getNewFunction(Entity);

/**
 * This is a read-only property to get the Entity Class of an instance.
 * @type {Class}
 */
Entity.prototype.Entity = null;

Object.defineProperty(Entity.prototype, 'Entity', {
  get: function () {
    return Entity;
  },
  set: function () {
    throw new Error('Entity cannot be changed');
  }
});

/**
 * This is a read-only property to get the general Entity Class of an instance.
 * This is just an alias to this.Entity.General.
 * @type {Entity}
 */
Entity.prototype.General = null;

Object.defineProperty(Entity.prototype, 'General', {
  get: function () {
    return this.Entity.General;
  },
  set: function () {
    throw new Error('General cannot be changed');
  }
});
