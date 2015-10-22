//
// Created by davimacedo on 08/10/15.
//

'use strict';

var expect = require('chai').expect;
var attributesIndex = require('../../../../../src/back/models/attributes');
var Attribute = require('../../../../../src/back/models/attributes/Attribute');
var AttributeDictionary = require(
  '../../../../../src/back/models/attributes/AttributeDictionary'
);
var types = require('../../../../../src/back/models/attributes/types');

require('../../../settings');

describe('attributesIndex', function () {
  it('expect to export Attribute in the Attribute property', function () {
    expect(attributesIndex).to.have.property('Attribute')
      .that.equals(Attribute);
  });

  it(
    'expect to export AttributeDictionary in the AttributeDictionary property',
    function () {
      expect(attributesIndex).to.have.property('AttributeDictionary')
        .that.equals(AttributeDictionary);
    }
  );

  it('expect to export types in the types property', function () {
    expect(attributesIndex).to.have.property('types')
      .that.equals(types);
  });
});
