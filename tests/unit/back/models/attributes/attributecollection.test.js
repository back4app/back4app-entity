//
// Created by davimacedo on 08/10/15.
//

'use strict';

var chai = require('chai');
var expect = chai.expect;
var AssertionError = chai.AssertionError;
var attributes = require('../../../../../src/back/models/attributes');

describe('AttributeCollection', function () {
  var attributeCollection;

  context('interface tests', function () {
    it('expect to work without arguments', function () {
      attributeCollection = new attributes.AttributeCollection();
    });

    it('expect to work with null argument', function () {
      attributeCollection = new attributes.AttributeCollection(null);
    });

    it('expect to work with empty object', function () {
      attributeCollection = new attributes.AttributeCollection({});
    });

    it('expect to work with right arguments', function () {
      attributeCollection = new attributes.AttributeCollection({
        attribute1: new attributes.Attribute.resolve('attribute1'),
        attribute2: new attributes.Attribute.resolve('attribute2')
      });

      attributeCollection = new attributes.AttributeCollection({
        attribute1: {},
        attribute2: {}
      });

      attributeCollection = new attributes.AttributeCollection([
        new attributes.Attribute.resolve('attribute1'),
        new attributes.Attribute.resolve('attribute2')
      ]);

      attributeCollection = new attributes.AttributeCollection([
        { name: 'attribute1' },
        { name: 'attribute2' }
      ]);
    });

    it('expect to not work with wrong arguments', function () {
      expect(function () {
        attributeCollection = new attributes.AttributeCollection({}, {});
      }).to.throw(AssertionError);

      expect(function () {
        attributeCollection = new attributes.AttributeCollection(
          function () {}
        );
      }).to.throw(AssertionError);

      expect(function () {
        attributeCollection = new attributes.AttributeCollection({
          attribute1: null
        });
      }).to.throw(AssertionError);

      expect(function () {
        attributeCollection = new attributes.AttributeCollection({
          attribute1: {
            name: 'differentName'
          }
        });
      }).to.throw(AssertionError);

      expect(function () {
        attributeCollection = new attributes.AttributeCollection([
          null
        ]);
      }).to.throw(AssertionError);

      expect(function () {
        attributeCollection = new attributes.AttributeCollection([
          { name: 'sameName' },
          { name: 'sameName' }
        ]);
      }).to.throw(AssertionError);
    });
  });

  context('functional tests', function () {
    it('expect to allow get attributes correctly', function () {
      expect(attributeCollection.attribute1.name).to.equal('attribute1');
      expect(attributeCollection.attribute2.name).to.equal('attribute2');
    });

    it('expect to allow to list attributes', function () {
      var attributes = [];

      for (var attribute in attributeCollection) {
        attributes.push(attribute);
      }

      expect(attributes).to.be.deep.equal(['attribute1', 'attribute2']);
    });

    it('expect to be not extensible', function () {
      expect(Object.isExtensible(attributeCollection)).to.equal(false);

      expect(function () {
        attributeCollection.attribute3 = new attributes.Attribute.resolve(
          'attribute3'
        );
      }).to.throw(TypeError);

      expect(attributeCollection).to.not.have.property('attribute3');
    });

    it('expect to not allow to delete attribute', function () {
      expect(function () {
        delete attributeCollection.attribute1;
      }).to.throw(Error);

      expect(attributeCollection).to.have.property('attribute1');
    });

    it('expect to not allow to change method', function () {
      expect(function () {
        attributeCollection.attribute1 = new attributes.Attribute('wontWork');
      }).to.throw(Error);

      expect(attributeCollection.attribute1.name).to.equal('attribute1');
    });
  });

  describe('.concat', function () {
    var attributeCollection;
    var concatenatedAttributeCollection;

    it(
      'expect to work with right arguments and have specified behavior',
      function () {
        attributeCollection = new attributes.AttributeCollection([
          attributes.Attribute.resolve('attribute1'),
          attributes.Attribute.resolve('attribute2')
        ]);

        concatenatedAttributeCollection =
          attributes
            .AttributeCollection
            .concat(
            attributeCollection,
            attributes.Attribute.resolve('attribute3')
          );

        expect(concatenatedAttributeCollection)
          .to.not.deep.equal(attributeCollection);

        expect(Object.keys(concatenatedAttributeCollection))
          .to.deep.equal(['attribute1', 'attribute2', 'attribute3']);

        expect(concatenatedAttributeCollection.attribute1.name)
          .to.equal('attribute1');
        expect(concatenatedAttributeCollection.attribute2.name)
          .to.equal('attribute2');
        expect(concatenatedAttributeCollection.attribute3.name)
          .to.equal('attribute3');
      }
    );

    it('expect to not work with wrong arguments', function () {
      expect(function () {
        concatenatedAttributeCollection =
          attributes
            .AttributeCollection
            .concat(
            new attributes.Attribute('attribute3')
          );
      }).to.throw(AssertionError);

      expect(function () {
        concatenatedAttributeCollection =
          attributes
            .AttributeCollection
            .concat(
            attributeCollection,
            new attributes.Attribute('attribute3'),
            null
          );
      }).to.throw(AssertionError);

      expect(function () {
        concatenatedAttributeCollection =
          attributes
            .AttributeCollection
            .concat(
            {},
            new attributes.Attribute('attribute3')
          );
      }).to.throw(AssertionError);

      expect(function () {
        concatenatedAttributeCollection =
          attributes
            .AttributeCollection
            .concat(
            attributeCollection,
            {}
          );
      }).to.throw(AssertionError);
    });

    it('expect to not work with duplicated', function () {
      expect(function () {
        concatenatedAttributeCollection =
          attributes
            .AttributeCollection
            .concat(
            concatenatedAttributeCollection,
            new attributes.Attribute('attribute3')
          );
      }).to.throw(AssertionError);
    });
  });
});
