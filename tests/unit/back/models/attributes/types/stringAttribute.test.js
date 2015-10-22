//
// Created by davimacedo on 09/10/15.
//

'use strict';

var chai = require('chai');
var expect = chai.expect;
var AssertionError = chai.AssertionError;
var classes = require('../../../../../../src/back/utils').classes;
var models = require('../../../../../../').models;
var ValidationError = models.errors.ValidationError;
var attributes = models.attributes;
var Attribute = attributes.Attribute;
var StringAttribute = attributes.types.StringAttribute;

require('../../../../settings');

describe('StringAttribute', function () {
  var stringAttribute;

  context('interface tests', function () {
    it('expect to not work without arguments', function () {
      expect(function () {
        stringAttribute = new StringAttribute();
      }).to.throw(AssertionError);
    });

    it('expect to not work with null argument', function () {
      expect(function () {
        stringAttribute = new StringAttribute(null);
      }).to.throw(AssertionError);
    });

    it('expect to not work with empty object', function () {
      expect(function () {
        stringAttribute = new StringAttribute({});
      }).to.throw(AssertionError);
    });

    it('expect to work with right arguments passing as an object',
      function () {
        stringAttribute = new StringAttribute({
          name: 'attribute'
        });

        stringAttribute = new StringAttribute({
          name: 'attribute',
          default: null
        });

        stringAttribute = new StringAttribute({
          name: 'attribute',
          multiplicity: '0..1'
        });


        stringAttribute = new StringAttribute({
          name: 'attribute',
          multiplicity: '0..1',
          default: null
        });

      }
    );

    it('expect to work with right arguments passing as arguments',
      function () {
        stringAttribute = new StringAttribute(
          'attribute'
        );

        stringAttribute = new StringAttribute(
          'attribute',
          '0..1'
        );

        stringAttribute = new StringAttribute(
          'attribute',
          '0..1',
          { propertyTest: 'justATest' }
        );
      }
    );

    it('expect to not work with wrong arguments', function () {
      expect(function () {
        stringAttribute = new StringAttribute(
          'attribute',
          '0..1',
          null,
          null
        );
      }).to.throw(AssertionError);

      expect(function () {
        stringAttribute = new StringAttribute(function () {});
      }).to.throw(AssertionError);

      expect(function () {
        stringAttribute = new StringAttribute({
          multiplicity: '0..1',
          default: null
        });
      }).to.throw(AssertionError);

      expect(function () {
        stringAttribute = new StringAttribute({
          name: null,
          multiplicity: '0..1',
          default: null
        });
      }).to.throw(AssertionError);

      expect(function () {
        stringAttribute = new StringAttribute({
          name: 'attribute',
          multiplicity: '0..1',
          default: null,
          doesNotExist: null
        });
      }).to.throw(AssertionError);

      expect(function () {
        stringAttribute = new StringAttribute({
          name: 'attribute',
          type: 'String',
          multiplicity: '0..1',
          default: null
        });
      }).to.throw(AssertionError);

      expect(function () {
        stringAttribute = new StringAttribute({
          name: 'attribute',
          multiplicity: null,
          default: null
        });
      }).to.throw(AssertionError);
    });
  });

  context('functional tests', function () {
    it('expect to be a specialization of Attribute', function () {
      expect(classes.isGeneral(Attribute, StringAttribute)).to.equal(true);

      expect(new StringAttribute('myStringAttribute'))
        .to.be.an.instanceof(Attribute);
    });

    it('expect to have all properties storing the right values', function () {
      expect(stringAttribute).to.have.property('name')
        .that.equals('attribute');

      expect(stringAttribute).to.have.property('type')
        .that.equals(StringAttribute);

      expect(stringAttribute).to.have.property('multiplicity')
        .that.equals('0..1');

      expect(stringAttribute).to.have.property('default')
        .that.deep.equals({ propertyTest: 'justATest'});
    });

    it('expect to be not extensible', function () {
      expect(Object.isExtensible(stringAttribute)).to.equal(false);

      expect(function () {
        stringAttribute.doesNotExist = {};
      }).to.throw(TypeError);

      expect(stringAttribute).to.not.respondTo('doesNotExist');
    });

    it('expect to not allow to delete property', function () {
      expect(function () {
        delete stringAttribute.name;
      }).to.throw(Error);

      expect(stringAttribute).to.have.property('name')
        .that.equals('attribute');

      expect(function () {
        delete stringAttribute.type;
      }).to.throw(Error);

      expect(stringAttribute).to.have.property('type')
        .that.equals(StringAttribute);

      expect(function () {
        delete stringAttribute.multiplicity;
      }).to.throw(Error);

      expect(stringAttribute).to.have.property('multiplicity')
        .that.equals('0..1');

      expect(function () {
        delete stringAttribute.default;
      }).to.throw(Error);

      expect(stringAttribute).to.have.property('default')
        .that.deep.equals({ propertyTest: 'justATest' });
    });

    it('expect to not allow to change property', function () {
      expect(function () {
        stringAttribute.name = 'will not change';
      }).to.throw(Error);

      expect(stringAttribute).to.have.property('name')
        .that.equals('attribute');

      expect(function () {
        stringAttribute.type = 'will not change';
      }).to.throw(Error);

      expect(stringAttribute).to.have.property('type')
        .that.equals(StringAttribute);

      expect(function () {
        stringAttribute.multiplicity = 'will not change';
      }).to.throw(Error);

      expect(stringAttribute).to.have.property('multiplicity')
        .that.equals('0..1');

      expect(function () {
        stringAttribute.default = 'will not change';
      }).to.throw(Error);

      expect(stringAttribute).to.have.property('default')
        .that.deep.equals({ propertyTest: 'justATest' });
    });

    it('expect to have the right default values', function () {
      stringAttribute = new StringAttribute('attributeName');

      expect(stringAttribute.name).to.equal('attributeName');
      expect(stringAttribute.type).to.equal(StringAttribute);
      expect(stringAttribute.multiplicity).to.equal('1');
      expect(stringAttribute.default).to.equal(null);
    });
  });

  describe('#validateValue', function () {
    it('expect to work correctly', function () {
      stringAttribute.validateValue('');
      stringAttribute.validateValue('anything');
      /* jshint ignore:start */
      stringAttribute.validateValue(new String());
      /* jshint ignore:end */
      expect(function () {
        stringAttribute.validateValue(1);
      }).to.throw(ValidationError);
      expect(function () {
        stringAttribute.validateValue(function () {});
      }).to.throw(ValidationError);
      expect(function () {
        stringAttribute.validateValue(null);
      }).to.throw(ValidationError);
      expect(function () {
        stringAttribute.validateValue(false);
      }).to.throw(ValidationError);
      expect(function () {
        stringAttribute.validateValue(true);
      }).to.throw(ValidationError);
    });
  });
});
