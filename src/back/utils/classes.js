//
// Created by davimacedo on 22/09/15.
//

'use strict';

var util = require('util');
var expect = require('chai').expect;

/**
 * Contains utilities functions to be used with classes around the project.
 * @module back4app-entity/utils/classes
 */
module.exports = {};

module.exports.generalize = generalize;
module.exports.isGeneral = isGeneral;

/**
 * Makes the GeneralClass to generalize the SpecificClass.
 * @param {!Class} GeneralClass The general class to generalize the
 * SpecificClass.
 * @param {!Class} SpecificClass The specific class to be generalized by the
 * GeneralClass.
 * @example
 * function GeneralClass() {}
 *
 * function SpecificClass() {
 *   GeneralClass.call(this);
 * }
 *
 * classes.generalize(GeneralClass, SpecificClass);
 */
function generalize(GeneralClass, SpecificClass) {
  expect(arguments).to.have.length(
    2,
    'Invalid argument length when generalizing classes (it has to be passed ' +
    '2 arguments)'
  );
  expect(GeneralClass).to.be.a(
    'function',
    'Invalid argument "GeneralClass" when generalizing classes (it has to be ' +
    'a function)'
  );
  expect(SpecificClass).to.be.a(
    'function',
    'Invalid argument "SpecificClass" when generalizing classes (ut has to ' +
    'be a function)'
  );

  util.inherits(SpecificClass, GeneralClass);

  for (var property in GeneralClass) {
    if (property !== 'super_') {
      SpecificClass[property] = GeneralClass[property];
    }
  }
}

/**
 * Checks if the GeneralClass generalizes the SpecificClass.
 * @param {!Class} GeneralClass The general class to check.
 * @param {!Class} SpecificClass The specific class to check.
 * @example
 * function GeneralClass() {}
 *
 * function SpecificClass() {
 *   GeneralClass.call(this);
 * }
 *
 * classes.generalize(GeneralClass, SpecificClass);
 *
 * console.log(classes.isGeneral(GeneralClass, SpecificClass)); // Logs "true"
 *
 * console.log(classes.isGeneral(GeneralClass, GeneralClass)); // Logs "true"
 *
 * console.log(classes.isGeneral(SpecificClass, SpecificClass)); // Logs "true"
 *
 * console.log(classes.isGeneral(SpecificClass, GeneralClass)); // Logs "false"
 */
function isGeneral(GeneralClass, SpecificClass) {
  expect(arguments).to.have.length(
    2,
    'Invalid argument length when checking if a class is general of another ' +
    '(it has to be passed 2 arguments)'
  );
  expect(GeneralClass).to.be.a(
    'function',
    'Invalid argument "GeneralClass" when checking if a class is general of ' +
    'another (it has to be a function)'
  );
  expect(SpecificClass).to.be.a(
    'function',
    'Invalid argument "SpecificClass" when checking if a class is general ' +
    'of another (it has to be a function)'
  );

  var visitedClasses = [];
  var CurrentClass = SpecificClass;

  while (CurrentClass && visitedClasses.indexOf(CurrentClass) === -1) {
    if (CurrentClass === GeneralClass) {
      return true;
    }

    visitedClasses.push(CurrentClass);
    CurrentClass = CurrentClass.super_;
  }

  return false;
}
