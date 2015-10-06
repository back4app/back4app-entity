//
// Created by davimacedo on 30/09/15.
//

'use strict';

var expect = require('chai').expect;

/**
 * Contains base classes for Entity Method modeling.
 * @module back4app/entity/models/methods
 */
module.exports = {};

module.exports.MethodCollection = MethodCollection;

/**
 * Collection of Entity Methods. An instance of MethodCollection is not
 * extensible.
 * @constructor
 * @memberof module:back4app/entity/models/methods
 * @param {?Object.<!string, !function>} [methods] The methods to be added in
 * the collection. They have to be given as a Dictionary of functions.
 * @example
 * var methodCollection = new MethodCollection();
 * @example
 * var methodCollection = new MethodCollection(null);
 * @example
 * var methodCollection = new MethodCollection({});
 * @example
 * var methodCollection = new MethodCollection({
 *   method1: function () { return 'method1'; },
 *   method2: function () { return 'method2'; }
 * });
 */
function MethodCollection(methods) {
  expect(arguments).to.have.length.below(
    2,
    'Invalid arguments length when creating a new MethodCollection (it has ' +
    'to be passed less than 2 arguments)'
  );

  if (methods) {
    expect(methods).to.be.an(
      'object',
      'Invalid argument type when creating a new MethodCollection (it has to ' +
      'be an object)'
    );

    for (var method in methods) {
      _addMethod(this, methods[method], method);
    }
  }

  Object.preventExtensions(this);
  Object.seal(this);
}

MethodCollection.concat = concat;

/**
 * Adds a new method to the collection.
 * @name module:back4app/entity/models/methods~_addMethod
 * @function
 * @param {!module:back4app/entity/models/methods.MethodCollection}
 * methodCollection This is the MethodCollection instance to which the method
 * will be added.
 * @param {!function} func This is the method's function to be added.
 * @param {!string} name This is the name of the method.
 * @private
 * @example
 * MethodCollection.add(
 *   methodCollection,
 *   function () { return 'method3'; },
 *   'method3'
 * );
 */
function _addMethod(methodCollection, func, name) {
  expect(func).to.be.a(
    'function',
    'Invalid argument "func" when adding a method called "' + name + '" in a ' +
    'MethodCollection (it has to be a function)'
  );

  Object.defineProperty(methodCollection, name, {
    value: func,
    enumerable: true,
    writable: false,
    configurable: false
  });
}

/**
 * Concatenates an MethodCollection instance with a new method and returns a new
 * MethodCollection.
 * @name module:back4app/entity/models/methods.MethodCollection.concat
 * @function
 * @param {!module:back4app/entity/models/methods.MethodCollection}
 * methodCollection The MethodCollection to be concatenated.
 * @param {!function} func The method's function to be concatenated.
 * @param {!string} name The method's name to be concatenated.
 * @returns {module:back4app/entity/models/methods.MethodCollection} The
 * new concatenated MethodCollection.
 * @example
 * var concatenatedMethodCollection = MethodCollection.concat(
 *   methodCollection,
 *   function () { return 'newMethod'; },
 *   'newMethod'
 * );
 */
function concat(methodCollection, func, name) {
  expect(arguments).to.have.length(
    3,
    'Invalid arguments length when concatenating a MethodCollection (it has ' +
    'to be passed 3 arguments)'
  );

  expect(methodCollection).to.be.instanceof(
    MethodCollection,
    'Invalid argument "methodCollection" when concatenating a ' +
    'MethodCollection (it has to be a MethodCollection)'
  );

  expect(func).to.be.a(
    'function',
    'Invalid argument "func" when concatenating a MethodCollection ' +
    '(it has to be a function)'
  );

  expect(name).to.be.a(
    'string',
    'Invalid argument "name" when concatenating a MethodCollection ' +
    '(it has to be a string)'
  );

  expect(methodCollection).to.not.have.ownProperty(
    name,
    'Duplicated method name "' + name + '"'
  );

  var currentMethods = {};

  for (var currentMethod in methodCollection) {
    currentMethods[currentMethod] = methodCollection[currentMethod];
  }

  currentMethods[name] = func;

  return new MethodCollection(currentMethods);
}
