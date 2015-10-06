'use strict';

var chai = require('chai');
var expect = chai.expect;
var AssertionError = chai.AssertionError;
var Entity = require('../../../../src/back/models/Entity');
var EntitySpecification = require(
  '../../../../src/back/models/EntitySpecification'
);
var attributes = require('../../../../src/back/models/attributes');
var methods = require('../../../../src/back/models/methods');

describe('Entity', function () {
  var entity;

  var C1;
  var C11;
  var C2;

  var c1;
  var c11;
  var c2;

  context('interface tests', function () {
    it('expect to instantiate new Entity without error', function () {
      entity = new Entity();
    });

    it('expect to not work with wrong arguments', function () {
      expect(function () {
        entity = new Entity(null);
      }).to.throw(AssertionError);
    });
  });

  describe('.specify()', function () {
    it('expect to exist as a static method', function () {
      expect(Entity).itself.to.respondTo('specify');
    });

    it('expect to work with right arguments', function () {
      Entity.specify();

      Entity.specify(null);

      Entity.specify({});

      Entity.specify({
        attributes: [],
        methods: {}
      });

      Entity.specify({
        attributes: new attributes.AttributeCollection(),
        methods: new methods.MethodCollection()
      });

      Entity.specify(new EntitySpecification());

      Entity.specify(null, null);

      Entity.specify({}, {});

      Entity.specify([], {});

      Entity.specify(
        new attributes.AttributeCollection(),
        new methods.MethodCollection()
      );

      Entity.specify(
        null,
        new methods.MethodCollection()
      );

      Entity.specify(
        new attributes.AttributeCollection(),
        null
      );
    });

    it('expect to run without error', function () {
      C1 = require('./C1');
      C11 = require('./C11');
      C2 = require('./C2');

      c1 = new C1();
      c11 = new C11();
      c2 = new C2();
    });

    it('expect to not work with wrong arguments', function () {
      expect(function () {
        Entity.specify({}, {}, {});
      }).to.throw(AssertionError);

      expect(function () {
        Entity.specify(function () {});
      }).to.throw(AssertionError);

      expect(function () {
        Entity.specify(function () {}, {});
      }).to.throw(AssertionError);

      expect(function () {
        Entity.specify({}, function () {});
      }).to.throw(AssertionError);
    });
  });

  describe('.General', function () {
    it(
      'expect to exist as a static property and contain the right class',
      function () {
        expect(Entity).to.have.property('General')
          .that.equals(null);
        expect(C1).to.have.property('General')
          .that.equals(Entity);
        expect(C11).to.have.property('General')
          .that.equals(C1);
        expect(C2).to.have.property('General')
          .that.equals(Entity);
      }
    );

    it('expect to not be changed or deleted', function () {
      expect(function () {
        delete Entity.General;
      }).to.throw(Error);

      expect(function () {
        Entity.General = Entity;
      }).to.throw(Error);

      expect(Entity).to.have.property('General')
        .that.equals(null);
    });
  });

  describe('.specification', function () {
    var entitySpecification = null;
    var MyEntity = null;

    it(
      'expect to exist as a static property and contain the right class',
      function () {
        entitySpecification = new EntitySpecification();
        MyEntity = Entity.specify(entitySpecification);

        expect(MyEntity.specification).to.equal(entitySpecification);
      }
    );

    it('expect to not be changed or deleted', function () {
      expect(function () {
        delete MyEntity.specification;
      }).to.throw(Error);

      expect(function () {
        MyEntity.specification = new EntitySpecification();
      }).to.throw(Error);

      expect(MyEntity.specification).to.equal(entitySpecification);
    });
  });

  describe('.attributes', function () {
    it(
      'expect to exist as a static property and contain the consolidated ' +
      'attributes',
      function () {
        var consolidatedAttributes = [];

        for (var consolidatedAttribute in C11.attributes) {
          expect(consolidatedAttributes).to.not.contain(consolidatedAttribute);
          consolidatedAttributes.push(consolidatedAttribute);
        }

        expect(consolidatedAttributes).to.deep.equal([
          'c11A1',
          'c1A1',
          'c1A2',
          'c1A3',
          'c1A4',
          'c1A5',
          'c1A6',
          'c1A7',
          'c1A8',
          'c1A9',
          'c1A10'
        ]);
      }
    );

    it('expect to not be changed or deleted', function () {
      expect(function () {
        delete C1.attributes;
      }).to.throw(Error);

      expect(function () {
        C1.attributes = new attributesAttributeCollection();
      }).to.throw(Error);

      expect(C1.attributes.c1A1.name).to.equal('c1A1');
    });
  });

  describe('.methods', function () {
    it(
      'expect to exist as a static property and contain the consolidated ' +
      'methods',
      function () {
        var consolidatedMethods = [];

        for (var consolidatedMethod in C11.methods) {
          expect(consolidatedMethods).to.not.contain(consolidatedMethod);
          consolidatedMethods.push(consolidatedMethod);
        }

        expect(consolidatedMethods).to.deep.equal([
          'c1M1',
          'c11M',
          'c1A6M',
          'c1M2'
        ]);
      }
    );

    it('expect to not be changed or deleted', function () {
      expect(function () {
        delete C1.methods;
      }).to.throw(Error);

      expect(function () {
        C1.methods = new methods.MethodCollection();
      }).to.throw(Error);

      expect(C1.methods.c1M1('a1', 'a2')).to.equal('a1a2');
    });
  });

  describe('.new', function () {
    it('expect to exist', function () {
      expect(Entity).itself.to.respondTo('new');
      expect(C1).itself.to.respondTo('new');
      expect(C11).itself.to.respondTo('new');
      expect(C2).itself.to.respondTo('new');
    });

    it(
      'expect to return a function that create new instances of the right' +
      'classes',
      function () {
        expect(Entity.new()()).to.be.an.instanceof(Entity);
        expect(Entity.new('C1')()).to.be.an.instanceof(C1);
        expect(Entity.new('C11')()).to.be.an.instanceof(C11);
        expect(Entity.new('C2')()).to.be.an.instanceof(C2);
        expect(C1.new()()).to.be.an.instanceof(C1);
        expect(C11.new()()).to.be.an.instanceof(C11);
        expect(C2.new()()).to.be.an.instanceof(C2);
      }
    );

    it('expect to not work with wrong arguments', function () {
      expect(function () {
        Entity.new('C1', null);
      }).to.throw(AssertionError);
    });
  });

  describe('#Entity', function () {
    it(
      'expect to exist as an inner property and contain the right class',
      function () {
        expect(entity).to.have.property('Entity')
          .that.equals(Entity);
        expect(c1).to.have.property('Entity')
          .that.equals(C1);
        expect(c11).to.have.property('Entity')
          .that.equals(C11);
        expect(c2).to.have.property('Entity')
          .that.equals(C2);
      }
    );

    it('expect to not be changed', function () {
      expect(function () {
        entity.Entity = null;
      }).to.throw(Error);

      expect(entity).to.have.property('Entity')
        .that.equals(Entity);
    });
  });

  describe('#General', function () {
    it(
      'expect to exist as an inner property and contain the right class',
      function () {
        expect(entity).to.have.property('General')
          .that.equals(null);
        expect(c1).to.have.property('General')
          .that.equals(Entity);
        expect(c11).to.have.property('General')
          .that.equals(C1);
        expect(c2).to.have.property('General')
          .that.equals(Entity);
      }
    );

    it('expect to not be changed', function () {
      expect(function () {
        entity.General = Entity;
      }).to.throw(Error);

      expect(entity).to.have.property('General')
        .that.equals(null);
    });
  });
});
