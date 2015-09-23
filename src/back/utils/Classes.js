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
module.exports.generalization = generalization;

/**
 * Generalizes the specificClass based on a generalClass.
 * @param {Class} specificClass The specific class to be generalized.
 * @param {Class} generalClass The general class on which the
 * generalization will be based.
 * @example
 * function GeneralClass() {}
 *
 * function SpecificClass() {
 *   GeneralClass.call(this);
 * }
 *
 * classes.generalization(SpecificClass, GeneralClass);
 */
function generalization(specificClass, generalClass) {
  expect(specificClass).to.be.a('function');
  expect(generalClass).to.be.a('function');

  specificClass.prototype = Object.create(generalClass.prototype);
  specificClass.prototype.constructor = specificClass;

  for (var property in generalClass) {
    specificClass[property] = generalClass[property];
  }
}
