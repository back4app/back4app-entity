'use strict';

var chai = require('chai');
var expect = chai.expect;
var AssertionError = chai.AssertionError;
var Promise = require('bluebird');
var settings = require('../settings');
var classes = require('../utils/classes');
var objects = require('../utils/objects');
var Adapter = require('../adapters/Adapter');
var EntitySpecification = require('./EntitySpecification');
var AttributeDictionary = require('./attributes/AttributeDictionary');
var AssociationAttribute = require('./attributes/types/AssociationAttribute');
var MethodDictionary = require('./methods').MethodDictionary;
var errors = require('./errors');
var uuid = require('node-uuid');

module.exports = Entity;

require('./index').Entity = Entity;

/**
 * Base class for entities. It is an abstract class and cannot be directly
 * initialized.
 * @constructor
 * @abstract
 * @memberof module:back4app-entity/models
 * @param {?Object.<!string, ?Object>} [attributeValues] It has to be passed as
 * a dictionary of attribute's name and values to initialize a new Entity.
 * @param {?Object} [options] These are the options when initializing a new
 * Entity instance.
 * @param {?boolean} [options.isNew] Sets if the entity is a new one. Otherwise,
 * the id will be checked. If an id was not given, the entity will be considered
 * a new one.
 * @param {?boolean} [options.clean] Flag used to create a clean new instance of
 * an Entity with no attribute set, except the given attributes. The attributes
 * not given will be in a "not fetched" state.
 * @example
 * var myEntity = new MyEntity();
 */
