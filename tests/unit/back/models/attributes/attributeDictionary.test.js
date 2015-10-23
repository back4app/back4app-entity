//
// Created by davimacedo on 08/10/15.
//

'use strict';

var chai = require('chai');
var expect = chai.expect;
var AssertionError = chai.AssertionError;
var attributes = require('../../../../../').models.attributes;

require('../../../settings');

describe('AttributeDictionary', function () {
  var attributeDictionary;

  context('interface tests', function () {
    it('expect to work without arguments', function () {
      attributeDictionary = new attributes.AttributeDictionary();
    });

    it('expect to work with null argument', function () {
      attributeDictionary = new attributes.AttributeDictionary(null);
    });

    it('expect to work with empty object', function () {
      attributeDictionary = new attributes.AttributeDictionary({});
    });

    it('expect to work with right arguments', function () {
      attributeDictionary = new attributes.AttributeDictionary({
        attribute1: attributes.Attribute.resolve('attribute1'),
        attribute2: attributes.Attribute.resolve('attribute2')
      });

      attributeDictionary = new attributes.AttributeDictionary({
        attribute1: {},
        attribute2: {}
      });

      attributeDictionary = new attributes.AttributeDictionary([
        attributes.Attribute.resolve('attribute1'),
        attributes.Attribute.resolve('attribute2')
      ]);

      attributeDictionary = new attributes.AttributeDictionary([
        { name: 'attribute1' },
        { name: 'attribute2' }
      ]);
    });

    it('expect to not work with wrong arguments', function () {
      expect(function () {
        attributeDictionary = new attributes.AttributeDictionary({}, {});
      }).to.throw(AssertionError);

      expect(function () {
        attributeDictionary = new attributes.AttributeDictionary(
          function () {}
        );
      }).to.throw(AssertionError);

      expect(function () {
        attributeDictionary = new attributes.AttributeDictionary({
          attribute1: null
        });
      }).to.throw(AssertionError);

      expect(function () {
        attributeDictionary = new attributes.AttributeDictionary({
          attribute1: {
            name: 'differentName'
          }
        });
      }).to.throw(AssertionError);

      expect(function () {
        attributeDictionary = new attributes.AttributeDictionary([
          null
        ]);
      }).to.throw(AssertionError);

      expect(function () {
        attributeDictionary = new attributes.AttributeDictionary([
          { name: 'sameName' },
          { name: 'sameName' }
        ]);
      }).to.throw(AssertionError);
    });
  });

  context('functional tests', function () {
    it('expect to allow get attributes correctly', function () {
      expect(attributeDictionary.attribute1.name).to.equal('attribute1');
      expect(attributeDictionary.attribute2.name).to.equal('attribute2');
    });

    it('expect to allow to list attributes', function () {
      var attributes = [];

      for (var attribute in attributeDictionary) {
        attributes.push(attribute);
      }

      expect(attributes).to.be.deep.equal(['attribute1', 'attribute2']);
    });

    it('expect to be not extensible', function () {
      expect(Object.isExtensible(attributeDictionary)).to.equal(false);

      expect(function () {
        attributeDictionary.attribute3 = attributes.Attribute.resolve(
          'attribute3'
        );
      }).to.throw(TypeError);

      expect(attributeDictionary).to.not.have.property('attribute3');
    });

    it('expect to not allow to delete attribute', function () {
      expect(function () {
        delete attributeDictionary.attribute1;
      }).to.throw(Error);

      expect(attributeDictionary).to.have.property('attribute1');
    });

    it('expect to not allow to change method', function () {
      expect(function () {
        attributeDictionary.attribute1 = attributes.Attribute.resolve(
          'wontWork'
        );
      }).to.throw(Error);

      expect(attributeDictionary.attribute1.name).to.equal('attribute1');
    });
  });

  describe('.concat', function () {
    var attributeDictionary;
    var concatenatedAttributeDictionary;

    it(
      'expect to work with right arguments and have specified behavior',
      function () {
        attributeDictionary = new attributes.AttributeDictionary([
          attributes.Attribute.resolve('attribute1'),
          attributes.Attribute.resolve('attribute2')
        ]);

        concatenatedAttributeDictionary =
          attributes
            .AttributeDictionary
            .concat(
              attributeDictionary,
              attributes.Attribute.resolve('attribute3')
            );

        expect(concatenatedAttributeDictionary)
          .to.not.deep.equal(attributeDictionary);

        expect(Object.keys(concatenatedAttributeDictionary))
          .to.deep.equal(['attribute1', 'attribute2', 'attribute3']);

        expect(concatenatedAttributeDictionary.attribute1.name)
          .to.equal('attribute1');
        expect(concatenatedAttributeDictionary.attribute2.name)
          .to.equal('attribute2');
        expect(concatenatedAttributeDictionary.attribute3.name)
          .to.equal('attribute3');
      }
    );

    it('expect to not work with wrong arguments', function () {
      expect(function () {
        concatenatedAttributeDictionary =
          attributes
            .AttributeDictionary
            .concat(
              attributes.Attribute.resolve('attribute3')
            );
      }).to.throw(AssertionError);

      expect(function () {
        concatenatedAttributeDictionary =
          attributes
            .AttributeDictionary
            .concat(
              attributeDictionary,
              attributes.Attribute.resolve('attribute3'),
              null
            );
      }).to.throw(AssertionError);

      expect(function () {
        concatenatedAttributeDictionary =
          attributes
            .AttributeDictionary
            .concat(
              {},
              attributes.Attribute.resolve('attribute3')
            );
      }).to.throw(AssertionError);

      expect(function () {
        concatenatedAttributeDictionary =
          attributes
            .AttributeDictionary
            .concat(
              attributeDictionary,
              {}
            );
      }).to.throw(AssertionError);
    });

    it('expect to not work with duplicated', function () {
      expect(function () {
        concatenatedAttributeDictionary =
          attributes
            .AttributeDictionary
            .concat(
              concatenatedAttributeDictionary,
              attributes.Attribute.resolve('attribute3')
            );
      }).to.throw(AssertionError);
    });
  });
});
