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
 * This is a dictionary with the Entity's attributes.
 * @type {Dictionary}
 */
Entity.attributes = {};

/**
 * Creates a new entity class by specifying a general one.
 * @param {Object} specification The new entity specification.
 * @returns {module:back4app/entity/models.Entity} The new entity.
 */
Entity.specify = function (specification) {
  function SpecificEntity() {}

  classes.generalize(Entity, SpecificEntity);

  SpecificEntity.attributes = specification.attributes;
  SpecificEntity.methods = specification.methods;

  return SpecificEntity;
};
