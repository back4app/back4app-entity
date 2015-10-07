//
// Created by davimacedo on 30/09/15.
//

'use strict';

var expect = require('chai').expect;
var classes = require('../utils/classes');
var attributes = require('./attributes');
var methods = require('./methods');

module.exports = EntitySpecification;

/**
 * Class to specify an Entity.
 * @constructor
 * @memberof module:back4app/entity/models
 * @name EntitySpecification
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
 * @example
 * var entitySpecification = new EntitySpecification(
 *   new attributes.AttributeCollection({
 *     attribute1: new attributes.Attribute('attribute1'),
 *     attribute2: new attributes.Attribute('attribute2')
 *   }),
 *   new methods.MethodCollection({
 *     method1: function () { return 'method1'; },
 *     method2: function () { return 'method2'; }
 *   })
 * );
 */
/**
 * Class to specify an Entity.
 * @constructor
 * @memberof module:back4app/entity/models
 * @name EntitySpecification
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
 * @example
 * var entitySpecification = new EntitySpecification({
 *   attributes: new attributes.AttributeCollection({
 *     attribute1: new attributes.Attribute('attribute1'),
 *     attribute2: new attributes.Attribute('attribute2')
 *   }),
 *   methods: new methods.MethodCollection({
 *     method1: function () { return 'method1'; },
 *     method2: function () { return 'method2'; }
 *   })
 * });
 */
