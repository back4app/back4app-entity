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
 * Collection of Entity Methods.
 * @constructor
 * @memberof module:back4app/entity/models/methods
 * @param {?Object.<!string, !function>} [methods] The methods to be added in
 * the collection. They have to be given as a Dictionary of functions.
 */
function MethodCollection(methods) {
  expect(arguments).to.have.length.below(
    2,
    'Invalid arguments length when creating a new MethodCollection'
  );

  if (methods) {
    expect(methods).to.be.an(
      'object',
      'Invalid argument type when creating a new MethodCollection'
    );

    for (var method in methods) {
      MethodCollection.add(this, methods[method], method);
    }
  }
}

/**
 * Adds a new method to the collection.
 * @param {!module:back4app/entity/models/methods.MethodCollection}
 * methodCollection This is the MethodCollection instance to which the method
 * will be added.
 * @param {!function} func This is the method's function to be added.
 * @param {!string} name This is the name of the method.
 */
MethodCollection.add = function (methodCollection, func, name) {
  expect(arguments).to.have.length(
    3,
    'Invalid arguments length when adding a method in a MethodCollection'
  );

  expect(methodCollection).to.be.instanceof(
    MethodCollection,
    'Invalid argument "methodCollection" when adding a method in a ' +
    'MethodCollection (it has to be a MethodCollection instance)'
  );
  expect(func).to.be.a(
    'function',
    'Invalid argument "func" when adding a method in a MethodCollection (it ' +
    'has to be a function)'
  );
  expect(name).to.be.a(
    'string',
    'Invalid argument "name" when adding a method in a MethodCollection (it ' +
    'has to be a string)'
  );

  expect(methodCollection).to.not.have.ownProperty(
    name,
    'Duplicated method name in a MethodCollection'
  );

  Object.defineProperty(methodCollection, name, {
    get: function () {
      return func;
    },
    set: function () {
      throw new Error('Method cannot be changed');
    }
  });
};
