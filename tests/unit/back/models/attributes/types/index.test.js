//
// Created by davimacedo on 08/10/15.
//

'use strict';

var chai = require('chai');
var AssertionError = chai.AssertionError;
var expect = chai.expect;
var classes = require('../../../../../../src/back/utils/classes');
var AttributeTypeNotFoundError = require(
  '../../../../../../src/back/models/errors'
).AttributeTypeNotFoundError;
var Attribute = require(
  '../../../../../../src/back/models/attributes/Attribute'
);
var attributesTypesIndex = require(
  '../../../../../../src/back/models/attributes/types'
);
var ObjectAttribute = require(
  '../../../../../../src/back/models/attributes/types/ObjectAttribute'
);

describe('attributesTypesIndex', function () {
  it(
    'expect to export BooleanAttribute in the BooleanAttribute property',
    function () {
      expect(attributesTypesIndex).to.have.property('BooleanAttribute')
        .that.equals(BooleanAttribute);
    }
  );

  it(
    'expect to export DateAttribute in the DateAttribute property',
    function () {
      expect(attributesTypesIndex).to.have.property('DateAttribute')
        .that.equals(DateAttribute);
    }
  );

  it(
    'expect to export NumberAttribute in the NumberAttribute property',
    function () {
      expect(attributesTypesIndex).to.have.property('NumberAttribute')
        .that.equals(NumberAttribute);
    }
  );

  it(
    'expect to export ObjectAttribute in the ObjectAttribute property',
    function () {
      expect(attributesTypesIndex).to.have.property('ObjectAttribute')
        .that.equals(ObjectAttribute);
    }
  );

  it(
    'expect to export StringAttribute in the StringAttribute property',
    function () {
      expect(attributesTypesIndex).to.have.property('StringAttribute')
        .that.equals(StringAttribute);
    }
  );

  describe('~get', function () {
    it(
      'expect to export get function in the get property',
      function () {
        expect(attributesTypesIndex).to.have.property('get');

        expect(attributesTypesIndex.get).to.be.a('function');
      }
    );

    it(
      'expect to work with right argument and get the right type',
      function () {
        expect(attributesTypesIndex.get('ObjectAttribute'))
          .to.equal(ObjectAttribute);

        expect(attributesTypesIndex.get('Object')).to.equal(ObjectAttribute);

        attributesTypesIndex.MyCustomAttribute = MyCustomAttribute;

        function MyCustomAttribute() {
          Attribute.apply(this, Array.prototype.slice.call(arguments));
        }

        classes.generalize(Attribute, MyCustomAttribute);

        expect(attributesTypesIndex.get('MyCustomAttribute'))
          .to.equal(MyCustomAttribute);

        expect(attributesTypesIndex.get('MyCustom'))
          .to.equal(MyCustomAttribute);
      }
    );

    it('expect to not work with wrong arguments', function () {
      expect(function () {
        attributesTypesIndex.get();
      }).to.throw(AssertionError);

      expect(function () {
        attributesTypesIndex.get('ObjectAttribute', null);
      }).to.throw(AssertionError);

      expect(function () {
        attributesTypesIndex.get(null);
      }).to.throw(AssertionError);
    });

    it('expect to throw AttributeTypeNotFoundError when the Attribute type' +
      ' cannot be found', function () {
      expect(function () {
        attributesTypesIndex.get('NotExistent');

        attributesTypesIndex.get('NotExistentAttribute');

        attributesTypesIndex.get('bject');

        attributesTypesIndex.get('bjectAttribute');

        attributesTypesIndex.get('ObjectAttribut');
      }).to.throw(AttributeTypeNotFoundError);
    });

    it('expect to not be set', function () {
      expect(function () {
        attributesTypesIndex.get = function () {};
      }).to.throw(Error);
    });
  });
});
