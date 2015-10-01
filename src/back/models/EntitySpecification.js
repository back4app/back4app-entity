//
// Created by davimacedo on 30/09/15.
//

'use strict';

var expect = require('chai').expect;
var attributes = require('./attributes');
var methods = require('./methods');

module.exports = EntitySpecification;

/**
 * Class to specify an Entity.
 * @constructor
 * @memberof module:back4app/entity/models
 * @name EntitySpecification
 * @param
 * {(module:back4app/entity/models/attributes.AttributeCollection|
 * Object.<string, (Attribute|Object)>)}
 * attributes The new entity specification attributes. It can be given as an
 * instance of
 * {@link module:back4app/entity/models/attributes.AttributeCollection} or an
 * object, as specified in
 * {@link module:back4app/entity/models/attributes.AttributeCollection}.
 * @param {(module:back4app/entity/models/methods.MethodCollection|
 * Object.<string, (Method|Object)>)}
 * methods The new entity specification methods. It can be given as an instance
 * of
 * {@link module:back4app/entity/models/methods.MethodCollection} or an
 * object, as specified in
 * {@link module:back4app/entity/models/methods.MethodCollection}.
 */
/**
 * Class to specify an Entity.
 * @constructor
 * @memberof module:back4app/entity/models
 * @name EntitySpecification
 * @param {Object} specification The new Entity specification.
 * @param
 * {(module:back4app/entity/models/attributes.AttributeCollection|
 * Object.<string, (Attribute|Object)>)}
 * specification.attributes The new entity specification attributes. It can be
 * given as an instance of
 * {@link module:back4app/entity/models/attributes.AttributeCollection} or an
 * object, as specified in
 * {@link module:back4app/entity/models/attributes.AttributeCollection}.
 * @param {(module:back4app/entity/models/methods.MethodCollection|
 * Object.<string, (Method|Object)>)}
 * specification.methods The new entity specification methods. It can be
 * given as an instance of
 * {@link module:back4app/entity/models/methods.MethodCollection} or an
 * object, as specified in
 * {@link module:back4app/entity/models/methods.MethodCollection}.
 */
function EntitySpecification() {
  expect(arguments).to.have.length.below(3);

  /**
   * Collection of specific attributes of an entity.
   * @memberof module:back4app/entity/models.EntitySpecification
   * @type {AttributeCollection}
   */
  this.attributes = null;

  var _attributes = null;

  /**
   * Collection of specific methods of an entity.
   * @memberof module:back4app/entity/models.EntitySpecification
   * @type {MethodCollection}
   */
  this.methods = null;

  var _methods = null;

  if (arguments.length === 1) {
    var specification = arguments[0];

    expect(specification).to.be.an('object');
    for (var property in specification) {
      expect(['attributes', 'methods']).to.include(property);
    }

    if (specification.attributes) {
      expect(specification.attributes).to.be.an('object');

      if (specification.attributes instanceof attributes.AttributeCollection) {
        _attributes = specification.attributes;
      } else {
        _attributes = new attributes.AttributeCollection(
          specification.attributes
        );
      }
    }

    if (specification.methods) {
      expect(specification.methods).to.be.an('object');

      if (specification.methods instanceof methods.MethodCollection) {
        _methods = specification.methods;
      } else {
        _methods = new methods.MethodCollection(
          specification.methods
        );
      }
    }
  } else if (arguments.length > 1) {
    var attributesArgument = arguments[0];
    var methodsArgument = arguments[1];

    if (attributesArgument) {
      expect(attributesArgument).to.be.an('object');

      if (attributesArgument instanceof attributes.AttributeCollection) {
        _attributes = attributesArgument;
      } else {
        _attributes = new attributes.AttributeCollection(
          attributesArgument
        );
      }
    }

    if (methodsArgument) {
      expect(methodsArgument).to.be.an('object');

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

  Object.defineProperty(this, 'attributes', {
    get: function () {
      return _attributes;
    },
    set: function () {
      throw new Error('Attributes cannot be changed');
    }
  });

  Object.defineProperty(this, 'methods', {
    get: function () {
      return _methods;
    },
    set: function () {
      throw new Error('Methods cannot be changed');
    }
  });
}
