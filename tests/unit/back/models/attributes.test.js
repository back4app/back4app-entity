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

  describe('Attribute', function () {
    var attribute;

    context('interface tests', function () {
      it('expect to not work without arguments', function () {
        expect(function () {
          attribute = new attributes.Attribute();
        }).to.throw(AssertionError);
      });

      it('expect to not work with null argument', function () {
        expect(function () {
          attribute = new attributes.Attribute(null);
        }).to.throw(AssertionError);
      });

      it('expect to not work with empty object', function () {
        expect(function () {
          attribute = new attributes.Attribute({});
        }).to.throw(AssertionError);
      });

      it('expect to work with right arguments', function () {
        attribute = new attributes.Attribute({
          name: 'attribute'
        });
        attribute = new attributes.Attribute({
          name: 'attribute',
          type: 'String'
        });
        attribute = new attributes.Attribute({
          name: 'attribute',
          default: null
        });
        attribute = new attributes.Attribute({
          name: 'attribute',
          multiplicity: '0..1',
        });
        attribute = new attributes.Attribute({
          name: 'attribute',
          type: 'String',
          multiplicity: '0..1'
        });
        attribute = new attributes.Attribute({
          name: 'attribute',
          multiplicity: '0..1',
          default: null
        });
        attribute = new attributes.Attribute({
          name: 'attribute',
          type: 'String',
          multiplicity: '0..1',
          default: null
        });
      });
    });
  });
});
