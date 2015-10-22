//
// Created by davimacedo on 30/09/15.
//

'use strict';

var expect = require('chai').expect;

/**
 * Contains base classes for entity methods modelling.
 * @module back4app-entity/models/methods
 */
module.exports = {};

module.exports.MethodDictionary = MethodDictionary;

/**
 * Dictionary of Entity Methods. An instance of MethodDictionary is not
 * extensible.
 * @constructor
 * @memberof module:back4app-entity/models/methods
 * @param {?Object.<!string, !function>} [methods] The methods to be added in
 * the dictionary. They have to be given as a dictionary of functions.
 * @example
 * var methodDictionary = new MethodDictionary();
 * @example
 * var methodDictionary = new MethodDictionary(null);
 * @example
 * var methodDictionary = new MethodDictionary({});
 * @example
 * var methodDictionary = new MethodDictionary({
 *   method1: function () { return 'method1'; },
 *   method2: function () { return 'method2'; }
 * });
 */
function MethodDictionary(methods) {
  expect(arguments).to.have.length.below(
    2,
    'Invalid arguments length when creating a new MethodDictionary (it has ' +
    'to be passed less than 2 arguments)'
  );

  if (methods) {
    expect(methods).to.be.an(
      'object',
      'Invalid argument type when creating a new MethodDictionary (it has to ' +
      'be an object)'
    );

    for (var method in methods) {
      _addMethod(this, methods[method], method);
    }
  }

  Object.preventExtensions(this);
  Object.seal(this);
}

MethodDictionary.concat = concat;

/**
 * Adds a new method to the dictionary.
 * @name module:back4app-entity/models/methods~_addMethod
 * @function
 * @param {!module:back4app-entity/models/methods.MethodDictionary}
 * methodDictionary This is the MethodDictionary instance to which the method
 * will be added.
 * @param {!function} func This is the method's function to be added.
 * @param {!string} name This is the name of the method.
 * @private
 * @example
 * MethodDictionary.add(
 *   methodDictionary,
 *   function () { return 'method3'; },
 *   'method3'
 * );
 */
function _addMethod(methodDictionary, func, name) {
  expect(func).to.be.a(
    'function',
    'Invalid argument "func" when adding a method called "' + name + '" in a ' +
    'MethodDictionary (it has to be a function)'
  );

  Object.defineProperty(methodDictionary, name, {
    value: func,
    enumerable: true,
    writable: false,
    configurable: false
  });
}

/**
 * Concatenates a MethodDictionary instance with a new method and returns a new
 * MethodDictionary.
 * @name module:back4app-entity/models/methods.MethodDictionary.concat
 * @function
 * @param {!module:back4app-entity/models/methods.MethodDictionary}
 * methodDictionary The MethodDictionary to be concatenated.
 * @param {!function} func The method's function to be concatenated.
 * @param {!string} name The method's name to be concatenated.
 * @returns {module:back4app-entity/models/methods.MethodDictionary} The
 * new concatenated MethodDictionary.
 * @example
 * var concatenatedMethodDictionary = MethodDictionary.concat(
 *   methodDictionary,
 *   function () { return 'newMethod'; },
 *   'newMethod'
 * );
 */
function concat(methodDictionary, func, name) {
  expect(arguments).to.have.length(
    3,
    'Invalid arguments length when concatenating a MethodDictionary (it has ' +
    'to be passed 3 arguments)'
  );

  expect(methodDictionary).to.be.instanceof(
    MethodDictionary,
    'Invalid argument "methodDictionary" when concatenating a ' +
    'MethodDictionary (it has to be a MethodDictionary)'
  );

  expect(func).to.be.a(
    'function',
    'Invalid argument "func" when concatenating a MethodDictionary ' +
    '(it has to be a function)'
  );

  expect(name).to.be.a(
    'string',
    'Invalid argument "name" when concatenating a MethodDictionary ' +
    '(it has to be a string)'
  );

  expect(methodDictionary).to.not.have.ownProperty(
    name,
    'Duplicated method name "' + name + '"'
  );

  var currentMethods = {};

  for (var currentMethod in methodDictionary) {
    currentMethods[currentMethod] = methodDictionary[currentMethod];
  }

  currentMethods[name] = func;

  return new MethodDictionary(currentMethods);
}
