//
// Created by davimacedo on 05/10/15.
//

'use strict';

var chai = require('chai');
var expect = chai.expect;
var AssertionError = chai.AssertionError;
var attributes = require('../../../../src/back/models/attributes');

describe('attributes', function () {
  it(
    'expect to export Attribute in the Attribute property',
    function () {
      expect(attributes).to.have.property('Attribute');
    }
  );

  it(
    'expect to export AttributeCollection in the AttributeCollection property',
    function () {
      expect(attributes).to.have.property('AttributeCollection');
    }
  );

  describe('Attribute', function () {
    var attribute;

    context('interface tests', function () {
      it('expect to not work without arguments', function () {
        expect(function () {
          attribute = new attributes.Attribute();
        }).to.throw(AssertionError);
      });

      it('expect to not work with null argument', function () {
        expect(function () {
          attribute = new attributes.Attribute(null);
        }).to.throw(AssertionError);
      });

      it('expect to not work with empty object', function () {
        expect(function () {
          attribute = new attributes.Attribute({});
        }).to.throw(AssertionError);
      });

      it('expect to work with right arguments passing as an object',
        function () {
          attribute = new attributes.Attribute({
            name: 'attribute'
          });

          attribute = new attributes.Attribute({
            name: 'attribute',
            type: 'String'
          });

          attribute = new attributes.Attribute({
            name: 'attribute',
            default: null
          });

          attribute = new attributes.Attribute({
            name: 'attribute',
            multiplicity: '0..1'
          });

          attribute = new attributes.Attribute({
            name: 'attribute',
            type: 'String',
            multiplicity: '0..1'
          });

          attribute = new attributes.Attribute({
            name: 'attribute',
            multiplicity: '0..1',
            default: null
          });

          attribute = new attributes.Attribute({
            name: 'attribute',
            type: 'String',
            multiplicity: '0..1',
            default: null
          });
        }
      );

      it('expect to work with right arguments passing as arguments',
        function () {
          attribute = new attributes.Attribute(
            'attribute'
          );

          attribute = new attributes.Attribute(
            'attribute',
            'String'
          );

          attribute = new attributes.Attribute(
            'attribute',
            'String',
            '0..1'
          );

          attribute = new attributes.Attribute(
            'attribute',
            'String',
            '0..1',
            'defaultValue'
          );
        }
      );

      it('expect to not work with wrong arguments', function () {
        expect(function () {
          attribute = new attributes.Attribute();
        }).to.throw(AssertionError);

        expect(function () {
          attribute = new attributes.Attribute(
            'attribute',
            'String',
            '0..1',
            null,
            null
          );
        }).to.throw(AssertionError);

        expect(function () {
          attribute = new attributes.Attribute(function () {});
        }).to.throw(AssertionError);

        expect(function () {
          attribute = new attributes.Attribute({
            type: 'String',
            multiplicity: '0..1',
            default: null
          });
        }).to.throw(AssertionError);

        expect(function () {
          attribute = new attributes.Attribute({
            name: null,
            type: 'String',
            multiplicity: '0..1',
            default: null
          });
        }).to.throw(AssertionError);

        expect(function () {
          attribute = new attributes.Attribute({
            name: 'attribute',
            type: 'String',
            multiplicity: '0..1',
            default: null,
            doesNotExist: null
          });
        }).to.throw(AssertionError);

        expect(function () {
          attribute = new attributes.Attribute({
            name: 'attribute',
            type: null,
            multiplicity: '0..1',
            default: null
          });
        }).to.throw(AssertionError);

        expect(function () {
          attribute = new attributes.Attribute({
            name: 'attribute',
            type: 'String',
            multiplicity: null,
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
          .that.equals('String');

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
          .that.equals('String');

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
          attribute.type = 'will not change';
        }).to.throw(Error);

        expect(attribute).to.have.property('type')
          .that.equals('String');

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
        attribute = new attributes.Attribute('attributeName');

        expect(attribute.name).to.equal('attributeName');
        expect(attribute.type).to.equal('Object');
        expect(attribute.multiplicity).to.equal('1');
        expect(attribute.default).to.equal(null);
      });
    });
  });

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
          attribute1: new attributes.Attribute('attribute1'),
          attribute2: new attributes.Attribute('attribute2')
        });

        attributeCollection = new attributes.AttributeCollection({
          attribute1: {},
          attribute2: {}
        });

        attributeCollection = new attributes.AttributeCollection([
          new attributes.Attribute('attribute1'),
          new attributes.Attribute('attribute2')
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
          attributeCollection.attribute3 = new attributes.Attribute(
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

      it(
        'expect to work with right arguments and have specified behavior',
        function () {
          attributeCollection = new attributes.AttributeCollection([
            new attributes.Attribute('attribute1'),
            new attributes.Attribute('attribute2')
          ]);

          var concatenatedAttributeCollection =
            attributes
            .AttributeCollection
            .concat(
              attributeCollection,
              new attributes.Attribute('attribute3')
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
    });
  });
});
