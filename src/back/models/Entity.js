'use strict';

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
Entity.general = null;

Object.defineProperty(Entity, 'general', {
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
 * @param {Class} currentEntity The currentEntity for which the specify function
 * will be got.
 * @returns {Function} The specify function.
 * @private
 */
var _getSpecifyFunction = function (currentEntity) {
  return function (specification) {
    function SpecificEntity() {}

    classes.generalize(currentEntity, SpecificEntity);

    Object.defineProperty(SpecificEntity, 'general', {
      get: function () {
        return currentEntity;
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
 * @param {Class} currentEntity The current entity class for which the new
 * function will be created.
 * @returns {Function} The new function.
 * @private
 */
var _getNewFunction = function (currentEntity) {
  return function (entity) {
    var entityClass = currentEntity;
    if (entity) {
      entityClass = require('../../../tests/unit/back/models/' + entity);
    }

    var newInstance = {};
    Object.call(entityClass, newInstance);
    return newInstance;
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
 * This is a read-only property to get the Entity Class of an instance. It is
 * just an alias to this.constructor.
 * @type {Class}
 */
Entity.prototype.entity = null;

Object.defineProperty(Entity.prototype, 'entity', {
  get: function () {
    return this.constructor;
  },
  set: function () {
    throw new Error('Entity cannot be changed');
  }
});
