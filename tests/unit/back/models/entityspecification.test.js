//
// Created by davimacedo on 05/10/15.
//

'use strict';

var chai = require('chai');
var expect = chai.expect;
var AssertionError = chai.AssertionError;
var EntitySpecification = require(
  '../../../../src/back/models/EntitySpecification'
);
var attributes = require('../../../../src/back/models/attributes');
var methods = require('../../../../src/back/models/methods');

describe('EntitySpecification', function () {
  var entitySpecification;

  context('interface tests', function () {
    it('expect to work without arguments', function () {
      entitySpecification = new EntitySpecification();
    });

    it('expect to work with null argument', function () {
      entitySpecification = new EntitySpecification(null);
    });

    it('expect to work with empty object', function () {
      entitySpecification = new EntitySpecification({});
    });

    it('expect to work with right arguments passing as an object',
      function () {
        entitySpecification = new EntitySpecification({
          attributes: null,
          methods: null
        });

        entitySpecification = new EntitySpecification({
          attributes: {},
          methods: {}
        });

        entitySpecification = new EntitySpecification({
          attributes: new attributes.AttributeCollection(),
          methods: new methods.MethodCollection()
        });

        entitySpecification = new EntitySpecification({
          attributes: new attributes.AttributeCollection()
        });

        entitySpecification = new EntitySpecification({
          methods: new methods.MethodCollection()
        });

        entitySpecification = new EntitySpecification({
          attributes: new attributes.AttributeCollection({
            attribute1: new attributes.Attribute('attribute1'),
            attribute2: new attributes.Attribute('attribute2')
          }),
          methods: new methods.MethodCollection({
            method1: function () { return 'method1'; },
            method2: function () { return 'method2'; }
          })
        });
      }
    );

    it('expect to work with right arguments passing as arguments',
      function () {
        entitySpecification = new EntitySpecification(null, null);

        entitySpecification = new EntitySpecification({}, {});

        entitySpecification = new EntitySpecification(
          new attributes.AttributeCollection(),
          new methods.MethodCollection()
        );

        entitySpecification = new EntitySpecification(
          null,
          new methods.MethodCollection()
        );

        entitySpecification = new EntitySpecification(
          new attributes.AttributeCollection(),
          null
        );

        entitySpecification = new EntitySpecification(
          new attributes.AttributeCollection({
            attribute1: new attributes.Attribute('attribute1'),
            attribute2: new attributes.Attribute('attribute2')
          }),
          new methods.MethodCollection({
            method1: function () { return 'method1'; },
            method2: function () { return 'method2'; }
          })
        );
      }
    );

    it('expect to not work with wrong arguments', function () {
      expect(function () {
        entitySpecification = new EntitySpecification({}, {}, {});
      }).to.throw(AssertionError);

      expect(function () {
        entitySpecification = new EntitySpecification(function () {});
      }).to.throw(AssertionError);

      expect(function () {
        entitySpecification = new EntitySpecification({
          attributes: new attributes.AttributeCollection({
            attribute1: new attributes.Attribute('attribute1'),
            attribute2: new attributes.Attribute('attribute2')
          }),
          methods: new methods.MethodCollection({
            method1: function () { return 'method1'; },
            method2: function () { return 'method2'; }
          }),
          doesNotExist: null
        });
      }).to.throw(AssertionError);

      expect(function () {
        entitySpecification = new EntitySpecification({
          attributes: function () {},
          methods: new methods.MethodCollection({
            method1: function () { return 'method1'; },
            method2: function () { return 'method2'; }
          })
        });
      }).to.throw(AssertionError);

      expect(function () {
        entitySpecification = new EntitySpecification({
          attributes: new attributes.AttributeCollection({
            attribute1: new attributes.Attribute('attribute1'),
            attribute2: new attributes.Attribute('attribute2')
          }),
          methods: function () {}
        });
      }).to.throw(AssertionError);

      expect(function () {
        entitySpecification = new EntitySpecification(
          function () {},
          new methods.MethodCollection({
            method1: function () { return 'method1'; },
            method2: function () { return 'method2'; }
          })
        );
      }).to.throw(AssertionError);

      expect(function () {
        entitySpecification = new EntitySpecification(
          new attributes.AttributeCollection({
            attribute1: new attributes.Attribute('attribute1'),
            attribute2: new attributes.Attribute('attribute2')
          }),
          function () {}
        );
      }).to.throw(AssertionError);
    });
  });

  context('functional tests', function () {
    it('expect to have all properties storing the right values', function () {
      expect(entitySpecification.attributes.attribute1.name)
        .to.equal('attribute1');

      expect(entitySpecification.attributes.attribute2.name)
        .to.equal('attribute2');

      expect(entitySpecification.methods.method1())
        .to.equal('method1');

      expect(entitySpecification.methods.method2())
        .to.equal('method2');
    });

    it('expect to be not extensible', function () {
      expect(Object.isExtensible(entitySpecification)).to.equal(false);

      expect(function () {
        entitySpecification.doesNotExist = {};
      }).to.throw(TypeError);

      expect(entitySpecification).to.not.respondTo('doesNotExist');
    });

    it('expect to not allow to delete property', function () {
      expect(function () {
        delete entitySpecification.attributes;
      }).to.throw(Error);

      expect(entitySpecification).to.have.property('attributes');

      expect(function () {
        delete entitySpecification.methods;
      }).to.throw(Error);

      expect(entitySpecification).to.have.property('methods');
    });

    it('expect to not allow to change property', function () {
      expect(function () {
        entitySpecification.attributes = {};
      }).to.throw(Error);

      expect(entitySpecification.attributes.attribute1.name)
        .to.equal('attribute1');

      expect(function () {
        entitySpecification.methods = {};
      }).to.throw(Error);

      expect(entitySpecification.methods.method2())
        .to.equal('method2');
    });
  });
});
