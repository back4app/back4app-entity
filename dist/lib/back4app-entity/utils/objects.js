define(function (require, exports, module) {//
// Created by davimacedo on 09/10/15.
//

'use strict';

var expect = require('chai').expect;

/**
 * Contains utilities functions to be used with objects around the project. This
 * module is not exported to be used outside this project.
 * @module back4app/entity/utils/objects
 */
module.exports = {};

module.exports.copy = copy;

/**
 * Makes a copy of a given object. This function is not exported to be used
 * outside this project.
 * @param {!Object} o The object to be copied.
 * @returns {Object} The new copy of the given object.
 * @example
 * var copy = objects.copy(myObject);
 */
function copy(o) {
  expect(arguments).to.have.length(
    1,
    'Invalid argument length when copying an object (it has to be passed ' +
    '1 argument)'
  );

  expect(o).to.be.an(
    'object',
    'Invalid argument "o" when copying an object (it has to be an object)'
  );

  var oCopy = {};

  for (var property in o) {
    oCopy[property] = o[property];
  }

  return oCopy;
}

});