function Entity(attributeValues, options) {
  var entity = this;

  /**
   * This is a read-only property to get the adapterName of an Entity instance.
   * @type {!string}
   * @readonly
   * @example
   * var myDefaultAdapterName = myEntity.adapterName;
   */
  this.adapterName = null;
  /**
   * This is a read-only property to get the adapter of an Entity instance.
   * @type {!module:back4app-entity/adapters.Adapter}
   * @readonly
   * @example
   * var myDefaultAdapter = myEntity.adapter;
   */
  this.adapter = null;
  /**
   * This is a read-only property to get the Entity Class of an instance.
   * @name module:back4app-entity/models.Entity#Entity
   * @type {!Class}
   * @readonly
   * @example
   * var myEntity = new MyEntity();
   * console.log(myEntity.Entity == MyEntity); // Logs "true"
   */
  if (!this.hasOwnProperty('Entity') || !this.Entity) {
    this.Entity = null;
  }
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
  /**
   * This is a property to keep the information if the Entity instance is new
   * and was not saved in the storage yet.
   * @type {!boolean}
   * @example
   * console.log((new MyEntity()).isNew); // Logs "true"
   */
  this.isNew = null;
  /**
   * This is a read-only property to get the id of a new entity
   * instance. It is generated in according to UUID pattern type 4.
   * @type {!string}
   * @readonly
   * @example
   * var MyEntity = Entity.specify('MyEntity');
   * var myEntity = new MyEntity();
   * console.log(myEntity.id); // Logs a string id
   */
  this.id = null;

  var _attributeStorageValues = {};
  var _attributeIsSet = {};

  this.isDirty = isDirty;
  this.clean = clean;

  if (!this.hasOwnProperty('Entity') || !this.Entity) {
    Object.defineProperty(this, 'Entity', {
      value: Entity,
      enumerable: false,
      writable: false,
      configurable: false
    });
  }

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
    configurable: false
  });

  Object.defineProperty(this, 'adapterName', {
    value: this.Entity.adapterName,
    writable: false,
    enumerable: false,
    configurable: false
  });

  Object.defineProperty(this, 'adapter', {
    value: this.Entity.adapter,
    writable: false,
    enumerable: false,
    configurable: false
  });

  var _isNew = true;
  Object.defineProperty(this, 'isNew', {
    get: function () {
      return _isNew;
    },
    set: function (value) {
      expect(value).to.be.a(
        'boolean',
        'Invalid value when setting isNew value (it has to be a boolean)'
      );

      _isNew = value;
    },
    enumerable: false,
    configurable: false
  });

  Object.defineProperty(this, 'isDirty', {
    value: isDirty,
    writable: false,
    enumerable: false,
    configurable: false
  });

  Object.defineProperty(this, 'clean', {
    value: clean,
    writable: false,
    enumerable: false,
    configurable: false
  });

  expect(this).to.be.an(
    'object',
    'The Entity\'s constructor can be only invoked from specialized ' +
    'classes\' constructors'
  );

  expect(this.constructor).to.be.a(
    'function',
    'The Entity\'s constructor can be only invoked from specialized ' +
    'classes\' constructors'
  );

  expect(this.constructor).to.not.equal(
    Entity,
    'The Entity is an abstract class and cannot be directly initialized'
  );

  expect(this).to.be.instanceof(
    Entity,
    'The Entity\'s constructor can be only invoked from specialized ' +
    'classes\' constructors'
  );

  expect(arguments).to.have.length.below(
    3,
    'Invalid arguments length when creating "' +
    this.Entity.specification.name +
    '" (it has to be passed less than 3 arguments)');

  var _isNewSet = false;
  var _cleanSet = false;

  if (options) {
    expect(options).to.be.an(
      'object',
      'Invalid argument "options" when creating a new "' +
      this.Entity.specification.name + '" (it has to be an object)'
    );

    if (options.hasOwnProperty('isNew')) {
      expect(options.isNew).to.be.a(
        'boolean',
        'Invalid argument "options.isNew" when creating a new "' +
        this.Entity.specification.name + '" (it has to be a boolean)'
      );

      this.isNew = options.isNew;

      if (options.isNew) {
        _isNewSet = true;
      }
    }

    if (options.hasOwnProperty('clean')) {
      expect(options.clean).to.be.a(
        'boolean',
        'Invalid argument "options.clean" when creating a new "' +
        this.Entity.specification.name + '" (it has to be a boolean)'
      );

      if (options.clean) {
        _cleanSet = true;
      }
    }
  }

  if (attributeValues) {
    expect(attributeValues).to.be.an(
      'object',
      'Invalid argument "attributeValues" when creating a new "' +
      this.Entity.specification.name + '" (it has to be an object)'
    );

    if (!_isNewSet && attributeValues.hasOwnProperty('id')) {
      this.isNew = false;
    }
  }

  var attributes = this.Entity.attributes;

  for (var attribute in attributeValues) {
    expect(
      attributes,
      'Invalid property "' + attribute + '" when creating a new "' +
      this.Entity.specification.name + '" (it does not exist)'
    ).to.include.keys(attribute);
  }

  for (attribute in attributes) {
    var attributeValue = null;

    if (attributeValues && attributeValues.hasOwnProperty(attribute)) {
      attributeValue = attributeValues[attribute];
      _attributeStorageValues[attribute] = attributeValue;
    }

    _defineAttribute(attribute, attributeValue);
  }

  for (attribute in attributes) {
    if (!_cleanSet || attribute === 'id') {
      if (this[attribute] === null && attributes[attribute].default !== null) {
        this[attribute] = attributes[attribute].getDefaultValue(this);
      }
    }
  }

  var regex = '^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-' +
    '[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$';
  expect(new RegExp(regex).test(this.id)).to.equal(
    true,
    'Invalid property "id" when creating a new "' +
    this.Entity.specification.name + '" (it has to be a valid uuid)'
  );

  Object.defineProperty(this, 'id', {
    value: this.id,
    enumerable: true,
    writable: false,
    configurable: false
  });

  function _defineAttribute(attributeName, attributeValue) {
    _attributeIsSet[attributeName] = false;

    Object.defineProperty(entity, attributeName, {
      get: function () {
        if (
          _cleanSet &&
          !_attributeStorageValues.hasOwnProperty(attributeName) &&
          !_attributeIsSet[attributeName]
        ) {
          throw new errors.NotFetchedError(
            entity.Entity.specification.name,
            attributeName,
            null
          );
        } else {
          return attributeValue;
        }
      },
      set: function (value) {
        _attributeIsSet[attributeName] = true;
        attributeValue = value;
      },
      enumerable: true,
      configurable: attributeName === 'id'
    });
  }

  /**
   * Checks if an Entity attribute is dirty.
   * @name module:back4app-entity/models.Entity#isDirty
   * @function
   * @param {?string} [attribute] The name of the attribute to be checked. If no
   * attribute is passed, all attributes will be checked.
   * @example
   * console.log(myEntity.isDirty('myAttribute')); // Validates attribute
   *                                               // "myAttribute" of
   *                                               // Entity "myEntity"
   * @example
   * console.log(myEntity.isDirty()); // Checks all attributes of "myEntity"
   */
  function isDirty(attribute) {
    expect(arguments).to.have.length.below(
      2,
      'Invalid arguments length when checking if an Entity attribute is ' +
      'dirty (it has to be passed less than 2 arguments)'
    );

    var attributes = this.Entity.attributes;

    if (attribute) {
      expect(attribute).to.be.a(
        'string',
        'Invalid argument "attribute" when checking if an Entity attribute ' +
        'is dirty (it has to be a string)'
      );

      expect(attributes).to.have.ownProperty(
        attribute,
        'Invalid argument "attribute" when checking an Entity attribute ' +
        'is dirty (this attribute does not exist in the Entity)'
      );

      var newAttributes = {};
      newAttributes[attribute] = attributes[attribute];
      attributes = newAttributes;
    }

    for (var attributeName in attributes) {
      if (_cleanSet) {
        if (_attributeIsSet[attributeName]) {
          if (
            !_attributeStorageValues.hasOwnProperty(attributeName) ||
            _attributeStorageValues[attributeName] !== this[attributeName]
          ) {
            return true;
          }
        }
      } else {
        if (
          !_attributeStorageValues.hasOwnProperty(attributeName) ||
          _attributeStorageValues[attributeName] !== this[attributeName]
        ) {
          return true;
        }
      }
    }

    return false;
  }

  function clean(attribute) {
    _attributeStorageValues[attribute] = this[attribute];
    _attributeIsSet[attribute] = false;
  }

  Object.preventExtensions(this);
}

