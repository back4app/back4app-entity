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

/**
 * This is a dictionary with the Entity's attributes.
 * @type {Dictionary}
 */
Entity.attributes = {};

/**
 * Private function used to get the specify function specific for the Entity
 * class
 * @param GeneralEntity The GeneralEntity for which the specify function will be
 * got
 * @returns {Function} The specify function
 */
Entity._getSpecify = function (GeneralEntity) {
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

    SpecificEntity.attributes = specification.attributes;
    SpecificEntity.methods = specification.methods;

    SpecificEntity.specify = GeneralEntity._getSpecify(GeneralEntity);

    return SpecificEntity;
  };
};

/**
 * Creates a new Entity Class by specifying a general one.
 * @param {Object} specification The new Entity specification.
 * @returns {Class} The new Entity Class.
 */
Entity.specify = Entity._getSpecify(Entity);

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
