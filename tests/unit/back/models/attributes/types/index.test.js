//
// Created by davimacedo on 08/10/15.
//

'use strict';

var expect = require('chai').expect;
var attributesTypesIndex = require(
  '../../../../../../src/back/models/attributes/types'
);
var ObjectAttribute = require(
  '../../../../../../src/back/models/attributes/types/ObjectAttribute'
);

describe('attributesTypesIndex', function () {
  it(
    'expect to export ObjectAttribute in the ObjectAttribute property',
    function () {
      expect(attributesTypesIndex).to.have.property('ObjectAttribute')
        .that.equals(ObjectAttribute);
    }
  );
});