/**
 * This is a read-only property to get the adapterName of an Entity class.
 * @type {!string}
 * @readonly
 * @example
 * var myDefaultAdapterName = Entity.adapterName;
 */
Entity.adapterName = null;
/**
 * This is a read-only property to get the adapter of an Entity class.
 * @type {!module:back4app-entity/adapters.Adapter}
 * @readonly
 * @example
 * var myDefaultAdapter = Entity.adapter;
 */
Entity.adapter = null;
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
 * @type {!module:back4app-entity/models.EntitySpecification}
 * @readonly
 * @example
 * var entitySpecification = Entity.specification;
 */
Entity.specification = null;
/**
 * This is the data name of the current Entity Class.
 * @type {!string}
 * @readonly
 * @example
 * var entityDataName = Entity.dataName;
 */
Entity.dataName = null;
/**
 * This is a dictionary with a consolidation of the Entity's attributes.
 * @type
 * {!Object.<!string, !module:back4app-entity/models/attributes.Attribute>}
 * @readonly
 * @example
 * var consolidatedAttributes = Entity.attributes;
 */
Entity.attributes = null;
/**
 * This is a dictionary with a consolidation of the Entity's methods.
 * @type {!Object.<!string, !module:back4app-entity/models/methods.Method>}
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
Entity.getSpecialization = null;
Entity.new = null;
Entity.create = null;
Entity.prototype.validate = validate;
Entity.prototype.isValid = isValid;
Entity.prototype.save = save;

Object.defineProperty(Entity, 'adapterName', {
  value: 'default',
  writable: false,
  enumerable: true,
  configurable: false
});

Object.defineProperty(Entity, 'adapter', {
  get: _getAdapter,
  set: function () {
    throw new Error(
      'Adapter property of an Entity class cannot be changed'
    );
  },
  enumerable: true,
  configurable: false
});

Object.defineProperty(Entity, 'General', {
  value: null,
  enumerable: true,
  writable: false,
  configurable: false
});

var _entityAttributes = new AttributeDictionary({
  id: {
    type: 'String',
    default: uuid.v4
  }
});

var _entitySpecification = new EntitySpecification(
  'Entity',
  _entityAttributes,
  null,
  {
    isAbstract: true
  }
);

Object.defineProperty(Entity, 'specification', {
  value: _entitySpecification,
  enumerable: true,
  writable: false,
  configurable: false
});

_entitySpecification.Entity = Entity;

Object.defineProperty(Entity, 'dataName', {
  value: Entity.specification.getDataName(Entity.adapterName),
  enumerable: true,
  writable: false,
  configurable: false
});

Object.defineProperty(Entity, 'attributes', {
  value: _entityAttributes,
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
 * Gets the adapter to be used by the Entity class.
 * @name module:back4app-entity/models.Entity~_getAdapter
 * @function
 * @returns {module:back4app-entity/adapters.Adapter}
 * @throws {module:back4app-entity/models/errors.AdapterNotFoundError}
 * @private
 * @example
 * var defaultAdapter = _getAdapter();
 */