function EntitySpecification() {
  /**
   * Entity whose the current EntitySpecification instance belongs. Once this
   * property is assigned, it can not be assigned anymore.
   * @name module:back4app/entity/models/EntitySpecification#Entity
   * @type {!module:back4app/entity/models/Entity}
   * @example
   * var myEntitySpecification = new EntitySpecification();
   * var MyEntity = Entity.specify(myEntitySpecification);
   * console.log(myEntitySpecification.Entity == MyEntity) // Logs "true"
   */
  this.Entity = null;
  /**
   * Collection of specific attributes of an entity.
   * @name module:back4app/entity/models.EntitySpecification#attributes
   * @type {!module:back4app/entity/models/attributes.AttributeCollection}
   * @readonly
   * @example
   * var entitySpecification = new EntitySpecification({
   *   attributes: new attributes.AttributeCollection({
   *     attribute1: new attributes.Attribute('attribute1'),
   *     attribute2: new attributes.Attribute('attribute2')
   *   }),
   *   methods: new methods.MethodCollection({
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
   * Collection of specific methods of an entity.
   * @name module:back4app/entity/models.EntitySpecification#methods
   * @type {!module:back4app/entity/models/methods.MethodCollection}
   * @readonly
   * @example
   * var entitySpecification = new EntitySpecification({
   *   attributes: new attributes.AttributeCollection({
   *     attribute1: new attributes.Attribute('attribute1'),
   *     attribute2: new attributes.Attribute('attribute2')
   *   }),
   *   methods: new methods.MethodCollection({
   *     method1: function () { return 'method1'; },
   *     method2: function () { return 'method2'; }
   *   })
   * });
   * console.log(
   *   entitySpecification.methods.method1()
   * ); // Logs "method1"
   */
  this.methods = null;

  this.addAttribute = addAttribute;
  this.addMethod = addMethod;

  var _Entity = null;
  Object.defineProperty(this, 'Entity', {
    get: function () {
      return _Entity;
    },
    set: function (SetEntity) {
      if (!_Entity) {

        expect(classes.isGeneral(require('./Entity'), SetEntity)).to.equal(
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

  var _attributes = null;
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

  var _methods = null;
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

  expect(arguments).to.have.length.below(
    3,
    'Invalid arguments length when creating a new EntitySpecification (it ' +
    'has to be passed less than 3 arguments)'
  );

  if (arguments.length === 1) {
    var specification = arguments[0];

    if (specification) {
      expect(specification).to.be.an(
        'object',
        'Invalid argument type when creating a new EntitySpecification (it ' +
        'has to be an object)'
      );

      for (var property in specification) {
        expect(['attributes', 'methods']).to.include(
          property,
          'Invalid property "' + property + '" when creating a new ' +
          'EntitySpecification (valid properties are "attributes" and ' +
          '"methods")'
        );
      }

      if (specification.attributes) {
        expect(typeof specification.attributes).to.equal(
          'object',
          'Invalid property "attributes" when creating a new ' +
          'EntitySpecification (it has to be an object)'
        );

        if (
          specification.attributes instanceof attributes.AttributeCollection
        ) {
          _attributes = specification.attributes;
        } else {
          _attributes = new attributes.AttributeCollection(
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

        if (specification.methods instanceof methods.MethodCollection) {
          _methods = specification.methods;
        } else {
          _methods = new methods.MethodCollection(
            specification.methods
          );
        }
      }
    }
  } else if (arguments.length > 1) {
    var attributesArgument = arguments[0];
    var methodsArgument = arguments[1];

    if (attributesArgument) {
      expect(typeof attributesArgument).to.equal(
        'object',
        'Invalid argument "attributes" when creating a new ' +
        'EntitySpecification (it has to be an object)'
      );

      if (attributesArgument instanceof attributes.AttributeCollection) {
        _attributes = attributesArgument;
      } else {
        _attributes = new attributes.AttributeCollection(
          attributesArgument
        );
      }
    }

    if (methodsArgument) {
      expect(methodsArgument).to.be.an(
        'object',
        'Invalid argument "methods" when creating a new EntitySpecification ' +
        '(it has to be an object)'
      );

      if (methodsArgument instanceof methods.MethodCollection) {
        _methods = methodsArgument;
      } else {
        _methods = new methods.MethodCollection(
          methodsArgument
        );
      }
    }
  } else {
    _attributes = new attributes.AttributeCollection();
    _methods = new methods.MethodCollection();
  }

  _loadEntityMembers();

  /**
   * Loads the attributes and methods of the Entity that is associated with the
   * current specification.
   * @name module:back4app/entity/models.EntitySpecification~_loadEntityMembers
   * @function
   * @private
   * @example
   * _loadEntityMembers();
   */
  function _loadEntityMembers() {
    if (_Entity) {
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
   * module:back4app/entity/models.EntitySpecification~_loadEntityAttribute
   * @function
   * @param {!module:back4app/entity/models/attributes.Attribute} attribute The
   * attribute to be loaded.
   * @private
   * @example
   * _loadEntityAttribute(someAttribute);
   */
  function _loadEntityAttribute(attribute) {}

  /**
   * Loads a method of the Entity that is associated with the current
   * specification.
   * @name
   * module:back4app/entity/models.EntitySpecification~_loadEntityMethod
   * @function
   * @param {!function} func The method's function to be loaded.
   * @param {!string} name The method's name to be loaded.
   * @private
   * @example
   * _loadEntityMethod(someMethodFunction, someMethodName);
   */
  function _loadEntityMethod(func, name) {}

  /**
   * Adds a new attribute to the attributes in the specification.
   * @name module:back4app/entity/models.EntitySpecification#addAttribute
   * @function
   * @param {!module:back4app/entity/models/attributes.Attribute} attribute This
   * is the attribute to be added. It can be passed as a
   * {@link module:back4app/entity/models/attributes.Attribute} instance.
   * @param {?string} [name] This is the name of the attribute.
   * @example
   * entitySpecification.addAttribute(new Attribute('attribute'), 'attribute');
   */
  /**
   * Adds a new attribute to the attributes in the specification
   * @name module:back4app/entity/models.EntitySpecification#addAttribute
   * @function
   * @param {!Object} attribute This is the attribute to be added. It can be
   * passed as an Object, as specified in
   * {@link module:back4app/entity/models/attributes.Attribute}.
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
   * @name module:back4app/entity/models.EntitySpecification#addAttribute
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
        new (Function.prototype.bind.apply(
          attributes.Attribute,
          [null].concat(Array.prototype.slice.call(arguments))
        ))();

    var newAttributes = attributes.AttributeCollection.concat(
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
   * @name module:back4app/entity/models.EntitySpecification#addMethod
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
    var newMethods = methods.MethodCollection.concat(
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
