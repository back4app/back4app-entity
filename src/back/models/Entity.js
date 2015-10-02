'use strict';

var path = require('path');
var expect = require('chai').expect;
var settings = require('../settings');
var classes = require('../utils/classes');
var EntitySpecification = require('./EntitySpecification');
var errors = require('./errors');

module.exports = Entity;

/**
 * Base class for entities.
 * @constructor
 * @memberof module:back4app/entity/models
 * @example
 * var entity = new Entity();
 */
function Entity() {
  /**
   * This is a read-only property to get the Entity Class of an instance.
   * @type {!Class}
   * @readonly
   * @example
   * var entity = new Entity();
   * console.log(entity.Entity == Entity); // Logs true
   */
  this.Entity = null;

  Object.defineProperty(this, 'Entity', {
    get: function () {
      return Entity;
    },
    set: function () {
      throw new Error('Entity cannot be changed');
    }
  });

  /**
   * This is a read-only property to get the general Entity Class of an
   * instance. This is just an alias to this.Entity.General.
   * @type {!Class}
   * @readonly
   * @example
   * var MyEntity = Entity.specify();
   * var myEntity = new MyEntity();
   * console.log(myEntity.General == Entity); // Logs true
   */
  this.General = null;

  Object.defineProperty(this, 'General', {
    get: function () {
      return this.Entity.General;
    },
    set: function () {
      throw new Error('General cannot be changed');
    }
  });
}

/**
 * This is a read-only property to get the general Entity Class of the current
 * Entity Class.
 * @type {?Class}
 * @readonly
 * @example
 * var generalAttributes = SpecificEntity.General.attributes;
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
 * This is the specification of the current Entity Class.
 * @type {!module:back4app/entity/models.EntitySpecification}
 * @readonly
 */
Entity.specification = null;

var _specification = new EntitySpecification();

Object.defineProperty(Entity, 'specification', {
  get: function () {
    return _specification;
  },
  set: function () {
    throw  new Error('Specification cannot be changed');
  }
});

/**
 * This is a dictionary with a consolidation of the Entity's attributes.
 * @type
 * {!Object.<!string, !module:back4app/entity/models/attributes.Attribute>}
 * @readonly
 */
Entity.attributes = null;

Object.defineProperty(Entity, 'attributes', {
  get: function () {
    return {};
  },
  set: function () {
    throw  new Error('Attributes cannot be changed');
  }
});

/**
 * This is a dictionary with a consolidation of the Entity's methods.
 * @type {!Object.<!string, !module:back4app/entity/models/methods.Method>}
 * @readonly
 */
Entity.methods = null;

Object.defineProperty(Entity, 'methods', {
  get: function () {
    return {};
  },
  set: function () {
    throw  new Error('Methods cannot be changed');
  }
});

/**
 * Private function used to get the specify function specific for the current
 * Entity class.
 * @memberof module:back4app/entity/models.Entity
 * @param {!Class} CurrentEntity The currentEntity for which the specify
 * function will be got.
 * @returns {function} The specify function.
 * @private
 */
var _getSpecifyFunction = function (CurrentEntity) {
  return function () {
    expect(arguments).to.have.length.below(
      3,
      'Invalid arguments length when specifying an Entity'
    );

    function SpecificEntity() {
      CurrentEntity.call(this);

      Object.defineProperty(this, 'Entity', {
        get: function () {
          return SpecificEntity;
        },
        set: function () {
          throw new Error('Entity cannot be changed');
        }
      });
    }

    classes.generalize(CurrentEntity, SpecificEntity);

    Object.defineProperty(SpecificEntity, 'General', {
      get: function () {
        return CurrentEntity;
      },
      set: function () {
        throw new Error('General cannot be changed');
      }
    });

    var _specificEntitySpecification = null;

    if (arguments.length === 1) {
      var specification = arguments[0];

      expect(specification).to.be.an(
        'object',
        'Invalid argument type when specifying an Entity'
      );

      if (specification instanceof EntitySpecification) {
        _specificEntitySpecification = specification;
      } else {
        _specificEntitySpecification = new EntitySpecification(specification);
      }
    } else if (arguments.length > 1) {
      var attributes = arguments[0];
      var methods = arguments[1];

      if (attributes) {
        expect(attributes).to.be.an(
          'object',
          'Invalid property "attributes" when specifying an Entity (it has ' +
          'to be an object)'
        );
      }

      if (methods) {
        expect(methods).to.be.an(
          'object',
          'Invalid property "methods" when specifying an Entity (it has to ' +
          'be an object)'
        );
      }

      _specificEntitySpecification = new EntitySpecification(
        attributes,
        methods
      );
    } else {
      _specificEntitySpecification = new EntitySpecification();
    }

    Object.defineProperty(SpecificEntity, 'specification', {
      get: function () {
        return _specificEntitySpecification;
      },
      set: function () {
        throw  new Error('Specification cannot be changed');
      }
    });

    Object.defineProperty(SpecificEntity, 'attributes', {
      get: function () {
        var attributes = {};

        var visitedEntities = [];
        var CurrentEntity = SpecificEntity;
        while (CurrentEntity && visitedEntities.indexOf(CurrentEntity) === -1) {
          for (var attribute in CurrentEntity.specification.attributes) {
            if (!attributes.hasOwnProperty(attribute)) {
              attributes[attribute] =
                CurrentEntity.specification.attributes[attribute];
            }
          }

          visitedEntities.push(CurrentEntity);
          CurrentEntity = CurrentEntity.General;
        }

        return attributes;
      },
      set: function () {
        throw  new Error('Attributes cannot be changed');
      }
    });

    Object.defineProperty(SpecificEntity, 'methods', {
      get: function () {
        var methods = {};

        var visitedEntities = [];
        var CurrentEntity = SpecificEntity;
        while (CurrentEntity && visitedEntities.indexOf(CurrentEntity) === -1) {
          for (var method in CurrentEntity.specification.methods) {
            if (!methods.hasOwnProperty(method)) {
              methods[method] =
                CurrentEntity.specification.methods[method];
            }
          }

          visitedEntities.push(CurrentEntity);
          CurrentEntity = CurrentEntity.General;
        }

        return methods;
      },
      set: function () {
        throw  new Error('Methods cannot be changed');
      }
    });

    SpecificEntity.specify = _getSpecifyFunction(SpecificEntity);
    SpecificEntity.new = _getNewFunction(SpecificEntity);

    return SpecificEntity;
  };
};

