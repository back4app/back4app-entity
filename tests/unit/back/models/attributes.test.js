//
// Created by davimacedo on 05/10/15.
//

'use strict';

var chai = require('chai');
var expect = chai.expect;
var AssertionError = chai.AssertionError;
var attributes = require('../../../../src/back/models/attributes');

describe('attributes', function () {
  it(
    'expect to export Attribute in the Attribute property',
    function () {
      expect(attributes).to.have.property('Attribute');
    }
  );

  it(
    'expect to export AttributeCollection in the AttributeCollection property',
    function () {
      expect(attributes).to.have.property('AttributeCollection');
    }
  );
});
