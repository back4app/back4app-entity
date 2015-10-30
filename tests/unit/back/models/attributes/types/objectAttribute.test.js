//
// Created by davimacedo on 08/10/15.
//

'use strict';

var chai = require('chai');
var expect = chai.expect;
var AssertionError = chai.AssertionError;
var classes = require('../../../../../../src/back/utils').classes;
var models = require('../../../../../../').models;
var ValidationError = models.errors.ValidationError;
var Entity = models.Entity;
var attributes = models.attributes;
var Attribute = attributes.Attribute;
var ObjectAttribute = attributes.types.ObjectAttribute;
var EntityProxy = require('../../EntityProxy');

require('../../../../settings');

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
    it('expect to be a specialization of Attribute', function () {
      expect(classes.isGeneral(Attribute, ObjectAttribute)).to.equal(true);

      expect(new ObjectAttribute('myObjectAttribute'))
        .to.be.an.instanceof(Attribute);
    });

    it('expect to have all properties storing the right values', function () {
      expect(objectAttribute).to.have.property('name')
        .that.equals('attribute');

      expect(objectAttribute).to.have.property('type')
        .that.equals(ObjectAttribute);

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
        .that.equals(ObjectAttribute);

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
        .that.equals(ObjectAttribute);

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
      expect(objectAttribute.type).to.equal(ObjectAttribute);
      expect(objectAttribute.multiplicity).to.equal('1');
      expect(objectAttribute.default).to.equal(null);
    });
  });

  describe('#validateValue', function () {
    it('expect to work correctly', function () {
      objectAttribute.validateValue({});
      objectAttribute.validateValue(new Date());
      objectAttribute.validateValue(new EntityProxy());
      expect(function () {
        objectAttribute.validateValue(1);
      }).to.throw(ValidationError);
      expect(function () {
        objectAttribute.validateValue(null);
      }).to.throw(ValidationError);
      expect(function () {
        objectAttribute.validateValue(function () {});
      }).to.throw(ValidationError);
      expect(function () {
        objectAttribute.validateValue(false);
      }).to.throw(ValidationError);
      expect(function () {
        objectAttribute.validateValue(true);
      }).to.throw(ValidationError);
    });
  });
});