/**
 * Creates a new Entity Class by specifying a general one.
 * @memberof module:back4app/entity/models.Entity
 * @name specify
 * @function
 * @param {?module:back4app/entity/models.EntitySpecification} [specification]
 * The new Entity specification.
 * @returns {Class} The new Entity Class.
 */
/**
 * Creates a new Entity Class by specifying a general one.
 * @memberof module:back4app/entity/models.Entity
 * @name specify
 * @function
 * @param
 * {?(module:back4app/entity/models/attributes.AttributeCollection|
 * module:back4app/entity/models/attributes.Attribute[]|
 * Object.<!string, !(module:back4app/entity/models/attributes.Attribute|
 * Object)>)}
 * attributes The new entity specification attributes. It can be given as an
 * instance of
 * {@link module:back4app/entity/models/attributes.AttributeCollection} or an
 * object, as specified in
 * {@link module:back4app/entity/models/attributes.AttributeCollection}.
 * @param
 * {?(module:back4app/entity/models/methods.MethodCollection|
 * Object.<!string, !function>)}
 * methods The new entity specification methods. It can be given as an instance
 * of
 * {@link module:back4app/entity/models/methods.MethodCollection} or an
 * object, as specified in
 * {@link module:back4app/entity/models/methods.MethodCollection}.
 * @returns {Class} The new Entity Class.
 */
/**
 * Creates a new Entity Class by specifying a general one.
 * @memberof module:back4app/entity/models.Entity
 * @name specify
 * @function
 * @param {?Object} [specification] The new Entity specification.
 * @param
 * {?(module:back4app/entity/models/attributes.AttributeCollection|
 * module:back4app/entity/models/attributes.Attribute[]|
 * Object.<!string, !(module:back4app/entity/models/attributes.Attribute|
 * Object)>)}
 * [specification.attributes] The new entity specification attributes. It can be
 * given as an instance of
 * {@link module:back4app/entity/models/attributes.AttributeCollection} or an
 * object, as specified in
 * {@link module:back4app/entity/models/attributes.AttributeCollection}.
 * @param
 * {?(module:back4app/entity/models/methods.MethodCollection|
 * Object.<!string, !function>)}
 * [specification.methods] The new entity specification methods. It can be
 * given as an instance of
 * {@link module:back4app/entity/models/methods.MethodCollection} or an
 * object, as specified in
 * {@link module:back4app/entity/models/methods.MethodCollection}.
 * @returns {Class} The new Entity Class.
 */
Entity.specify = _getSpecifyFunction(Entity);

/**
 * Private function used to get the new function specific for the current Entity
 * class.
 * @memberof module:back4app/entity/models.Entity
 * @param {!Class} CurrentEntity The current entity class for which the new
 * function will be created.
 * @returns {function} The new function.
 * @private
 */
var _getNewFunction = function (CurrentEntity) {
  return function (entity) {
    expect(arguments).to.have.length.below(
      2,
      'Invalid arguments length when creating a new Entity function'
    );

    var EntityClass = CurrentEntity;
    if (entity) {
      expect(entity).to.be.a(
        'string',
        'Invalid argument when creating a new Entity function (it has to be ' +
        'a string'
      );
      try {
        EntityClass = require(path.join(settings.ENTITIESPATH, entity));
      }
      catch (e) {
        throw new errors.EntityNotFoundError(
          entity,
          e
        );
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
 * @param {?string} [entity] The Entity Class of which the new instances will be
 * created. If the parameter is not given, the function will create instances of
 * the current Entity Class.
 * @returns {function}
 * @example
 * var c1NewFunction = Entity.new('C1');
 * var c1 = c1NewFunction();
 */
Entity.new = _getNewFunction(Entity);
