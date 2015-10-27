//
// Created by davimacedo on 30/09/15.
//

'use strict';

var expect = require('chai').expect;
var classes = require('../utils/classes');
var models = require('./index');
var attributes = require('./attributes');
var methods = require('./methods');

module.exports = EntitySpecification;

/**
 * Class to specify an Entity.
 * @constructor
 * @memberof module:back4app-entity/models
 * @name EntitySpecification
 * @param {!string} name The new entity name.
 * @param
 * {?(module:back4app-entity/models/attributes.AttributeDictionary|
 * module:back4app-entity/models/attributes.Attribute[]|
 * Object.<!string, !(module:back4app-entity/models/attributes.Attribute|
 * Object)>)}
 * attributes The new entity specification attributes. It can be given as an
 * instance of
 * {@link module:back4app-entity/models/attributes.AttributeDictionary} or an
 * object, as specified in
 * {@link module:back4app-entity/models/attributes.AttributeDictionary}.
 * @param
 * {?(module:back4app-entity/models/methods.MethodDictionary|
 * Object.<!string, !function>)}
 * methods The new entity specification methods. It can be given as an instance
 * of
 * {@link module:back4app-entity/models/methods.MethodDictionary} or an
 * object, as specified in
 * {@link module:back4app-entity/models/methods.MethodDictionary}.
 * @param {?(string|Object.<!string, !string>)} [dataName] It is the name to be
 * used to store the Entity data in the repository. It can be given as a
 * string that will be used by all adapters or as a dictionary specifying the
 * data name for each adapter. If dataName is not given, the Entity's name
 * will be used instead.
 * @example
 * var entitySpecification = new EntitySpecification(
 *   'MyEntity',
 *   new AttributeDictionary({
 *     attribute1: new StringAttribute('attribute1'),
 *     attribute2: new StringAttribute('attribute2')
 *   }),
 *   new methods.MethodDictionary({
 *     method1: function () { return 'method1'; },
 *     method2: function () { return 'method2'; }
 *   }),
 *   'MyEntityDataName'
 * );
 */
/**
 * Class to specify an Entity.
 * @constructor
 * @memberof module:back4app-entity/models
 * @name EntitySpecification
 * @param {!Object} specification The new Entity specification.
 * @param {!string} specification.name The new Entity name.
 * @param
 * {?(module:back4app-entity/models/attributes.AttributeDictionary|
 * module:back4app-entity/models/attributes.Attribute[]|
 * Object.<!string, !(module:back4app-entity/models/attributes.Attribute|
 * Object)>)}
 * specification.attributes The new entity specification attributes. It can be
 * given as an instance of
 * {@link module:back4app-entity/models/attributes.AttributeDictionary} or an
 * object, as specified in
 * {@link module:back4app-entity/models/attributes.AttributeDictionary}.
 * @param
 * {?(module:back4app-entity/models/methods.MethodDictionary|
 * Object.<!string, !function>)}
 * specification.methods The new entity specification methods. It can be
 * given as an instance of
 * {@link module:back4app-entity/models/methods.MethodDictionary} or an
 * object, as specified in
 * {@link module:back4app-entity/models/methods.MethodDictionary}.
 * @param {?(string|Object.<!string, !string>)} [specification.dataName] It is
 * the name to be used to store the Entity data in the repository. It can be
 * given as a string that will be used by all adapters or as a dictionary
 * specifying the data name for each adapter. If dataName is not given, the
 * Entity's name will be used instead.
 * @example
 * var entitySpecification = new EntitySpecification({
 *   name: 'MyEntity',
 *   attributes: new AttributeDictionary({
 *     attribute1: new StringAttribute('attribute1'),
 *     attribute2: new StringAttribute('attribute2')
 *   }),
 *   methods: new MethodDictionary({
 *     method1: function () { return 'method1'; },
 *     method2: function () { return 'method2'; }
 *   }),
 *   dataName: 'MyEntityDataName'
 * });
 */
