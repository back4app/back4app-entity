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

      it('expect to work with right arguments passing as an object',
        function () {
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
            multiplicity: '0..1'
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
        }
      );

      it('expect to work with right arguments passing as arguments',
        function () {
          attribute = new attributes.Attribute(
            'attribute'
          );

          attribute = new attributes.Attribute(
            'attribute',
            'String'
          );

          attribute = new attributes.Attribute(
            'attribute',
            'String',
            '0..1'
          );

          attribute = new attributes.Attribute(
            'attribute',
            'String',
            '0..1',
            null
          );
        }
      );

      it('expect to not work with wrong arguments', function () {
        expect(function () {
          attribute = new attributes.Attribute();
        }).to.throw(AssertionError);

        expect(function () {
          attribute = new attributes.Attribute(
            'attribute',
            'String',
            '0..1',
            null,
            null
          );
        }).to.throw(AssertionError);

        expect(function () {
          attribute = new attributes.Attribute(function () {});
        }).to.throw(AssertionError);

        expect(function () {
          attribute = new attributes.Attribute({
            type: 'String',
            multiplicity: '0..1',
            default: null
          });
        }).to.throw(AssertionError);

        expect(function () {
          attribute = new attributes.Attribute({
            name: null,
            type: 'String',
            multiplicity: '0..1',
            default: null
          });
        }).to.throw(AssertionError);

        expect(function () {
          attribute = new attributes.Attribute({
            name: 'attribute',
            type: 'String',
            multiplicity: '0..1',
            default: null,
            doesNotExist: null
          });
        }).to.throw(AssertionError);

        expect(function () {
          attribute = new attributes.Attribute({
            name: 'attribute',
            type: null,
            multiplicity: '0..1',
            default: null
          });
        }).to.throw(AssertionError);

        expect(function () {
          attribute = new attributes.Attribute({
            name: 'attribute',
            type: 'String',
            multiplicity: null,
            default: null
          });
        }).to.throw(AssertionError);
      });
    });

    context('functional tests', function () {
      it('expect to have all properties storing the right values', function () {
        expect(attribute).to.have.property('name')
          .that.equals('attribute');

        expect(attribute).to.have.property('type')
          .that.equals('String');

        expect(attribute).to.have.property('multiplicity')
          .that.equals('0..1');

        expect(attribute).to.have.property('default')
          .that.equals(null);
      });

      it('expect to be not extensible', function () {
        expect(Object.isExtensible(attribute)).to.equal(false);

        expect(function () {
          attribute.doesNotExist = {};
        }).to.throw(TypeError);

        expect(attribute).to.not.respondTo('doesNotExist');
      });

      it('expect to not allow to delete property', function () {
        expect(function () {
          delete attribute.default;
        }).to.throw(Error);

        expect(attribute).to.have.property('name')
          .that.equals('attribute');
      });

      it('expect to not allow to change property', function () {
        expect(function () {
          attribute.name = 'will not change';
        }).to.throw(Error);

        expect(attribute).to.have.property('name')
          .that.equals('attribute');
      });
    });
  });
});