var _adapter = null;
function _getAdapter() {
  if (!_adapter) {
    try {
      expect(settings).to.have.ownProperty('ADAPTERS');
      expect(settings.ADAPTERS).to.have.ownProperty(this.adapterName);
      var adapter = settings.ADAPTERS[this.adapterName];
      expect(adapter).to.be.an.instanceOf(Adapter);
      _adapter = adapter;
    } catch (e) {
      if (e instanceof AssertionError) {
        throw new errors.AdapterNotFoundError(this.adapterName, e);
      } else {
        throw e;
      }
    }
  }
  return _adapter;
}

/**
 * Visits all specializations of a list of entities.
 * @name module:back4app-entity/models.Entity~_visitSpecializations
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
 * @name module:back4app-entity/models.Entity~_getSpecifyFunction
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
      4,
      'Invalid arguments length when specifying an Entity (it has to be ' +
      'passed from 1 to 4 arguments)'
    );

    var SpecificEntity = function () {

      if (!this.hasOwnProperty('Entity') || !this.Entity) {
        Object.defineProperty(this, 'Entity', {
          value: SpecificEntity,
          enumerable: false,
          writable: false,
          configurable: false
        });
      }

      if (SpecificEntity.specification.isAbstract) {
        expect(this).to.be.an(
          'object',
          'The "' + SpecificEntity.specification.name + '"\'s constructor ' +
          'can be only invoked from specialized classes\' constructors'
        );

        expect(this.constructor).to.be.a(
          'function',
          'The "' + SpecificEntity.specification.name + '"\'s constructor ' +
          'can be only invoked from specialized classes\' constructors'
        );

        expect(this.constructor).to.not.equal(
          SpecificEntity,
          'The "' + SpecificEntity.specification.name + '" is an abstract ' +
          'class and cannot be directly initialized'
        );

        expect(this).to.be.instanceof(
          SpecificEntity,
          'The "' + SpecificEntity.specification.name + '"\'s constructor ' +
          'can be only invoked from specialized classes\' constructors'
        );
      }

      CurrentEntity.apply(this, Array.prototype.slice.call(arguments));
    };

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
      var options = null;

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

      if (arguments.length > 3 && arguments[3]) {
        options = arguments[3];

        expect(options).to.be.an(
          'object',
          'Invalid property "options" when specifying an Entity (it has to ' +
          'be an object)'
        );
      }

      _specificEntitySpecification = new EntitySpecification(
        name,
        attributes,
        methods,
        options
      );
    }

    if (_specificEntitySpecification.isAbstract) {
      expect(CurrentEntity.specification.isAbstract).to.equal(
        true,
        'It was not possible to specify a new Entity called "' +
          _specificEntitySpecification.name + '" because an abstract Entity ' +
        'cannot be specified by a concrete one'
      );
    }

    Object.defineProperty(SpecificEntity, 'specification', {
      value: _specificEntitySpecification,
      enumerable: true,
      writable: false,
      configurable: false
    });

    Object.defineProperty(SpecificEntity, 'dataName', {
      value: SpecificEntity.specification.getDataName(
        SpecificEntity.adapterName
      ),
      enumerable: true,
      writable: false,
      configurable: false
    });

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
    SpecificEntity.getSpecialization = _getGetSpecializationFunction(
      SpecificEntity
    );
    SpecificEntity.new = _getNewFunction(SpecificEntity);
    SpecificEntity.create = _getCreateFunction(SpecificEntity);

    if (_specificEntitySpecification.Entity) {
      expect(_specificEntitySpecification.Entity).to.equal(
        SpecificEntity,
        'The property "Entity" of the EntitySpecification instance should be ' +
        'equal to the Entity that is being specified.'
      );
    } else {
      _specificEntitySpecification.Entity = SpecificEntity;
    }

    expect(_specializations).to.not.have.ownProperty(
      _specificEntitySpecification.name,
      'It was not possible to specify a new Entity called "' +
      _specificEntitySpecification.name + '" because duplicates are not allowed'
    );

    _specializations[_specificEntitySpecification.name] = SpecificEntity;
    directSpecializations[_specificEntitySpecification.name] = SpecificEntity;

    return SpecificEntity;
  };
};

/**
 * Creates a new Entity Class by specifying a general one.
 * @memberof module:back4app-entity/models.Entity
 * @name specify
 * @function
 * @param {!module:back4app-entity/models.EntitySpecification} specification
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
 *   }),
 *   {
 *     isAbstract: false,
 *     dataName: 'MyEntityDataName'
 *   }
 * ));
 */