function EntitySpecification() {
  /**
   * Entity whose the current EntitySpecification instance belongs. Once this
   * property is assigned, it can not be assigned anymore.
   * @name module:back4app-entity/models/EntitySpecification#Entity
   * @type {!module:back4app-entity/models/Entity}
   * @example
   * var myEntitySpecification = new EntitySpecification('MyEntity');
   * var MyEntity = Entity.specify(myEntitySpecification);
   * console.log(myEntitySpecification.Entity == MyEntity) // Logs "true"
   */
  this.Entity = null;
  /**
   * The name of the entity.
   * @name module:back4app-entity/models/EntitySpecification#name
   * @type {!string}
   * @readonly
   * @example
   * var myEntitySpecification = new EntitySpecification('MyEntity');
   * console.log(myEntitySpecification.name) // Logs "MyEntity"
   */
  this.name = null;
  /**
   * Dictionary of specific attributes of an entity.
   * @name module:back4app-entity/models.EntitySpecification#attributes
   * @type {!module:back4app-entity/models/attributes.AttributeDictionary}
   * @readonly
   * @example
   * var entitySpecification = new EntitySpecification({
   *   name: 'MyEntity',
   *   attributes: new AttributeDictionary({
   *     attribute1: new StringAttribute('attribute1'),
   *     attribute2: new StringAttribute('attribute2')
   *   }),
   *   methods: new MethodDictionary({
   *     method1: function () { return 'method1'; },
   *     method2: function () { return 'method2'; }
   *   })
   * });
   * console.log(
   *   entitySpecification.attributes.attribute1.name
   * ); // Logs "attribute1"
   */
  this.attributes = null;
  /**
   * Dictionary of specific methods of an entity.
   * @name module:back4app-entity/models.EntitySpecification#methods
   * @type {!module:back4app-entity/models/methods.MethodDictionary}
   * @readonly
   * @example
   * var entitySpecification = new EntitySpecification({
   *   name: 'MyEntity',
   *   attributes: new AttributeDictionary({
   *     attribute1: new StringAttribute('attribute1'),
   *     attribute2: new StringAttribute('attribute2')
   *   }),
   *   methods: new MethodDictionary({
   *     method1: function () { return 'method1'; },
   *     method2: function () { return 'method2'; }
   *   })
   * });
   * console.log(
   *   entitySpecification.methods.method1()
   * ); // Logs "method1"
   */
  this.methods = null;
  /**
   * This is is the name to be used to stored the Entity data in the
   * repository. It can be given as a string that will be used by all adapters
   * or as a dictionary specifying the data name for each adapter. If dataName
   * is not given, the Entity's name will be used instead.
   * @name module:back4app-entity/models.EntitySpecification#dataName
   * @type {?(string|Object.<!string, !string>)}
   * @readonly
   * @example
   * var entitySpecification = new EntitySpecification({
   *   name: 'MyEntity',
   *   attributes: new AttributeDictionary({
   *     attribute1: new StringAttribute('attribute1'),
   *     attribute2: new StringAttribute('attribute2')
   *   }),
   *   methods: new MethodDictionary({
   *     method1: function () { return 'method1'; },
   *     method2: function () { return 'method2'; }
   *   }),
   *   dataName: {
   *     mongodb: 'MyEntityMongoDBName'
   *   }
   * });
   * console.log(
   *   entitySpecification.dataName.mongodb
   * ); // Logs "MyEntityMongoDBName"
   * @example
   * var entitySpecification = new EntitySpecification({
   *   name: 'MyEntity',
   *   attributes: new AttributeDictionary({
   *     attribute1: new StringAttribute('attribute1'),
   *     attribute2: new StringAttribute('attribute2')
   *   }),
   *   methods: new MethodDictionary({
   *     method1: function () { return 'method1'; },
   *     method2: function () { return 'method2'; }
   *   }),
   *   dataName: 'MyEntityDataName'
   * });
   * console.log(
   *   entitySpecification.dataName
   * ); // Logs "MyEntityDataName"
   */
  this.dataName = null;

  this.addAttribute = addAttribute;
  this.addMethod = addMethod;

  var _Entity = null;
  Object.defineProperty(this, 'Entity', {
    get: function () {
      return _Entity;
    },
    set: function (SetEntity) {
      if (!_Entity) {

        expect(classes.isGeneral(models.Entity, SetEntity)).to.equal(
          true,
          'The property "Entity" of an EntitySpecification instance has to ' +
          'be an Entity class'
        );

        if (SetEntity.specification) {
          expect(SetEntity.specification).to.equal(
            this,
            'The property "Specification" of the Entity class should be ' +
            'equal to the current SpecificationEntity instance.'
          );
        }

        _Entity = SetEntity;

        _loadEntityMembers();
      } else {
        throw new Error(
          'Once that the property "Entity" of an EntitySpecification ' +
          'instance is assigned, it can not be assigned anymore'
        );
      }
    },
    enumerable: true,
    configurable: false
  });

  var _name = null;

  var _attributes = new attributes.AttributeDictionary();
  Object.defineProperty(this, 'attributes', {
    get: function () {
      return _attributes;
    },
    set: function () {
      throw new Error(
        'Attributes of an EntitySpecification instance cannot be changed'
      );
    },
    enumerable: true,
    configurable: false
  });

  var _methods = new methods.MethodDictionary();
  Object.defineProperty(this, 'methods', {
    get: function () {
      return _methods;
    },
    set: function () {
      throw new Error(
        'Methods of an EntitySpecification instance cannot be changed'
      );
    },
    enumerable: true,
    configurable: false
  });

  var _dataName, dataName = null;

  expect(arguments).to.have.length.within(
    1,
    4,
    'Invalid arguments length when creating a new EntitySpecification (it ' +
    'has to be passed from 1 to 4 arguments)'
  );

  if (arguments.length === 1 && typeof arguments[0] !== 'string') {
    var specification = arguments[0];

    expect(specification).to.be.an(
      'object',
      'Invalid argument type when creating a new EntitySpecification (it ' +
      'has to be an object or a string)'
    );

    for (var property in specification) {
      expect(['name', 'attributes', 'methods', 'dataName']).to.include(
        property,
        'Invalid property "' + property + '" when creating a new ' +
        'EntitySpecification (valid properties are "name", "attributes", ' +
        '"methods" and "dataName")'
      );
    }

    expect(specification).to.have.ownProperty(
      'name',
      'Property "name" is required when creating a new EntitySpecification'
    );
    expect(specification.name).to.be.a(
      'string',
      'Invalid property "name" when creating a new EntitySpecification (it ' +
      'has to be a string)'
    );

    _name = specification.name;

    if (specification.attributes) {
      expect(typeof specification.attributes).to.equal(
        'object',
        'Invalid property "attributes" when creating a new ' +
        'EntitySpecification (it has to be an object)'
      );

      if (
        specification.attributes instanceof attributes.AttributeDictionary
      ) {
        _attributes = specification.attributes;
      } else {
        _attributes = new attributes.AttributeDictionary(
          specification.attributes
        );
      }
    }

    if (specification.methods) {
      expect(specification.methods).to.be.an(
        'object',
        'Invalid property "methods" when creating a new ' +
        'EntitySpecification (it has to be an object)'
      );

      if (specification.methods instanceof methods.MethodDictionary) {
        _methods = specification.methods;
      } else {
        _methods = new methods.MethodDictionary(
          specification.methods
        );
      }
    }

    if (specification.dataName) {
      if (typeof specification.dataName === 'string') {
        _dataName = specification.dataName;
      } else {
        expect(specification.dataName).to.be.an(
          'object',
          'Invalid property "dataName" when creating a new ' +
          'EntitySpecification (it has to be a string or an object)'
        );

        _dataName = {};
        for (dataName in specification.dataName) {
          expect(specification.dataName[dataName]).to.be.a(
            'string',
            'Invalid property "dataName" for adapter "' + dataName + '" when ' +
            'creating a new EntitySpecification (it has to be a string)'
          );

          _dataName[dataName] = specification.dataName[dataName];

          Object.preventExtensions(_dataName);
          Object.seal(_dataName);
          Object.freeze(_dataName);
        }
      }
    }
  } else {
    expect(arguments[0]).to.be.a(
      'string',
      'Invalid argument type when creating a new EntitySpecification (it ' +
      'has to be an object or a string)'
    );

    _name = arguments[0];

    if (arguments.length > 1 && arguments[1]) {
      var attributesArgument = arguments[1];

      expect(typeof attributesArgument).to.equal(
        'object',
        'Invalid argument "attributes" when creating a new ' +
        'EntitySpecification (it has to be an object)'
      );

      if (attributesArgument instanceof attributes.AttributeDictionary) {
        _attributes = attributesArgument;
      } else {
        _attributes = new attributes.AttributeDictionary(
          attributesArgument
        );
      }
    }

    if (arguments.length > 2 && arguments[2]) {
      var methodsArgument = arguments[2];

      expect(methodsArgument).to.be.an(
        'object',
        'Invalid argument "methods" when creating a new EntitySpecification ' +
        '(it has to be an object)'
      );

      if (methodsArgument instanceof methods.MethodDictionary) {
        _methods = methodsArgument;
      } else {
        _methods = new methods.MethodDictionary(
          methodsArgument
        );
      }
    }

    if (arguments.length > 3 && arguments[3]) {
      if (typeof arguments[3] === 'string') {
        _dataName = arguments[3];
      } else {
        expect(arguments[3]).to.be.an(
          'object',
          'Invalid argument "dataName" when creating a new ' +
          'EntitySpecification (it has to be a string or an object)'
        );

        _dataName = {};
        for (dataName in arguments[3]) {
          expect(arguments[3][dataName]).to.be.a(
            'string',
            'Invalid argument "dataName" for adapter "' + dataName + '" when ' +
            'creating a new EntitySpecification (it has to be a string)'
          );

          _dataName[dataName] = arguments[3][dataName];

          Object.preventExtensions(_dataName);
          Object.seal(_dataName);
          Object.freeze(_dataName);
        }
      }
    }
  }

  Object.defineProperty(this, 'name', {
    get: function () {
      return _name;
    },
    set: function () {
      throw new Error(
        'Name of an EntitySpecification instance cannot be changed'
      );
    },
    enumerable: true,
    configurable: false
  });

  Object.defineProperty(this, 'dataName', {
    value: _dataName,
    enumerable: true,
    writable: false,
    configurable: false
  });

  _loadEntityMembers();

  /**
   * Loads the attributes and methods of the Entity that is associated with the
   * current specification.
   * @name module:back4app-entity/models.EntitySpecification~_loadEntityMembers
   * @function
   * @private
   * @example
   * _loadEntityMembers();
   */
  function _loadEntityMembers() {
    if (_Entity && _Entity !== models.Entity) {
      for (var attribute in _attributes) {
        _loadEntityAttribute(_attributes[attribute]);
      }

      for (var method in _methods) {
        _loadEntityMethod(_methods[method], method);
      }
    }
  }

  /**
   * Loads an attribute of the Entity that is associated with the current
   * specification.
   * @name
   * module:back4app-entity/models.EntitySpecification~_loadEntityAttribute
   * @function
   * @param {!module:back4app-entity/models/attributes.Attribute} attribute The
   * attribute to be loaded.
   * @private
   * @example
   * _loadEntityAttribute(someAttribute);
   */
  function _loadEntityAttribute(attribute) {
    expect(_methods).to.not.have.ownProperty(
      attribute.name,
      'failed to load entity attribute "' + attribute.name + '" because ' +
      'there is a method with same name in the current Entity and it cannot ' +
      'be overloaded'
    );

    if (_Entity.General) {
      expect(_Entity.General.attributes).to.not.have.ownProperty(
        attribute.name,
        'failed to load entity attribute "' + attribute.name + '" because ' +
        'there is an attribute with same name in a parent of current Entity ' +
        'and it cannot be overriden'
      );

      expect(_Entity.General.methods).to.not.respondTo(
        attribute.name,
        'failed to load entity attribute "' + attribute.name + '" because ' +
        'there is a method with same name in a parent of current Entity ' +
        'and it cannot be overriden'
      );
    }

    var entitySpecializations = _Entity.specializations;
    for (var specialization in entitySpecializations) {
      expect(entitySpecializations[specialization].specification.attributes)
        .to.not.have.ownProperty(
        attribute.name,
        'failed to load entity attribute "' + attribute.name + '" because ' +
        'there is an attribute with same name in a child of current Entity'
      );

      expect(entitySpecializations[specialization].specification.methods)
        .to.not.have.ownProperty(
        attribute.name,
        'failed to load entity attribute "' + attribute.name + '" because ' +
        'there is a method with same name in a child of current Entity'
      );
    }

    var dataName = attribute.getDataName(_Entity.adapterName);

    for (var entityAttribute in _attributes) {
      if (entityAttribute !== attribute.name) {
        expect(
          _attributes[entityAttribute].getDataName(_Entity.adapterName)
        ).to.not.equal(
          dataName,
          'failed to load entity attribute "' + attribute.name + '" because ' +
          'there is another attribute with same dataName "' + dataName + '" ' +
          'for adapter "' + _Entity.adapterName + '" in the current Entity'
        );
      }
    }

    _Entity.adapter.loadAttribute(_Entity, attribute);
  }

  /**
   * Loads a method of the Entity that is associated with the current
   * specification.
   * @name
   * module:back4app-entity/models.EntitySpecification~_loadEntityMethod
   * @function
   * @param {!function} func The method's function to be loaded.
   * @param {!string} name The method's name to be loaded.
   * @private
   * @example
   * _loadEntityMethod(someMethodFunction, someMethodName);
   */
  function _loadEntityMethod(func, name) {
    expect(_attributes).to.not.have.ownProperty(
      name,
      'failed to load entity method "' + name + '" because there is an ' +
      'attribute with same name in the current Entity and it cannot be ' +
      'overloaded'
    );

    if (_Entity.General) {
      expect(_Entity.General.attributes).to.not.have.ownProperty(
        name,
        'failed to load entity method "' + name + '" because there is an ' +
        'attribute with same name in a parent of current Entity and it ' +
        'cannot be overriden'
      );
    }

    var entitySpecializations = _Entity.specializations;
    for (var specialization in entitySpecializations) {
      expect(entitySpecializations[specialization].specification.attributes)
        .to.not.have.ownProperty(
        name,
        'failed to load entity method "' + name + '" because there is an ' +
        'attribute with same name in a child of current Entity'
      );
    }

    _Entity.prototype[name] = func;
  }

  /**
   * Adds a new attribute to the attributes in the specification.
   * @name module:back4app-entity/models.EntitySpecification#addAttribute
   * @function
   * @param {!module:back4app-entity/models/attributes.Attribute} attribute This
   * is the attribute to be added. It can be passed as a
   * {@link module:back4app-entity/models/attributes.Attribute} instance.
   * @param {?string} [name] This is the name of the attribute.
   * @example
   * entitySpecification.addAttribute(
   *   new StringAttribute('attribute'),
   *   'attribute'
   * );
   */
  /**
   * Adds a new attribute to the attributes in the specification
   * @name module:back4app-entity/models.EntitySpecification#addAttribute
   * @function
   * @param {!Object} attribute This is the attribute to be added. It can be
   * passed as an Object, as specified in
   * {@link module:back4app-entity/models/attributes.Attribute}.
   * @param {!string} [attribute.name] It is the name of the attribute. It is
   * optional if it is passed as an argument in the function.
   * @param {!string} [attribute.type='Object'] It is the type of the attribute.
   * It is optional and if not passed it will assume 'Object' as the default
   * value.
   * @param {!string} [attribute.multiplicity='1'] It is the multiplicity of the
   * attribute. It is optional and if not passed it will assume '1' as the
   * default value.
   * @param {?(boolean|number|string|Object|function)} [attribute.default] It is
   * the default expression of the attribute.
   * @param {?string} [name] This is the name of the attribute.
   * @example
   * entitySpecification.addAttribute({
   *   name: 'attribute',
   *   type: 'string',
   *   multiplicity: '0..1',
   *   default: 'default'
   * }, 'attribute');
   */
  /**
   * Adds a new attribute to the attributes in the specification.
   * @name module:back4app-entity/models.EntitySpecification#addAttribute
   * @function
   * @param {!string} name It is the name of the attribute.
   * @param {!string} [type='Object'] It is the type of the attribute. It is
   * optional and if not passed it will assume 'Object' as the default value.
   * @param {!string} [multiplicity='1'] It is the multiplicity of the
   * attribute. It is optional and if not passed it will assume '1' as the
   * default value.
   * @param {?(boolean|number|string|Object|function)} [default] It is the
   * default expression of the attribute.
   * @example
   * entitySpecification.addAttribute(
   *   'attribute',
   *   'string',
   *   '0..1',
   *   'default'
   * );
   */
  function addAttribute() {
    var attribute =
      arguments.length === 1 && arguments[0] instanceof attributes.Attribute ?
        arguments[0] :
        attributes.Attribute.resolve.apply(
          null,
          Array.prototype.slice.call(arguments)
        );

    var newAttributes = attributes.AttributeDictionary.concat(
      _attributes,
      attribute
    );

    if (_Entity) {
      _loadEntityAttribute(attribute);
    }

    _attributes = newAttributes;
  }

  /**
   * Adds a new method to the methods in the specification.
   * @name module:back4app-entity/models.EntitySpecification#addMethod
   * @function
   * @param {!function} func This is the method's function to be added.
   * @param {!string} name This is the name of the method.
   * @example
   * entitySpecification.addMethod(
   *   function () { return 'newMethod'; },
   *   'newMethod'
   * );
   */
  function addMethod(func, name) {
    var newMethods = methods.MethodDictionary.concat(
      _methods,
      func,
      name
    );

    if (_Entity) {
      _loadEntityMethod(func, name);
    }

    _methods = newMethods;
  }

  Object.preventExtensions(this);
  Object.seal(this);
}

EntitySpecification.prototype.getDataName = getDataName;

function getDataName(adapterName) {
  expect(arguments).to.have.length.below(
    2,
    'Invalid arguments length when getting the data name of an ' +
    'EntitySpecification (it has to be passed less than 2 arguments)');

  if (adapterName) {
    expect(adapterName).to.be.a(
      'string',
      'Invalid argument "adapterName" when getting the data name of an ' +
      'EntitySpecification (it has to be a string)'
    );

    if (
      this.dataName &&
      typeof this.dataName === 'object' &&
      this.dataName.hasOwnProperty(adapterName)
    ) {
      return this.dataName[adapterName];
    }
  }

  if (this.dataName && typeof this.dataName === 'string') {
    return this.dataName;
  } else {
    return this.name;
  }
}
