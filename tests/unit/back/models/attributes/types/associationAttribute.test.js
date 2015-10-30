//
// Created by davimacedo on 13/10/15.
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
var AssociationAttribute = attributes.types.AssociationAttribute;
var EntityProxy = require('../../EntityProxy');

require('../../../../settings');

describe('AssociationAttribute', function () {
  var MyEntity30 = Entity.specify('MyEntity30');
  var associationAttribute;

  context('interface tests', function () {
    it('expect to not work without arguments', function () {
      expect(function () {
        associationAttribute = new AssociationAttribute();
      }).to.throw(AssertionError);
    });

    it('expect to not work with null argument', function () {
      expect(function () {
        associationAttribute = new AssociationAttribute(null);
      }).to.throw(AssertionError);
    });

    it('expect to not work with empty object', function () {
      expect(function () {
        associationAttribute = new AssociationAttribute({});
      }).to.throw(AssertionError);
    });

    it('expect to work with right arguments passing as an object',
      function () {
        associationAttribute = new AssociationAttribute({
          name: 'attribute',
          entity: 'MyEntity30'
        });

        associationAttribute = new AssociationAttribute({
          name: 'attribute',
          Entity: 'MyEntity30',
          default: null
        });

        associationAttribute = new AssociationAttribute({
          name: 'attribute',
          entity: Entity.getSpecialization('MyEntity30'),
          multiplicity: '0..1'
        });


        associationAttribute = new AssociationAttribute({
          name: 'attribute',
          Entity: Entity,
          multiplicity: '0..1',
          default: null
        });

      }
    );

    it('expect to work with right arguments passing as arguments',
      function () {
        associationAttribute = new AssociationAttribute(
          'attribute',
          'MyEntity30'
        );

        associationAttribute = new AssociationAttribute(
          'attribute',
          Entity,
          '0..1'
        );

        associationAttribute = new AssociationAttribute(
          'attribute',
          'MyEntity30',
          '0..1',
          { propertyTest: 'justATest' }
        );
      }
    );

    it('expect to not work with wrong arguments', function () {
      expect(function () {
        associationAttribute = new AssociationAttribute(
          'attribute',
          'MyEntity30',
          '0..1',
          null,
          null,
          null
        );
      }).to.throw(AssertionError);

      expect(function () {
        associationAttribute = new AssociationAttribute(function () {});
      }).to.throw(AssertionError);

      expect(function () {
        associationAttribute = new AssociationAttribute({
          multiplicity: '0..1',
          default: null
        });
      }).to.throw(AssertionError);

      expect(function () {
        associationAttribute = new AssociationAttribute({
          entity: 'associationAttribute',
          multiplicity: '0..1',
          default: null
        });
      }).to.throw(AssertionError);

      expect(function () {
        associationAttribute = new AssociationAttribute({
          name: 'MyEntity30',
          multiplicity: '0..1',
          default: null
        });
      }).to.throw(AssertionError);

      expect(function () {
        associationAttribute = new AssociationAttribute({
          name: null,
          Entity: 'MyEntity30',
          multiplicity: '0..1',
          default: null
        });
      }).to.throw(AssertionError);

      expect(function () {
        associationAttribute = new AssociationAttribute({
          name: 'associationAttribute',
          Entity: null,
          multiplicity: '0..1',
          default: null
        });
      }).to.throw(AssertionError);

      expect(function () {
        associationAttribute = new AssociationAttribute({
          name: 'attribute',
          Entity: 'MyEntity30',
          multiplicity: '0..1',
          default: null,
          doesNotExist: null
        });
      }).to.throw(AssertionError);

      expect(function () {
        associationAttribute = new AssociationAttribute({
          name: 'attribute',
          type: 'Association',
          Entity: 'MyEntity30',
          multiplicity: '0..1',
          default: null
        });
      }).to.throw(AssertionError);

      expect(function () {
        associationAttribute = new AssociationAttribute({
          name: 'attribute',
          Entity: 'MyEntity30',
          multiplicity: null,
          default: null
        });
      }).to.throw(AssertionError);
    });
  });

  context('functional tests', function () {
    it('expect to be a specialization of Attribute', function () {
      expect(classes.isGeneral(Attribute, AssociationAttribute)).to.equal(true);

      expect(new AssociationAttribute('myAssociationAttribute', 'MyEntity30'))
        .to.be.an.instanceof(Attribute);
    });

    it('expect to have all properties storing the right values', function () {
      expect(associationAttribute).to.have.property('name')
        .that.equals('attribute');

      expect(associationAttribute).to.have.property('type')
        .that.equals(AssociationAttribute);

      expect(associationAttribute).to.have.property('Entity')
        .that.equals(Entity.getSpecialization('MyEntity30'));

      expect(associationAttribute).to.have.property('multiplicity')
        .that.equals('0..1');

      expect(associationAttribute).to.have.property('default')
        .that.deep.equals({ propertyTest: 'justATest'});
    });

    it('expect to be not extensible', function () {
      expect(Object.isExtensible(associationAttribute)).to.equal(false);

      expect(function () {
        associationAttribute.doesNotExist = {};
      }).to.throw(TypeError);

      expect(associationAttribute).to.not.respondTo('doesNotExist');
    });

    it('expect to not allow to delete property', function () {
      expect(function () {
        delete associationAttribute.name;
      }).to.throw(Error);

      expect(associationAttribute).to.have.property('name')
        .that.equals('attribute');

      expect(function () {
        delete associationAttribute.type;
      }).to.throw(Error);

      expect(associationAttribute).to.have.property('type')
        .that.equals(AssociationAttribute);

      expect(function () {
        delete associationAttribute.Entity;
      }).to.throw(Error);

      expect(associationAttribute).to.have.property('Entity')
        .that.equals(Entity.getSpecialization('MyEntity30'));

      expect(function () {
        delete associationAttribute.multiplicity;
      }).to.throw(Error);

      expect(associationAttribute).to.have.property('multiplicity')
        .that.equals('0..1');

      expect(function () {
        delete associationAttribute.default;
      }).to.throw(Error);

      expect(associationAttribute).to.have.property('default')
        .that.deep.equals({ propertyTest: 'justATest' });
    });

    it('expect to not allow to change property', function () {
      expect(function () {
        associationAttribute.name = 'will not change';
      }).to.throw(Error);

      expect(associationAttribute).to.have.property('name')
        .that.equals('attribute');

      expect(function () {
        associationAttribute.type = 'will not change';
      }).to.throw(Error);

      expect(associationAttribute).to.have.property('type')
        .that.equals(AssociationAttribute);

      expect(function () {
        associationAttribute.Entity = 'will not change';
      }).to.throw(Error);

      expect(associationAttribute).to.have.property('Entity')
        .that.equals(Entity.getSpecialization('MyEntity30'));

      expect(function () {
        associationAttribute.multiplicity = 'will not change';
      }).to.throw(Error);

      expect(associationAttribute).to.have.property('multiplicity')
        .that.equals('0..1');

      expect(function () {
        associationAttribute.default = 'will not change';
      }).to.throw(Error);

      expect(associationAttribute).to.have.property('default')
        .that.deep.equals({ propertyTest: 'justATest' });
    });

    it('expect to have the right default values', function () {
      associationAttribute = new AssociationAttribute(
        'attributeName',
        Entity
      );

      expect(associationAttribute.name).to.equal('attributeName');
      expect(associationAttribute.type).to.equal(AssociationAttribute);
      expect(associationAttribute.Entity).to.equal(Entity);
      expect(associationAttribute.multiplicity).to.equal('1');
      expect(associationAttribute.default).to.equal(null);
    });
  });

  describe('#validateValue', function () {
    it('expect to work correctly', function () {
      associationAttribute = new AssociationAttribute(
        'attribute',
        'MyEntity30',
        '0..1',
        { propertyTest: 'justATest' }
      );
      associationAttribute.validateValue(new MyEntity30());
      associationAttribute.validateValue(
        new (MyEntity30.specify('MyEntity31'))()
      );
      expect(function () {
        associationAttribute.validateValue(null);
      }).to.throw(ValidationError);
      expect(function () {
        associationAttribute.validateValue(new EntityProxy());
      }).to.throw(ValidationError);
    });
  });
});
