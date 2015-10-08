//
// Created by davimacedo on 08/10/15.
//

'use strict';

var expect = require('chai').expect;
var attributesIndex = require('../../../../../src/back/models/attributes');
var Attribute = require('../../../../../src/back/models/attributes/Attribute');
var AttributeCollection = require(
  '../../../../../src/back/models/attributes/AttributeCollection'
);
var types = require('../../../../../src/back/models/attributes/types');

describe('attributesIndex', function () {
  it('expect to export Attribute in the Attribute property', function () {
    expect(attributesIndex).to.have.property('Attribute')
      .that.equals(Attribute);
  });

  it(
    'expect to export AttributeCollection in the AttributeCollection property',
    function () {
      expect(attributesIndex).to.have.property('AttributeCollection')
        .that.equals(AttributeCollection);
    }
  );

  it('expect to export types in the types property', function () {
    expect(attributesIndex).to.have.property('types')
      .that.equals(types);
  });
});
