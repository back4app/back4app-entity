define(function (require, exports, module) {//
// Created by davimacedo on 22/09/15.
//

var Entity = require('./Entity');
var EntitySpecification = require('./EntitySpecification');
var attributes = require('./attributes');
var methods = require('./methods');
var errors = require('./errors');

/**
 * Contains base classes to model the entities.
 * @module back4app/entity/models
 */
module.exports = {};

module.exports.Entity = Entity;
module.exports.EntitySpecification = EntitySpecification;
module.exports.attributes = attributes;
module.exports.methods = methods;
module.exports.errors = errors;

});
