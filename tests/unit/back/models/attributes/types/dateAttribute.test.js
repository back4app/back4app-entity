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
var DateAttribute = attributes.types.DateAttribute;

require('../../../../settings');

describe('DateAttribute', function () {
  var dateAttribute;

  context('interface tests', function () {
    it('expect to not work without arguments', function () {
      expect(function () {
        dateAttribute = new DateAttribute();
      }).to.throw(AssertionError);
    });

    it('expect to not work with null argument', function () {
      expect(function () {
        dateAttribute = new DateAttribute(null);
      }).to.throw(AssertionError);
    });

    it('expect to not work with empty object', function () {
      expect(function () {
        dateAttribute = new DateAttribute({});
      }).to.throw(AssertionError);
    });

    it('expect to work with right arguments passing as an object',
      function () {
        dateAttribute = new DateAttribute({
          name: 'attribute'
        });

        dateAttribute = new DateAttribute({
          name: 'attribute',
          default: null
        });

        dateAttribute = new DateAttribute({
          name: 'attribute',
          multiplicity: '0..1'
        });


        dateAttribute = new DateAttribute({
          name: 'attribute',
          multiplicity: '0..1',
          default: null
        });

      }
    );

    it('expect to work with right arguments passing as arguments',
      function () {
        dateAttribute = new DateAttribute(
          'attribute'
        );

        dateAttribute = new DateAttribute(
          'attribute',
          '0..1'
        );

        dateAttribute = new DateAttribute(
          'attribute',
          '0..1',
          { propertyTest: 'justATest' }
        );
      }
    );

    it('expect to not work with wrong arguments', function () {
      expect(function () {
        dateAttribute = new DateAttribute(
          'attribute',
          '0..1',
          null,
          null,
          null
        );
      }).to.throw(AssertionError);

      expect(function () {
        dateAttribute = new DateAttribute(function () {});
      }).to.throw(AssertionError);

      expect(function () {
        dateAttribute = new DateAttribute({
          multiplicity: '0..1',
          default: null
        });
      }).to.throw(AssertionError);

      expect(function () {
        dateAttribute = new DateAttribute({
          name: null,
          multiplicity: '0..1',
          default: null
        });
      }).to.throw(AssertionError);

      expect(function () {
        dateAttribute = new DateAttribute({
          name: 'attribute',
          multiplicity: '0..1',
          default: null,
          doesNotExist: null
        });
      }).to.throw(AssertionError);

      expect(function () {
        dateAttribute = new DateAttribute({
          name: 'attribute',
          type: 'Date',
          multiplicity: '0..1',
          default: null
        });
      }).to.throw(AssertionError);

      expect(function () {
        dateAttribute = new DateAttribute({
          name: 'attribute',
          multiplicity: null,
          default: null
        });
      }).to.throw(AssertionError);
    });
  });

  context('functional tests', function () {
    it('expect to be a specialization of Attribute', function () {
      expect(classes.isGeneral(Attribute, DateAttribute)).to.equal(true);

      expect(new DateAttribute('myDateAttribute'))
        .to.be.an.instanceof(Attribute);
    });

    it('expect to have all properties storing the right values', function () {
      expect(dateAttribute).to.have.property('name')
        .that.equals('attribute');

      expect(dateAttribute).to.have.property('type')
        .that.equals(DateAttribute);

      expect(dateAttribute).to.have.property('multiplicity')
        .that.equals('0..1');

      expect(dateAttribute).to.have.property('default')
        .that.deep.equals({ propertyTest: 'justATest'});
    });

    it('expect to be not extensible', function () {
      expect(Object.isExtensible(dateAttribute)).to.equal(false);

      expect(function () {
        dateAttribute.doesNotExist = {};
      }).to.throw(TypeError);

      expect(dateAttribute).to.not.respondTo('doesNotExist');
    });

    it('expect to not allow to delete property', function () {
      expect(function () {
        delete dateAttribute.name;
      }).to.throw(Error);

      expect(dateAttribute).to.have.property('name')
        .that.equals('attribute');

      expect(function () {
        delete dateAttribute.type;
      }).to.throw(Error);

      expect(dateAttribute).to.have.property('type')
        .that.equals(DateAttribute);

      expect(function () {
        delete dateAttribute.multiplicity;
      }).to.throw(Error);

      expect(dateAttribute).to.have.property('multiplicity')
        .that.equals('0..1');

      expect(function () {
        delete dateAttribute.default;
      }).to.throw(Error);

      expect(dateAttribute).to.have.property('default')
        .that.deep.equals({ propertyTest: 'justATest' });
    });

    it('expect to not allow to change property', function () {
      expect(function () {
        dateAttribute.name = 'will not change';
      }).to.throw(Error);

      expect(dateAttribute).to.have.property('name')
        .that.equals('attribute');

      expect(function () {
        dateAttribute.type = 'will not change';
      }).to.throw(Error);

      expect(dateAttribute).to.have.property('type')
        .that.equals(DateAttribute);

      expect(function () {
        dateAttribute.multiplicity = 'will not change';
      }).to.throw(Error);

      expect(dateAttribute).to.have.property('multiplicity')
        .that.equals('0..1');

      expect(function () {
        dateAttribute.default = 'will not change';
      }).to.throw(Error);

      expect(dateAttribute).to.have.property('default')
        .that.deep.equals({ propertyTest: 'justATest' });
    });

    it('expect to have the right default values', function () {
      dateAttribute = new DateAttribute('attributeName');

      expect(dateAttribute.name).to.equal('attributeName');
      expect(dateAttribute.type).to.equal(DateAttribute);
      expect(dateAttribute.multiplicity).to.equal('1');
      expect(dateAttribute.default).to.equal(null);
    });
  });

  describe('#validateValue', function () {
    it('expect to work correctly', function () {
      dateAttribute.validateValue(new Date());
      expect(function () {
        dateAttribute.validateValue({});
      }).to.throw(ValidationError);
      expect(function () {
        dateAttribute.validateValue(null);
      }).to.throw(ValidationError);
      expect(function () {
        dateAttribute.validateValue(false);
      }).to.throw(ValidationError);
      expect(function () {
        dateAttribute.validateValue(true);
      }).to.throw(ValidationError);
    });
  });
});