/**
 * Creates a new Entity Class by specifying a general one.
 * @memberof module:back4app-entity/models.Entity
 * @name specify
 * @function
 * @param {!string} name The new entity name.
 * @param
 * {?(module:back4app-entity/models/attributes.AttributeDictionary|
 * module:back4app-entity/models/attributes.Attribute[]|
 * Object.<!string, !(module:back4app-entity/models/attributes.Attribute|
 * Object)>)}
 * [attributes] The new entity specification attributes. It can be given as an
 * instance of
 * {@link module:back4app-entity/models/attributes.AttributeDictionary} or an
 * object, as specified in
 * {@link module:back4app-entity/models/attributes.AttributeDictionary}.
 * @param
 * {?(module:back4app-entity/models/methods.MethodDictionary|
 * Object.<!string, !function>)}
 * [methods] The new entity specification methods. It can be given as an
 * instance of {@link module:back4app-entity/models/methods.MethodDictionary}
 * or an object, as specified in
 * {@link module:back4app-entity/models/methods.MethodDictionary}.
 * @param {Object} [options] It is the optional properties of the new Entity
 * being specified.
 * @param {boolean} [options.isAbstract=false] It is a flag to indicate if
 * the new Entity being specified is an abstract one.
 * @param {?(string|Object.<!string, !string>)} [options.dataName] It is
 * the name to be used to store the Entity data in the repository. It can be
 * given as a string that will be used by all adapters or as a dictionary
 * specifying the data name for each adapter. If dataName is not given, the
 * Entity's name will be used instead.
 * @returns {Class} The new Entity Class.
 * @example
 * var MyEntity = Entity.specify('MyEntity');
 * @example
 * var MyEntity = Entity.specify('MyEntity', null, null, null);
 * @example
 * var MyEntity = Entity.specify('MyEntity', {}, {}, null);
 * @example
 * var MyEntity = Entity.specify('MyEntity', [], {}, null);
 * @example
 * var MyEntity = Entity.specify(
 *   'MyEntity',
 *   new AttributeDictionary(),
 *   new MethodDictionary(),
 *   {
 *     isAbstract: false,
 *     dataName: 'MyEntityDataName'
 *   }
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
 *   }),
 *   {
 *     isAbstract: false,
 *     dataName: {
 *       default: 'MyEntityMongoDBDataName',
 *       rest: 'MyEntityRESTDataName'
 *     }
 *   }
 * );
 */
