//
// Created by davimacedo on 22/09/15.
//

'use strict';

var expect = require('chai').expect;

/**
 * Contains utilities functions to be used with classes around the project.
 * @module back4app/entity/utils/classes
 */
module.exports = {};
module.exports.generalize = generalize;

/**
 * Makes the generalClass to generalize the specificClass.
 * @param {Class} generalClass The general class to generalize the
 * specificClass.
 * @param {Class} specificClass The specific class to be generalized by the
 * generalClass.
 * @example
 * function GeneralClass() {}
 *
 * function SpecificClass() {
 *   GeneralClass.call(this);
 * }
 *
 * classes.generalize(GeneralClass, SpecificClass);
 */
function generalize(generalClass, specificClass) {
  expect(generalClass).to.be.a('function');
  expect(specificClass).to.be.a('function');

  specificClass.prototype = Object.create(generalClass.prototype);
  specificClass.prototype.constructor = specificClass;

  for (var property in generalClass) {
    specificClass[property] = generalClass[property];
  }
}
