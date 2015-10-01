//
// Created by davimacedo on 30/09/15.
//

var expect = require('chai').expect;

/**
 * Contains base classes for Entity Attribute modeling.
 * @module back4app/entity/models/attributes
 */
module.exports = {};
module.exports.Attribute = Attribute;
module.exports.AttributeCollection = AttributeCollection;

/**
 * Holds an Entity Attribute information.
 * @constructor
 * @memberof module:back4app/entity/models/attributes
 */
function Attribute() {}

/**
 * Collection of Entity Attributes.
 * @constructor
 * @memberof module:back4app/entity/models/attributes
 * @name AttributeCollection
 * @param {?module:back4app/entity/models/attributes.Attribute[]}
 * [attributes] The attributes to be added in the collection.
 */
/**
 * Collection of Entity Attributes.
 * @constructor
 * @memberof module:back4app/entity/models/attributes
 * @name AttributeCollection
 * @param {?Object.<string, (module:back4app/entity/models/attributes.Attribute|
 * Object)>}
 * [attributes] The attributes to be added in the collection.
 */
function AttributeCollection(attributes) {
  if (attributes) {
    expect(attributes).to.be.an('object');

    if (attributes instanceof Array) {
      for (var i = 0; i < attributes.length; i++) {
        expect(attributes[i]).to.be.an('object');

        this.add(attributes[i]);
      }
    } else {
      for (var attribute in attributes) {
        expect(attributes[attribute]).to.be.an('object');

        this.add(attributes[attribute], attribute);
      }
    }
  }
}

AttributeCollection.prototype.add = function (attribute, name) {}
