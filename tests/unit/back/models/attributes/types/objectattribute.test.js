//
// Created by davimacedo on 08/10/15.
//

'use strict';

var chai = require('chai');
var expect = chai.expect;
var AssertionError = chai.AssertionError;
var ObjectAttribute = require(
  '../../../../../../src/back/models/attributes/types/ObjectAttribute'
);

describe('ObjectAttribute', function () {
  var objectAttribute;

  context('interface tests', function () {
    it('expect to not work without arguments', function () {
      expect(function () {
        objectAttribute = new ObjectAttribute();
      }).to.throw(AssertionError);
    });

    it('expect to not work with null argument', function () {
      expect(function () {
        objectAttribute = new ObjectAttribute(null);
      }).to.throw(AssertionError);
    });

    it('expect to not work with empty object', function () {
      expect(function () {
        objectAttribute = new ObjectAttribute({});
      }).to.throw(AssertionError);
    });

    it('expect to work with right arguments passing as an object',
      function () {
        objectAttribute = new ObjectAttribute({
          name: 'attribute'
        });

        objectAttribute = new ObjectAttribute({
          name: 'attribute',
          default: null
        });

        objectAttribute = new ObjectAttribute({
          name: 'attribute',
          multiplicity: '0..1'
        });


        objectAttribute = new ObjectAttribute({
          name: 'attribute',
          multiplicity: '0..1',
          default: null
        });

      }
    );

    it('expect to work with right arguments passing as arguments',
      function () {
        objectAttribute = new ObjectAttribute(
          'attribute'
        );

        objectAttribute = new ObjectAttribute(
          'attribute',
          '0..1'
        );

        objectAttribute = new ObjectAttribute(
          'attribute',
          '0..1',
          { propertyTest: 'justATest' }
        );
      }
    );

    it('expect to not work with wrong arguments', function () {
      expect(function () {
        objectAttribute = new ObjectAttribute(
          'attribute',
          '0..1',
          null,
          null
        );
      }).to.throw(AssertionError);

      expect(function () {
        objectAttribute = new ObjectAttribute(function () {});
      }).to.throw(AssertionError);

      expect(function () {
        objectAttribute = new ObjectAttribute({
          multiplicity: '0..1',
          default: null
        });
      }).to.throw(AssertionError);

      expect(function () {
        objectAttribute = new ObjectAttribute({
          name: null,
          multiplicity: '0..1',
          default: null
        });
      }).to.throw(AssertionError);

      expect(function () {
        objectAttribute = new ObjectAttribute({
          name: 'attribute',
          multiplicity: '0..1',
          default: null,
          doesNotExist: null
        });
      }).to.throw(AssertionError);

      expect(function () {
        objectAttribute = new ObjectAttribute({
          name: 'attribute',
          type: 'Object',
          multiplicity: '0..1',
          default: null
        });
      }).to.throw(AssertionError);

      expect(function () {
        objectAttribute = new ObjectAttribute({
          name: 'attribute',
          multiplicity: null,
          default: null
        });
      }).to.throw(AssertionError);
    });
  });

  context('functional tests', function () {
    it('expect to have all properties storing the right values', function () {
      expect(objectAttribute).to.have.property('name')
        .that.equals('attribute');

      expect(objectAttribute).to.have.property('type')
        .that.equals('Object');

      expect(objectAttribute).to.have.property('multiplicity')
        .that.equals('0..1');

      expect(objectAttribute).to.have.property('default')
        .that.deep.equals({ propertyTest: 'justATest'});
    });

    it('expect to be not extensible', function () {
      expect(Object.isExtensible(objectAttribute)).to.equal(false);

      expect(function () {
        objectAttribute.doesNotExist = {};
      }).to.throw(TypeError);

      expect(objectAttribute).to.not.respondTo('doesNotExist');
    });

    it('expect to not allow to delete property', function () {
      expect(function () {
        delete objectAttribute.name;
      }).to.throw(Error);

      expect(objectAttribute).to.have.property('name')
        .that.equals('attribute');

      expect(function () {
        delete objectAttribute.type;
      }).to.throw(Error);

      expect(objectAttribute).to.have.property('type')
        .that.equals('Object');

      expect(function () {
        delete objectAttribute.multiplicity;
      }).to.throw(Error);

      expect(objectAttribute).to.have.property('multiplicity')
        .that.equals('0..1');

      expect(function () {
        delete objectAttribute.default;
      }).to.throw(Error);

      expect(objectAttribute).to.have.property('default')
        .that.deep.equals({ propertyTest: 'justATest' });
    });

    it('expect to not allow to change property', function () {
      expect(function () {
        objectAttribute.name = 'will not change';
      }).to.throw(Error);

      expect(objectAttribute).to.have.property('name')
        .that.equals('attribute');

      expect(function () {
        objectAttribute.type = 'will not change';
      }).to.throw(Error);

      expect(objectAttribute).to.have.property('type')
        .that.equals('Object');

      expect(function () {
        objectAttribute.multiplicity = 'will not change';
      }).to.throw(Error);

      expect(objectAttribute).to.have.property('multiplicity')
        .that.equals('0..1');

      expect(function () {
        objectAttribute.default = 'will not change';
      }).to.throw(Error);

      expect(objectAttribute).to.have.property('default')
        .that.deep.equals({ propertyTest: 'justATest' });
    });

    it('expect to have the right default values', function () {
      objectAttribute = new ObjectAttribute('attributeName');

      expect(objectAttribute.name).to.equal('attributeName');
      expect(objectAttribute.type).to.equal('Object');
      expect(objectAttribute.multiplicity).to.equal('1');
      expect(objectAttribute.default).to.equal(null);
    });
  });
});
