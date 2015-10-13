//
// Created by davimacedo on 08/10/15.
//

'use strict';

var chai = require('chai');
var expect = chai.expect;
var AssertionError = chai.AssertionError;
var classes = require('../../../../../src/back/utils').classes;
var models = require('../../../../../').models;
var Entity = models.Entity;
var attributes = models.attributes;
var Attribute = attributes.Attribute;
var AssociationAttribute = attributes.types.AssociationAttribute;
var BooleanAttribute = attributes.types.BooleanAttribute;
var DateAttribute = attributes.types.DateAttribute;
var NumberAttribute = attributes.types.NumberAttribute;
var ObjectAttribute = attributes.types.ObjectAttribute;
var StringAttribute = attributes.types.StringAttribute;

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
          name: 'attribute'
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
          multiplicity: '0..1'
        });

        attribute = new AttributeProxy({
          name: 'attribute',
          multiplicity: '0..1',
          default: null
        });

        attribute = new AttributeProxy({
          name: 'attribute',
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
          'attribute'
        );

        attribute = new AttributeProxy(
          'attribute',
          '0..1'
        );

        attribute = new AttributeProxy(
          'attribute',
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
          multiplicity: '0..1',
          default: null
        });
      }).to.throw(AssertionError);

      expect(function () {
        attribute = new AttributeProxy({
          name: null,
          multiplicity: '0..1',
          default: null
        });
      }).to.throw(AssertionError);

      expect(function () {
        attribute = new AttributeProxy({
          name: 'attribute',
          multiplicity: '0..1',
          default: null,
          doesNotExist: null
        });
      }).to.throw(AssertionError);

      expect(function () {
        attribute = new AttributeProxy({
          name: 'attribute',
          multiplicity: null,
          default: null
        });
      }).to.throw(AssertionError);

      expect(function () {
        attribute = new AttributeProxy({
          name: 'attribute',
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
        .that.equals(AttributeProxy);

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
        .that.equals(AttributeProxy);

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
        .that.equals(AttributeProxy);

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
      expect(attribute2.type).to.equal(AttributeProxy);
      expect(attribute2.multiplicity).to.equal('1');
      expect(attribute2.default).to.equal(null);
    });
  });

  describe('.resolve', function () {
    context('interface tests', function () {
      it('expect to exist as an inline function', function () {
        expect(Attribute).itself.to.respondTo('resolve');
      });

      it('expect to not work without arguments', function () {
        expect(function () {
          attribute = Attribute.resolve();
        }).to.throw(AssertionError);
      });

      it('expect to not work with null argument', function () {
        expect(function () {
          attribute = Attribute.resolve(null);
        }).to.throw(AssertionError);
      });

      it('expect to not work with empty object', function () {
        expect(function () {
          attribute = Attribute.resolve({});
        }).to.throw(AssertionError);
      });

      it('expect to work with right arguments passing as an object',
        function () {
          attribute = Attribute.resolve({
            name: 'attribute'
          });

          attribute = Attribute.resolve({
            name: 'attribute',
            type: 'String'
          });

          attribute = Attribute.resolve({
            name: 'attribute',
            default: null
          });

          attribute = Attribute.resolve({
            name: 'attribute',
            multiplicity: '0..1'
          });

          attribute = Attribute.resolve({
            name: 'attribute',
            type: 'String',
            multiplicity: '0..1'
          });

          attribute = Attribute.resolve({
            name: 'attribute',
            multiplicity: '0..1',
            default: null
          });

          attribute = Attribute.resolve({
            name: 'attribute',
            type: 'String',
            multiplicity: '0..1',
            default: null
          });
        }
      );

      it('expect to work with right arguments passing as arguments',
        function () {
          attribute = Attribute.resolve(
            'attribute'
          );

          attribute = Attribute.resolve(
            'attribute',
            'String'
          );

          attribute = Attribute.resolve(
            'attribute',
            'String',
            '0..1'
          );

          attribute = Attribute.resolve(
            'attribute',
            'String',
            '0..1',
            'defaultValue'
          );
        }
      );

      it('expect to not work with wrong arguments', function () {
        expect(function () {
          attribute = Attribute.resolve();
        }).to.throw(AssertionError);

        expect(function () {
          attribute = Attribute.resolve(
            'attribute',
            'String',
            '0..1',
            null,
            null
          );
        }).to.throw(AssertionError);

        expect(function () {
          attribute = Attribute.resolve(function () {});
        }).to.throw(AssertionError);

        expect(function () {
          attribute = Attribute.resolve({
            type: 'String',
            multiplicity: '0..1',
            default: null
          });
        }).to.throw(AssertionError);

        expect(function () {
          attribute = Attribute.resolve({
            name: null,
            type: 'String',
            multiplicity: '0..1',
            default: null
          });
        }).to.throw(AssertionError);

        expect(function () {
          attribute = Attribute.resolve({
            name: 'attribute',
            type: 'String',
            multiplicity: '0..1',
            default: null,
            doesNotExist: null
          });
        }).to.throw(AssertionError);

        expect(function () {
          attribute = Attribute.resolve({
            name: 'attribute',
            type: null,
            multiplicity: '0..1',
            default: null
          });
        }).to.throw(AssertionError);

        expect(function () {
          attribute = Attribute.resolve({
            name: 'attribute',
            type: function () {},
            multiplicity: '0..1',
            default: null
          });
        }).to.throw(AssertionError);

        expect(function () {
          attribute = Attribute.resolve({
            name: 'attribute',
            type: 'String',
            multiplicity: null,
            default: null
          });
        }).to.throw(AssertionError);

        expect(function () {
          attribute = Attribute.resolve({
            name: 'attribute',
            type: 'String',
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
        var attribute2 = Attribute.resolve('attributeName');

        expect(attribute2.name).to.equal('attributeName');
        expect(attribute2.type).to.equal(ObjectAttribute);
        expect(attribute2.multiplicity).to.equal('1');
        expect(attribute2.default).to.equal(null);
      });

      it('expect to resolve the right types', function () {
        expect(Attribute.resolve('myAttribute', 'Boolean').type)
          .to.equal(BooleanAttribute);

        var dateAttribute = Attribute.resolve('myAttribute', 'Date', '1..*');
        expect(dateAttribute)
          .to.have.property('type').that.equals(DateAttribute);
        expect(dateAttribute)
          .to.have.property('multiplicity').that.equals('1..*');

        var numberAttribute = Attribute.resolve(
          'myAttribute',
          'Number',
          '0..1',
          1
        );
        expect(numberAttribute.type).to.equal(NumberAttribute);
        expect(numberAttribute.multiplicity).to.equal('0..1');
        expect(numberAttribute.default).to.equal(1);

        expect(Attribute.resolve({
          name:'myAttribute',
          type:'Object'
        }).type)
          .to.equal(ObjectAttribute);

        expect(Attribute.resolve('myAttribute', 'String').type)
          .to.equal(StringAttribute);

        expect(Attribute.resolve({
          name:'myAttribute',
          type:'BooleanAttribute'
        }).type)
          .to.equal(BooleanAttribute);

        dateAttribute = Attribute.resolve({
          name: 'myAttribute',
          type: 'Date',
          multiplicity: '1..*'
        });
        expect(dateAttribute)
          .to.have.property('type').that.equals(DateAttribute);
        expect(dateAttribute)
          .to.have.property('multiplicity').that.equals('1..*');

        numberAttribute = Attribute.resolve({
          name: 'myAttribute',
          type: 'Number',
          multiplicity: '0..1',
          default: 1
        });
        expect(numberAttribute.type).to.equal(NumberAttribute);
        expect(numberAttribute.multiplicity).to.equal('0..1');
        expect(numberAttribute.default).to.equal(1);

        expect(Attribute.resolve('myAttribute', 'ObjectAttribute').type)
          .to.equal(ObjectAttribute);

        expect(Attribute.resolve('myAttribute', 'StringAttribute').type)
          .to.equal(StringAttribute);

        var MyEntity19 = Entity.specify('MyEntity19');

        var myAttribute = Attribute.resolve('myAttribute', 'MyEntity19');
        expect(myAttribute.type).to.equal(AssociationAttribute);
        expect(myAttribute.Entity).to.equal(MyEntity19);

        myAttribute = Attribute.resolve({
          name: 'myAttribute',
          type: 'MyEntity19'
        });
        expect(myAttribute.type).to.equal(AssociationAttribute);
        expect(myAttribute.Entity).to.equal(MyEntity19);
      });
    });
  });
});
