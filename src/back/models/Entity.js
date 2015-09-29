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
 * Entity class
 * @memberof module:back4app/entity/models.Entity
 * @param GeneralEntity The GeneralEntity for which the specify function will be
 * got
 * @returns {Function} The specify function
 * @private
 */
var _getSpecifyFunction = function (GeneralEntity) {
  return function (specification) {
    function SpecificEntity() {}

    classes.generalize(GeneralEntity, SpecificEntity);

    Object.defineProperty(SpecificEntity, 'general', {
      get: function () {
        return GeneralEntity;
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
 * Returns the Class of a given entityName
 * @param entityName
 * @returns {Class}
 */
Entity.new = function (entityName) {
  return require('../../../tests/unit/back/models/' + entityName);
};

/**
 * This is a read-only property to get the Class of an Entity instance. It is
 * just an alias to this.constructor.
 * @type {Class}
 */
Entity.prototype.class = null;

Object.defineProperty(Entity.prototype, 'class', {
  get: function () {
    return this.constructor;
  },
  set: function () {
    throw new Error('Class cannot be changed');
  }
});

//Entity.prototype.general
