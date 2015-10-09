//
// Created by davimacedo on 09/10/15.
//

'use strict';

var chai = require('chai');
var expect = chai.expect;
var AssertionError = chai.AssertionError;
var classes = require('../../../../../../src/back/utils/classes');
var Attribute = require(
  '../../../../../../src/back/models/attributes/Attribute'
);
var NumberAttribute = require(
  '../../../../../../src/back/models/attributes/types/NumberAttribute'
);

describe('NumberAttribute', function () {
  var numberAttribute;

  context('interface tests', function () {
    it('expect to not work without arguments', function () {
      expect(function () {
        numberAttribute = new NumberAttribute();
      }).to.throw(AssertionError);
    });

    it('expect to not work with null argument', function () {
      expect(function () {
        numberAttribute = new NumberAttribute(null);
      }).to.throw(AssertionError);
    });

    it('expect to not work with empty object', function () {
      expect(function () {
        numberAttribute = new NumberAttribute({});
      }).to.throw(AssertionError);
    });

    it('expect to work with right arguments passing as an object',
      function () {
        numberAttribute = new NumberAttribute({
          name: 'attribute'
        });

        numberAttribute = new NumberAttribute({
          name: 'attribute',
          default: null
        });

        numberAttribute = new NumberAttribute({
          name: 'attribute',
          multiplicity: '0..1'
        });


        numberAttribute = new NumberAttribute({
          name: 'attribute',
          multiplicity: '0..1',
          default: null
        });

      }
    );

    it('expect to work with right arguments passing as arguments',
      function () {
        numberAttribute = new NumberAttribute(
          'attribute'
        );

        numberAttribute = new NumberAttribute(
          'attribute',
          '0..1'
        );

        numberAttribute = new NumberAttribute(
          'attribute',
          '0..1',
          { propertyTest: 'justATest' }
        );
      }
    );

    it('expect to not work with wrong arguments', function () {
      expect(function () {
        numberAttribute = new NumberAttribute(
          'attribute',
          '0..1',
          null,
          null
        );
      }).to.throw(AssertionError);

      expect(function () {
        numberAttribute = new NumberAttribute(function () {});
      }).to.throw(AssertionError);

      expect(function () {
        numberAttribute = new NumberAttribute({
          multiplicity: '0..1',
          default: null
        });
      }).to.throw(AssertionError);

      expect(function () {
        numberAttribute = new NumberAttribute({
          name: null,
          multiplicity: '0..1',
          default: null
        });
      }).to.throw(AssertionError);

      expect(function () {
        numberAttribute = new NumberAttribute({
          name: 'attribute',
          multiplicity: '0..1',
          default: null,
          doesNotExist: null
        });
      }).to.throw(AssertionError);

      expect(function () {
        numberAttribute = new NumberAttribute({
          name: 'attribute',
          type: 'Number',
          multiplicity: '0..1',
          default: null
        });
      }).to.throw(AssertionError);

      expect(function () {
        numberAttribute = new NumberAttribute({
          name: 'attribute',
          multiplicity: null,
          default: null
        });
      }).to.throw(AssertionError);
    });
  });

  context('functional tests', function () {
    it('expect to be a specialization of Attribute', function () {
      expect(classes.isGeneral(Attribute, NumberAttribute)).to.equal(true);

      expect(new NumberAttribute('myNumberAttribute'))
        .to.be.an.instanceof(Attribute);
    });

    it('expect to have all properties storing the right values', function () {
      expect(numberAttribute).to.have.property('name')
        .that.equals('attribute');

      expect(numberAttribute).to.have.property('type')
        .that.equals('Number');

      expect(numberAttribute).to.have.property('multiplicity')
        .that.equals('0..1');

      expect(numberAttribute).to.have.property('default')
        .that.deep.equals({ propertyTest: 'justATest'});
    });

    it('expect to be not extensible', function () {
      expect(Object.isExtensible(numberAttribute)).to.equal(false);

      expect(function () {
        numberAttribute.doesNotExist = {};
      }).to.throw(TypeError);

      expect(numberAttribute).to.not.respondTo('doesNotExist');
    });

    it('expect to not allow to delete property', function () {
      expect(function () {
        delete numberAttribute.name;
      }).to.throw(Error);

      expect(numberAttribute).to.have.property('name')
        .that.equals('attribute');

      expect(function () {
        delete numberAttribute.type;
      }).to.throw(Error);

      expect(numberAttribute).to.have.property('type')
        .that.equals('Number');

      expect(function () {
        delete numberAttribute.multiplicity;
      }).to.throw(Error);

      expect(numberAttribute).to.have.property('multiplicity')
        .that.equals('0..1');

      expect(function () {
        delete numberAttribute.default;
      }).to.throw(Error);

      expect(numberAttribute).to.have.property('default')
        .that.deep.equals({ propertyTest: 'justATest' });
    });

    it('expect to not allow to change property', function () {
      expect(function () {
        numberAttribute.name = 'will not change';
      }).to.throw(Error);

      expect(numberAttribute).to.have.property('name')
        .that.equals('attribute');

      expect(function () {
        numberAttribute.type = 'will not change';
      }).to.throw(Error);

      expect(numberAttribute).to.have.property('type')
        .that.equals('Number');

      expect(function () {
        numberAttribute.multiplicity = 'will not change';
      }).to.throw(Error);

      expect(numberAttribute).to.have.property('multiplicity')
        .that.equals('0..1');

      expect(function () {
        numberAttribute.default = 'will not change';
      }).to.throw(Error);

      expect(numberAttribute).to.have.property('default')
        .that.deep.equals({ propertyTest: 'justATest' });
    });

    it('expect to have the right default values', function () {
      numberAttribute = new NumberAttribute('attributeName');

      expect(numberAttribute.name).to.equal('attributeName');
      expect(numberAttribute.type).to.equal('Number');
      expect(numberAttribute.multiplicity).to.equal('1');
      expect(numberAttribute.default).to.equal(null);
    });
  });
});
