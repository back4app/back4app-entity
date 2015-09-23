//
// Created by davimacedo on 22/09/15.
//

/**
 * Contains utilities functions to be used with classes around the project.
 * @module back4app/entity/utils/classes
 */
module.exports = {};
module.exports.generalize = generalize;

/**
 * Generalizes the specificClass based on a generalClass.
 * @param {Function} specificClass The specific class to be generalized.
 * @param {Function} generalClass The general class on which the generalization
 * will be based.
 * @example
 * function GeneralClass() {}
 *
 * function SpecificClass() {
 *   GeneralClass.call(this);
 * }
 *
 * generalize(SpecificClass, GeneralClass);
 */
function generalize(specificClass, generalClass) {
  specificClass.prototype = Object.create(generalClass.prototype);
  specificClass.prototype.constructor = specificClass;

  for (var property in generalClass) {
    specificClass[property] = generalClass[property];
  }
}