/**
 * Creates a new Entity Class by specifying a general one.
 * @memberof module:back4app-entity/models.Entity
 * @name specify
 * @function
 * @param {!Object} specification The new Entity specification.
 * @param {!string} specification.name The new Entity name.
 * @param
 * {?(module:back4app-entity/models/attributes.AttributeDictionary|
 * module:back4app-entity/models/attributes.Attribute[]|
 * Object.<!string, !(module:back4app-entity/models/attributes.Attribute|
 * Object)>)}
 * [specification.attributes] The new entity specification attributes. It can be
 * given as an instance of
 * {@link module:back4app-entity/models/attributes.AttributeDictionary} or an
 * object, as specified in
 * {@link module:back4app-entity/models/attributes.AttributeDictionary}.
 * @param
 * {?(module:back4app-entity/models/methods.MethodDictionary|
 * Object.<!string, !function>)}
 * [specification.methods] The new entity specification methods. It can be
 * given as an instance of
 * {@link module:back4app-entity/models/methods.MethodDictionary} or an
 * object, as specified in
 * {@link module:back4app-entity/models/methods.MethodDictionary}.
 * @param {boolean} [specification.isAbstract=false] It is a flag to indicate if
 * the new Entity being specified is an abstract one.
 * @param {?(string|Object.<!string, !string>)} [specification.dataName] It is
 * the name to be used to store the Entity data in the repository. It can be
 * given as a string that will be used by all adapters or as a dictionary
 * specifying the data name for each adapter. If dataName is not given, the
 * Entity's name will be used instead.
 * @returns {Class} The new Entity Class.
 * @example
 * var MyEntity = Entity.specify({ name: 'MyEntity' });
 * @example
 * var MyEntity = Entity.specify({
 *   name: 'MyEntity',
 *   attributes: {},
 *   methods: {},
 *   isAbstract: false,
 *   dataName: null
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
 *   },
 *   isAbstract: false,
 *   dataName: {
 *     adapter1: 'MyEntityAdapter1DataName',
 *     adapter2: 'MyEntityAdapter2DataName'
 *   }
 * });
 */
Entity.specify = _getSpecifyFunction(Entity, _directSpecializations);

/**
 * Private function used to get the getSpecialization function specific for the
 * current Entity class.
 * @name module:back4app-entity/models.Entity~_getGetSpecializationFunction
 * @function
 * @param {!Class} CurrentEntity The current entity class for which the new
 * function will be created.
 * @returns {Function} The new function.
 * @private
 * @example
 * Entity.getSpecialization = _getGetSpecializationFunction(Entity);
 */
var _getGetSpecializationFunction = function (CurrentEntity) {
  return function (entity) {
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

    var entities = CurrentEntity.specializations;

    try {
      expect(entities).to.have.ownProperty(entity);
    } catch (e) {
      throw new errors.EntityNotFoundError(
        entity,
        e
      );
    }

    return entities[entity];
  };
};

/**
 * Gets an Entity specialization by its name.
 * @memberof module:back4app-entity/models.Entity
 * @name getSpecialization
 * @function
 * @param {!string} entity The name of the entity.
 * @returns {Class}
 * @throws {module:back4app-entity/models/errors.EntityNotFoundError}
 * @example
 * var MyEntity = Entity.getSpecialization('MyEntity');
 */
Entity.getSpecialization = _getGetSpecializationFunction(Entity);

