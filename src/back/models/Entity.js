'use strict';

var expect = require('chai').expect;
var classes = require('../utils/classes');
var objects = require('../utils/objects');
var EntitySpecification = require('./EntitySpecification');
var AttributeDictionary = require('./attributes/AttributeDictionary');
var MethodDictionary = require('./methods').MethodDictionary;
var errors = require('./errors');

module.exports = Entity;

require('./').Entity = Entity;

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
   * console.log(entity.Entity == Entity); // Logs "true"
   */
  this.Entity = null;
  /**
   * This is a read-only property to get the general Entity Class of an
   * instance. This is just an alias to this.Entity.General.
   * @type {!Class}
   * @readonly
   * @example
   * var MyEntity = Entity.specify('MyEntity');
   * var myEntity = new MyEntity();
   * console.log(myEntity.General == Entity); // Logs "true"
   */
  this.General = null;

  expect(arguments).to.have.length(
    0,
    'Invalid arguments length when creating an Entity (it has not to be ' +
    'passed any argument)');

  Object.defineProperty(this, 'Entity', {
    value: Entity,
    enumerable: false,
    writable: false,
    configurable: true
  });

  Object.defineProperty(this, 'General', {
    get: function () {
      return this.Entity.General;
    },
    set: function () {
      throw new Error(
        'General property of an Entity instance cannot be changed'
      );
    },
    enumerable: false,
    configurable: true
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
/**
 * This is the specification of the current Entity Class.
 * @type {!module:back4app/entity/models.EntitySpecification}
 * @readonly
 * @example
 * var entitySpecification = Entity.specification;
 */
Entity.specification = null;
/**
 * This is a dictionary with a consolidation of the Entity's attributes.
 * @type
 * {!Object.<!string, !module:back4app/entity/models/attributes.Attribute>}
 * @readonly
 * @example
 * var consolidatedAttributes = Entity.attributes;
 */
Entity.attributes = null;
/**
 * This is a dictionary with a consolidation of the Entity's methods.
 * @type {!Object.<!string, !module:back4app/entity/models/methods.Method>}
 * @readonly
 * @example
 * var consolidatedMethods = Entity.methods;
 */
Entity.methods = null;
/**
 * This is a dictionary with all Entity classes that were directly specified
 * from the current one.
 * @type {!Object.<!string, !Class>}
 * @readonly
 * @example
 * var MyEntity = Entity.specify('MyEntity');
 * var MyEntitySpecialization = MyEntity.specify('MyEntitySpecialization');
 * console.log(
 *   MyEntity.directSpecializations.length
 * ); // Logs "1"
 * console.log(
 *   MyEntity.directSpecializations[0] == MyEntitySpecialization
 * ); // Logs "true"
 */
Entity.directSpecializations = null;
/**
 * This is an Array with all Entity classes that the current one is general.
 * @type {!Object.<!string, !Class>}
 * @readonly
 * @example
 * var MyEntity = Entity.specify('MyEntity');
 * var MyEntitySpecialization = MyEntity.specify('MyEntitySpecialization');
 * var MyEntitySpecialization2 = MyEntitySpecialization.specify(
 *   'MyEntitySpecialization2'
 * );
 * console.log(
 *   MyEntity.specializations.length
 * ); // Logs "2"
 * console.log(
 *   MyEntity.specializations.indexOf(MyEntitySpecialization) > -1
 * ); // Logs "true"
 * console.log(
 *   MyEntity.specializations.indexOf(MyEntitySpecialization2) > -1
 * ); // Logs "true"
 * console.log(
 *   MyEntity.specializations.indexOf(MyEntity) > -1
 * ); // Logs "false"
 */
Entity.specializations = null;

Entity.specify = null;
Entity.getSpecialization = getSpecialization;
Entity.new = null;

Object.defineProperty(Entity, 'General', {
  value: null,
  enumerable: true,
  writable: false,
  configurable: false
});

var _entitySpecification = new EntitySpecification('Entity');

Object.defineProperty(Entity, 'specification', {
  value: _entitySpecification,
  enumerable: true,
  writable: false,
  configurable: false
});

_entitySpecification.Entity = Entity;

Object.defineProperty(Entity, 'attributes', {
  value: {},
  enumerable: true,
  writable: false,
  configurable: false
});

Object.defineProperty(Entity, 'methods', {
  value: {},
  enumerable: true,
  writable: false,
  configurable: false
});

var _directSpecializations = {};
Object.defineProperty(Entity, 'directSpecializations', {
  get: function () {
    var specializations = objects.copy(_directSpecializations);

    Object.preventExtensions(specializations);
    Object.seal(specializations);
    Object.freeze(specializations);

    return specializations;
  },
  set: function () {
    throw new Error(
      'Specializations of an Entity cannot be changed'
    );
  },
  enumerable: true,
  configurable: false
});

var _specializations = {};
Object.defineProperty(Entity, 'specializations', {
  get: function () {
    var specializations = objects.copy(_specializations);

    Object.preventExtensions(specializations);
    Object.seal(specializations);
    Object.freeze(specializations);

    return specializations;
  },
  set: function () {
    throw new Error(
      'Specializations of an Entity cannot be changed'
    );
  },
  enumerable: true,
  configurable: false
});

/**
 * Visits all specializations of a list of entities.
 * @name module:back4app/entity/models.Entity~_visitSpecializations
 * @function
 * @param entities The entities whose specializations shall be visited.
 * @param visitedEntities The list of visited entities.
 * @private
 * @example
 * var specializations = [];
 * _visitSpecializations(MyEntity.directSpecializations, specializations);
 * console.log(specializations); // Logs all specializations of MyEntity
 */
function _visitSpecializations(entities, visitedEntities) {
  for (var entityName in entities) {
    if (!visitedEntities.hasOwnProperty(entityName)) {
      visitedEntities[entityName] = entities[entityName];

      _visitSpecializations(
        entities[entityName].directSpecializations,
        visitedEntities
      );
    }
  }
}

/**
 * Private function used to get the specify function specific for the current
 * Entity class.
 * @name module:back4app/entity/models.Entity~_getSpecifyFunction
 * @function
 * @param {!Class} CurrentEntity The currentEntity for which the specify
 * function will be got.
 * @param {!Class[]} directSpecializations The private variable with the
 * direct specializations of the CurrentEntity class.
 * @returns {function} The specify function.
 * @private
 * @example
 * Entity.specify = _getSpecifyFunction(Entity, []);
 */
var _getSpecifyFunction = function (CurrentEntity, directSpecializations) {
  return function () {
    expect(arguments).to.have.length.within(
      1,
      3,
      'Invalid arguments length when specifying an Entity (it has to be ' +
      'passed from 1 to 3 arguments)'
    );

    var SpecificEntity = function () {
      CurrentEntity.call(this);

      Object.defineProperty(this, 'Entity', {
        value: SpecificEntity,
        enumerable: false,
        writable: false,
        configurable: true
      });
    }

    classes.generalize(CurrentEntity, SpecificEntity);

    Object.defineProperty(SpecificEntity, 'General', {
      value: CurrentEntity,
      enumerable: true,
      writable: false,
      configurable: false
    });

    var _specificEntitySpecification = null;

    if (arguments.length === 1 && typeof arguments[0] !== 'string') {
      var specification = arguments[0];

      expect(specification).to.be.an(
        'object',
        'Invalid argument type when specifying an Entity (it has to be an ' +
        'object or a string)'
      );

      if (specification instanceof EntitySpecification) {
        _specificEntitySpecification = specification;
      } else {
        _specificEntitySpecification = new EntitySpecification(specification);
      }
    } else {
      var name = arguments[0];

      expect(name).to.be.a(
        'string',
        'Invalid argument "name" when specifying an Entity (it has to be a ' +
        'string)'
      );

      var attributes = null;
      var methods = null;

      if (arguments.length > 1 && arguments[1]) {
        attributes = arguments[1];

        expect(typeof attributes).to.equal(
          'object',
          'Invalid property "attributes" when specifying an Entity (it has ' +
          'to be an object)'
        );
      }

      if (arguments.length > 2 && arguments[2]) {
        methods = arguments[2];

        expect(methods).to.be.an(
          'object',
          'Invalid property "methods" when specifying an Entity (it has to ' +
          'be an object)'
        );
      }

      _specificEntitySpecification = new EntitySpecification(
        name,
        attributes,
        methods
      );
    }

    expect(_specializations).to.not.have.ownProperty(
      _specificEntitySpecification.name,
      'It was not possible to specify a new Entity called "' +
      _specificEntitySpecification.name + '" because duplicates are not allowed'
    );

    _specializations[_specificEntitySpecification.name] = SpecificEntity;
    directSpecializations[_specificEntitySpecification.name] = SpecificEntity;

    Object.defineProperty(SpecificEntity, 'specification', {
      value: _specificEntitySpecification,
      enumerable: true,
      writable: false,
      configurable: false
    });

    if (_specificEntitySpecification.Entity) {
      expect(_specificEntitySpecification.Entity).to.equal(
        SpecificEntity,
        'The property "Entity" of the EntitySpecification instance should be ' +
        'equal to the Entity that is being specified.'
      );
    } else {
      _specificEntitySpecification.Entity = SpecificEntity;
    }

    Object.defineProperty(SpecificEntity, 'attributes', {
      get: function () {
        var attributesObject = {};

        var visitedEntities = [];
        var CurrentEntity = SpecificEntity;
        while (CurrentEntity && visitedEntities.indexOf(CurrentEntity) === -1) {
          for (var attribute in CurrentEntity.specification.attributes) {
            if (!attributesObject.hasOwnProperty(attribute)) {
              attributesObject[attribute] =
                CurrentEntity.specification.attributes[attribute];
            }
          }

          visitedEntities.push(CurrentEntity);
          CurrentEntity = CurrentEntity.General;
        }

        return new AttributeDictionary(attributesObject);
      },
      set: function () {
        throw new Error('Attributes of an Entity cannot be changed');
      },
      enumerable: true,
      configurable: false
    });

    Object.defineProperty(SpecificEntity, 'methods', {
      get: function () {
        var methodsObject = {};

        var visitedEntities = [];
        var CurrentEntity = SpecificEntity;
        while (CurrentEntity && visitedEntities.indexOf(CurrentEntity) === -1) {
          for (var method in CurrentEntity.specification.methods) {
            if (!methodsObject.hasOwnProperty(method)) {
              methodsObject[method] =
                CurrentEntity.specification.methods[method];
            }
          }

          visitedEntities.push(CurrentEntity);
          CurrentEntity = CurrentEntity.General;
        }

        return new MethodDictionary(methodsObject);
      },
      set: function () {
        throw new Error('Methods of an Entity cannot be changed');
      },
      enumerable: true,
      configurable: false
    });

    var _specificEntityDirectSpecializations = {};
    Object.defineProperty(SpecificEntity, 'directSpecializations', {
      get: function () {
        var specializations = objects.copy(
          _specificEntityDirectSpecializations
        );

        Object.preventExtensions(specializations);
        Object.seal(specializations);
        Object.freeze(specializations);

        return specializations;
      },
      set: function () {
        throw new Error(
          'Specializations of an Entity cannot be changed'
        );
      },
      enumerable: true,
      configurable: false
    });

    Object.defineProperty(SpecificEntity, 'specializations', {
      get: function () {
        var specializations = {};

        _visitSpecializations(
          _specificEntityDirectSpecializations,
          specializations
        );

        Object.preventExtensions(specializations);
        Object.seal(specializations);
        Object.freeze(specializations);

        return specializations;
      },
      set: function () {
        throw new Error(
          'Specializations of an Entity cannot be changed'
        );
      },
      enumerable: true,
      configurable: false
    });

    SpecificEntity.specify = _getSpecifyFunction(
      SpecificEntity,
      _specificEntityDirectSpecializations
    );
    SpecificEntity.new = _getNewFunction(SpecificEntity);

    return SpecificEntity;
  };
};

/**
 * Creates a new Entity Class by specifying a general one.
 * @memberof module:back4app/entity/models.Entity
 * @name specify
 * @function
 * @param {!module:back4app/entity/models.EntitySpecification} specification
 * The new Entity specification.
 * @returns {Class} The new Entity Class.
 * @example
 * var MyEntity = Entity.specify(new EntitySpecification('MyEntity'));
 * @example
 * var MyEntity = Entity.specify(new EntitySpecification(
 *   'MyEntity',
 *   new AttributeDictionary([
 *     new StringAttribute('attribute1', '0..1', 'default'),
 *     new StringAttribute('attribute2', '0..1', 'default')
 *   ]),
 *   new MethodDictionary({
 *     method1: function () { return 'method1'; },
 *     method2: function () { return 'method2'; }
 *   })
 * ));
 */
/**
 * Creates a new Entity Class by specifying a general one.
 * @memberof module:back4app/entity/models.Entity
 * @name specify
 * @function
 * @param {!string} name The new entity name.
 * @param
 * {?(module:back4app/entity/models/attributes.AttributeDictionary|
 * module:back4app/entity/models/attributes.Attribute[]|
 * Object.<!string, !(module:back4app/entity/models/attributes.Attribute|
 * Object)>)}
 * [attributes] The new entity specification attributes. It can be given as an
 * instance of
 * {@link module:back4app/entity/models/attributes.AttributeDictionary} or an
 * object, as specified in
 * {@link module:back4app/entity/models/attributes.AttributeDictionary}.
 * @param
 * {?(module:back4app/entity/models/methods.MethodDictionary|
 * Object.<!string, !function>)}
 * [methods] The new entity specification methods. It can be given as an
 * instance of {@link module:back4app/entity/models/methods.MethodDictionary}
 * or an object, as specified in
 * {@link module:back4app/entity/models/methods.MethodDictionary}.
 * @returns {Class} The new Entity Class.
 * @example
 * var MyEntity = Entity.specify('MyEntity');
 * @example
 * var MyEntity = Entity.specify('MyEntity', null, null);
 * @example
 * var MyEntity = Entity.specify('MyEntity', {}, {});
 * @example
 * var MyEntity = Entity.specify('MyEntity', [], {});
 * @example
 * var MyEntity = Entity.specify(
 *   'MyEntity',
 *   new AttributeDictionary(),
 *   new MethodDictionary()
 * );
 * @example
 * var MyEntity = Entity.specify(
 *   'MyEntity',
 *   new AttributeDictionary([
 *     new StringAttribute('attribute1', '0..1', 'default'),
 *     new StringAttribute('attribute2', '0..1', 'default')
 *   ]),
 *   new MethodDictionary({
 *     method1: function () { return 'method1'; },
 *     method2: function () { return 'method2'; }
 *   })
 * );
 */
/**
 * Creates a new Entity Class by specifying a general one.
 * @memberof module:back4app/entity/models.Entity
 * @name specify
 * @function
 * @param {!Object} specification The new Entity specification.
 * @param {!string} name The new Entity name.
 * @param
 * {?(module:back4app/entity/models/attributes.AttributeDictionary|
 * module:back4app/entity/models/attributes.Attribute[]|
 * Object.<!string, !(module:back4app/entity/models/attributes.Attribute|
 * Object)>)}
 * [specification.attributes] The new entity specification attributes. It can be
 * given as an instance of
 * {@link module:back4app/entity/models/attributes.AttributeDictionary} or an
 * object, as specified in
 * {@link module:back4app/entity/models/attributes.AttributeDictionary}.
 * @param
 * {?(module:back4app/entity/models/methods.MethodDictionary|
 * Object.<!string, !function>)}
 * [specification.methods] The new entity specification methods. It can be
 * given as an instance of
 * {@link module:back4app/entity/models/methods.MethodDictionary} or an
 * object, as specified in
 * {@link module:back4app/entity/models/methods.MethodDictionary}.
 * @returns {Class} The new Entity Class.
 * @example
 * var MyEntity = Entity.specify({ name: 'MyEntity' });
 * @example
 * var MyEntity = Entity.specify({
 *   name: 'MyEntity',
 *   attributes: {},
 *   methods: {}
 * });
 * @example
 * var MyEntity = Entity.specify({
 *   name: 'MyEntity',
 *   attributes: {
 *     attribute1: {
 *       type: 'String',
 *       multiplicity: '0..1',
 *       default: 'default'
 *     },
 *     attribute2: {
 *       type: 'String',
 *       multiplicity: '0..1',
 *       default: 'default'
 *     }
 *   },
 *   methods: {
 *     method1: function () { return 'method1'; },
 *     method2: function () { return 'method2'; }
 *   }
 * });
 */
Entity.specify = _getSpecifyFunction(Entity, _directSpecializations);

/**
 * Gets an Entity specialization by its name.
 * @memberof module:back4app/entity/models.Entity
 * @name getSpecialization
 * @function
 * @param {!string} entity The name of the entity.
 * @returns {Class}
 * @throws {module:back4app/entity/models/errors.EntityNotFoundError}
 * @example
 * var MyEntity = Entity.getSpecialization('MyEntity');
 */
function getSpecialization(entity) {
  expect(arguments).to.have.length(
    1,
    'Invalid arguments length when getting an Entity specialization (it ' +
    'has to be passed 1 argument)'
  );

  expect(entity).to.be.a(
    'string',
    'Invalid argument when creating a new Entity function (it has to be ' +
    'a string'
  );

  var entities = Entity.specializations;

  try {
    expect(entities).to.have.ownProperty(entity);
  } catch (e) {
    throw new errors.EntityNotFoundError(
      entity,
      e
    );
  }

  return entities[entity];
}

/**
 * Private function used to get the new function specific for the current Entity
 * class.
 * @name module:back4app/entity/models.Entity~_getNewFunction
 * @function
 * @param {!Class} CurrentEntity The current entity class for which the new
 * function will be created.
 * @returns {function} The new function.
 * @private
 * @example
 * Entity.new = _getNewFunction(Entity);
 */
var _getNewFunction = function (CurrentEntity) {
  return function (entity) {
    expect(arguments).to.have.length.below(
      2,
      'Invalid arguments length when creating a new Entity function (it has ' +
      'to be passed less than 2 arguments)'
    );

    return function () {
      expect(arguments).to.have.length(
        0,
        'Invalid arguments length when creating a new Entity (it has ' +
        'not to be passed any argument)'
      );

      var EntityClass = CurrentEntity;

      if (entity) {
        EntityClass = Entity.getSpecialization(entity);
      }

      return new EntityClass();
    };
  };
};

/**
 * Returns a function that creates new instances of an Entity Class.
 * @memberof module:back4app/entity/models.Entity
 * @name new
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
