//
// Created by davimacedo on 08/10/15.
//

'use strict';

var chai = require('chai');
var expect = chai.expect;
var AssertionError = chai.AssertionError;
var classes = require('../../../../../src/back/utils').classes;
var attributes = require('../../../../../').models.attributes;
var Attribute = attributes.Attribute;
var StringAttribute = attributes.types.StringAttribute;
var ObjectAttribute = attributes.types.ObjectAttribute;

describe('Attribute', function () {
  var attribute;

  function WrongAttributeProxy() {
    attributes.Attribute.apply(this, Array.prototype.slice.call(arguments));
  }

  function AttributeProxy() {
    attributes.Attribute.apply(this, Array.prototype.slice.call(arguments));
  }

  classes.generalize(Attribute, AttributeProxy);

  context('interface tests', function () {
    it('expect to not be able to instantiate directly', function () {
      expect(function () {
        attribute = new Attribute();
      }).to.throw(AssertionError);
    });

    it(
      'expect to not be not able to instantiate from a non subclass',
      function () {
        expect(function () {
          attribute = new WrongAttributeProxy();
        }).to.throw(AssertionError);
      }
    );

    it('expect to not work without arguments', function () {
      expect(function () {
        attribute = new AttributeProxy();
      }).to.throw(AssertionError);
    });

    it('expect to not work with null argument', function () {
      expect(function () {
        attribute = new AttributeProxy(null);
      }).to.throw(AssertionError);
    });

    it('expect to not work with empty object', function () {
      expect(function () {
        attribute = new AttributeProxy({});
      }).to.throw(AssertionError);
    });

    it('expect to work with right arguments passing as an object',
      function () {
        attribute = new AttributeProxy({
          name: 'attribute'
        });

        attribute = new AttributeProxy({
          name: 'attribute',
          type: StringAttribute
        });

        attribute = new AttributeProxy({
          name: 'attribute',
          default: null
        });

        attribute = new AttributeProxy({
          name: 'attribute',
          multiplicity: '0..1'
        });

        attribute = new AttributeProxy({
          name: 'attribute',
          type: StringAttribute,
          multiplicity: '0..1'
        });

        attribute = new AttributeProxy({
          name: 'attribute',
          multiplicity: '0..1',
          default: null
        });

        attribute = new AttributeProxy({
          name: 'attribute',
          type: StringAttribute,
          multiplicity: '0..1',
          default: null
        });
      }
    );

    it('expect to work with right arguments passing as arguments',
      function () {
        attribute = new AttributeProxy(
          'attribute'
        );

        attribute = new AttributeProxy(
          'attribute',
          StringAttribute
        );

        attribute = new AttributeProxy(
          'attribute',
          StringAttribute,
          '0..1'
        );

        attribute = new AttributeProxy(
          'attribute',
          StringAttribute,
          '0..1',
          'defaultValue'
        );
      }
    );

    it('expect to not work with wrong arguments', function () {
      expect(function () {
        attribute = new AttributeProxy();
      }).to.throw(AssertionError);

      expect(function () {
        attribute = new AttributeProxy(
          'attribute',
          StringAttribute,
          '0..1',
          null,
          null
        );
      }).to.throw(AssertionError);

      expect(function () {
        attribute = new AttributeProxy(function () {});
      }).to.throw(AssertionError);

      expect(function () {
        attribute = new AttributeProxy({
          type: StringAttribute,
          multiplicity: '0..1',
          default: null
        });
      }).to.throw(AssertionError);

      expect(function () {
        attribute = new AttributeProxy({
          name: null,
          type: StringAttribute,
          multiplicity: '0..1',
          default: null
        });
      }).to.throw(AssertionError);

      expect(function () {
        attribute = new AttributeProxy({
          name: 'attribute',
          type: StringAttribute,
          multiplicity: '0..1',
          default: null,
          doesNotExist: null
        });
      }).to.throw(AssertionError);

      expect(function () {
        attribute = new AttributeProxy({
          name: 'attribute',
          type: null,
          multiplicity: '0..1',
          default: null
        });
      }).to.throw(AssertionError);

      expect(function () {
        attribute = new AttributeProxy({
          name: 'attribute',
          type: function () {},
          multiplicity: '0..1',
          default: null
        });
      }).to.throw(AssertionError);

      expect(function () {
        attribute = new AttributeProxy({
          name: 'attribute',
          type: StringAttribute,
          multiplicity: null,
          default: null
        });
      }).to.throw(AssertionError);

      expect(function () {
        attribute = new AttributeProxy({
          name: 'attribute',
          type: StringAttribute,
          multiplicity: 'willnotwork',
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
        .that.equals(StringAttribute);

      expect(attribute).to.have.property('multiplicity')
        .that.equals('0..1');

      expect(attribute).to.have.property('default')
        .that.equals('defaultValue');
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
        delete attribute.name;
      }).to.throw(Error);

      expect(attribute).to.have.property('name')
        .that.equals('attribute');

      expect(function () {
        delete attribute.type;
      }).to.throw(Error);

      expect(attribute).to.have.property('type')
        .that.equals(StringAttribute);

      expect(function () {
        delete attribute.multiplicity;
      }).to.throw(Error);

      expect(attribute).to.have.property('multiplicity')
        .that.equals('0..1');

      expect(function () {
        delete attribute.default;
      }).to.throw(Error);

      expect(attribute).to.have.property('default')
        .that.equals('defaultValue');
    });

    it('expect to not allow to change property', function () {
      expect(function () {
        attribute.name = 'will not change';
      }).to.throw(Error);

      expect(attribute).to.have.property('name')
        .that.equals('attribute');

      expect(function () {
        attribute.type = ObjectAttribute;
      }).to.throw(Error);

      expect(attribute).to.have.property('type')
        .that.equals(StringAttribute);

      expect(function () {
        attribute.multiplicity = 'will not change';
      }).to.throw(Error);

      expect(attribute).to.have.property('multiplicity')
        .that.equals('0..1');

      expect(function () {
        attribute.default = 'will not change';
      }).to.throw(Error);

      expect(attribute).to.have.property('default')
        .that.equals('defaultValue');
    });

    it('expect to have the right default values', function () {
      var attribute2 = new AttributeProxy('attributeName');

      expect(attribute2.name).to.equal('attributeName');
      expect(attribute2.type).to.equal(ObjectAttribute);
      expect(attribute2.multiplicity).to.equal('1');
      expect(attribute2.default).to.equal(null);
    });
  });
});