/**
 * Private function used to get the new function specific for the current Entity
 * class.
 * @name module:back4app-entity/models.Entity~_getNewFunction
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

    return function (attributeValues) {
      expect(arguments).to.have.length.below(
        2,
        'Invalid arguments length when creating a new Entity (it has ' +
        'not to be passed less than 2 arguments)'
      );

      var EntityClass = CurrentEntity;

      if (entity) {
        EntityClass = Entity.getSpecialization(entity);
      }

      return new EntityClass(attributeValues);
    };
  };
};

/**
 * Returns a function that creates new instances of an Entity Class.
 * @memberof module:back4app-entity/models.Entity
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

/**
 * Private function used to get the create function specific for the current
 * Entity class.
 * @name module:back4app-entity/models.Entity~_getCreateFunction
 * @function
 * @param {!Class} CurrentEntity The current entity class for which the new
 * function will be created.
 * @returns {function} The new function.
 * @private
 * @example
 * Entity.create = _getCreateFunction(Entity);
 */
var _getCreateFunction = function (CurrentEntity) {
  return function (attributeValues) {
    expect(arguments).to.have.length.below(
      2,
      'Invalid arguments length when creating a new "' +
      CurrentEntity.specification.name +
      '" instance (it has to be passed less than 2 arguments)');

    return new Promise(function (resolve, reject) {
      var newEntity = new CurrentEntity(attributeValues);

      newEntity
        .save({
          forceCreate: true
        })
        .then(function () {
          resolve(newEntity);
        })
        .catch(reject);
    });
  };
};

/**
 * Creates a new Entity object from passed attribute values. Validates it and
 * saves it in the storage.
 * @memberof module:back4app-entity/models.Entity
 * @name create
 * @function
 * @param {?Object.<!string, ?Object>} [attributeValues] It has to be passed as
 * a dictionary of attribute's name and values to initialize a new Entity.
 * @returns {Promise.<module:back4app-entity/models.Entity|Error>} Promise that
 * returns the created Entity object if succeed and the Error if failed.
 * @example
 * MyEntity
 *   .create({
 *     myAttribute: myAttributeValue
 *   })
 *   .then(function (myEntity) {
 *     console.log(myEntity);
 *   })
 *   .catch(function (error) {
 *     console.log(error);
 *   });
 */
Entity.create = _getCreateFunction(Entity);

/**
 * Validates an entity and throws a
 * {@link module:back4app-entity/models/errors.ValidationError} if it is not
 * validated.
 * @name module:back4app-entity/models.Entity#validate
 * @function
 * @param {?string} [attribute] The name of the attribute to be validated. If no
 * attribute is passed, all attributes will be validated.
 * @throws {module:back4app-entity/models/errors.ValidationError}
 * @example
 * myEntity.validate('myAttribute'); // Validates attribute "myAttribute" of
 *                                   // Entity "myEntity"
 * @example
 * myEntity.validate(); // Validates all attributes of "myEntity"
 */
function validate(attribute) {
  expect(arguments).to.have.length.below(
    2,
    'Invalid arguments length when validating an Entity (it has to be passed ' +
    'less than 2 arguments)'
  );

  var attributes = this.Entity.attributes;

  if (attribute) {
    expect(attribute).to.be.a(
      'string',
      'Invalid argument "attribute" when validating an Entity (it has to be ' +
      'a string)'
    );

    expect(attributes).to.have.ownProperty(
      attribute,
      'Invalid argument "attribute" when validating an Entity (this ' +
      'attribute does not exist in the Entity)'
    );

    var newAttributes = {};
    newAttributes[attribute] = attributes[attribute];
    attributes = newAttributes;
  }

  for (attribute in attributes) {
    attributes[attribute].validate(this);
  }
}

/**
 * Validates an entity and returns a boolean indicating if it is valid.
 * @name module:back4app-entity/models.Entity#isValid
 * @function
 * @param {?string} [attribute] The name of the attribute to be validated. If no
 * attribute is passed, all attributes will be validated.
 * @returns {boolean} The validation result.
 * @example
 * myEntity.isValid('myAttribute'); // Validates attribute "myAttribute" of
 *                                  // Entity "myEntity" and returns true/false
 * @example
 * myEntity.isValid(); // Validates all attributes of "myEntity" and returns
 *                     // true/false
 */
function isValid(attribute) {
  try {
    this.validate(attribute);
  } catch (e) {
    if (e instanceof errors.ValidationError) {
      return false;
    } else {
      throw e;
    }
  }
  return true;
}

/**
 * Saves an Entity object. Validates it and saves it in the storage.
 * @name module:back4app-entity/models.Entity#save
 * @function
 * @param {?Object} [options] The options to be used in the save process.
 * @param {?boolean} [options.forceCreate] This option is used to force the
 * object to be created in the storage.
 * @param {?boolean} [options.forceUpdate] This option is used to force the
 * object to be updated in the storage.
 * @returns {Promise.<undefined|Error>} Promise that returns nothing if succeed
 * and the Error if failed.
 * @example
 * myEntity
 *   .save()
 *   .then(function () {
 *     console.log('saved');
 *   })
 *   .catch(function (error) {
 *     console.log(error);
 *   });
 */
function save(options) {
  var entity = this;

  expect(arguments).to.have.length.below(
    2,
    'Invalid arguments length when saving an Entity (it has to be passed ' +
    'less than 2 arguments)'
  );

  return new Promise(function (resolve, reject) {
    var isCreate = entity.isNew;
    var forceCreate = false;
    var forceUpdate = false;

    if (options) {
      expect(options).to.be.an(
        'object',
        'Invalid argument "options" when saving an Entity (it has to be an ' +
        'object)'
      );

      if (options.hasOwnProperty('forceCreate')) {
        expect(options.forceCreate).to.be.a(
          'boolean',
          'Invalid argument "options.forceCreate" when saving an Entity (it ' +
          'has to be a boolean)'
        );

        if (options.forceCreate) {
          forceCreate = true;
        }
      }

      if (options.hasOwnProperty('forceUpdate')) {
        expect(options.forceUpdate).to.be.a(
          'boolean',
          'Invalid argument "options.forceUpdate" when saving an Entity (it ' +
          'has to be a boolean)'
        );

        if (options.forceUpdate) {
          forceUpdate = true;
        }
      }

      if (forceCreate) {
        expect(forceCreate).to.not.equal(
          forceUpdate,
          'It is not possible to force create and update at same time when ' +
          'saving an Entity'
        );
      }

      if (forceCreate) {
        isCreate = true;
      } else if (forceUpdate) {
        isCreate = false;
      }
    }

    entity.validate();

    var promises = [];

    var attributes = entity.Entity.attributes;

    for (var attribute in attributes) {
      if (attributes[attribute] instanceof AssociationAttribute) {
        if (entity.hasOwnProperty(attribute)) {
          if (entity[attribute] instanceof Entity) {
            promises.push(entity[attribute].save());
          }
        }
      }
    }

    var promise = null;

    if (isCreate) {
      promise = entity.adapter.insertObject(entity);
    } else {
      promise = entity.adapter.updateObject(entity);
    }

    expect(promise).to.not.equal(
      null,
      'Functions "insertObject" and "updateObject" of an Adapter ' +
      'specialization should return a Promise'
    );

    expect(typeof promise).to.equal(
      'object',
      'Functions "insertObject" and "updateObject" of an Adapter ' +
      'specialization should return a Promise'
    );

    expect(promise).to.respondTo(
      'then',
      'Functions "insertObject" and "updateObject" of an Adapter ' +
      'specialization should return a Promise'
    );

    expect(promise).to.respondTo(
      'catch',
      'Functions "insertObject" and "updateObject" of an Adapter ' +
      'specialization should return a Promise'
    );

    promise
      .then(function () {
        entity.isNew = false;
      });

    promises.push(promise);

    Promise
      .all(promises)
      .then(function () {
        resolve();
      })
      .catch(reject);
  });
}
