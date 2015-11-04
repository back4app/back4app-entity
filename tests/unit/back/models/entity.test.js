'use strict';

var chai = require('chai');
var expect = chai.expect;
var AssertionError = chai.AssertionError;
var Promise = require('bluebird');
var uuid = require('node-uuid');
var settings = require('../../../../src/back').settings;
var classes = require('../../../../src/back/utils').classes;
var models = require('../../../../src/back/models');
var EntityNotFoundError = models.errors.EntityNotFoundError;
var ValidationError = models.errors.ValidationError;
var Entity = models.Entity;
var EntitySpecification = models.EntitySpecification;
var attributes = models.attributes;
var methods = models.methods;
var MockAdapter = require('../adapters/MockAdapter');
var mockery = require('mockery');
var sinon = require('sinon');
var EntityProxy = require('./EntityProxy');

require('../../settings');

describe('Entity', function () {
  function WrongEntityProxy() {
    Entity.apply(this, Array.prototype.slice.call(arguments));
  }

  var entity;

  var C1;
  var C11;
  var C2;
  var C3;

  var c1;
  var c11;
  var c2;

  context('interface tests', function () {
    it('expect to instantiate new Entity without error', function () {
      entity = new EntityProxy();

      entity = new EntityProxy(null, null);

      entity = new EntityProxy({}, {});
    });

    it('expect to be not directly initialized', function () {
      expect(function () {
        entity = new Entity();
      }).to.throw(AssertionError);

      expect(function () {
        entity = new WrongEntityProxy();
      }).to.throw(AssertionError);
    });

    it('expect to not work with wrong arguments', function () {
      expect(function () {
        entity = new EntityProxy(null, null, null);
      }).to.throw(AssertionError);

      expect(function () {
        entity = new EntityProxy(
          null,
          {
            isNew: null
          }
        );
      }).to.throw(AssertionError);
    });
  });

  describe('.specify()', function () {
    it('expect to exist as a static method', function () {
      expect(Entity).itself.to.respondTo('specify');
    });

    it('expect to work with right arguments', function () {
      Entity.specify('MyEntity1');

      Entity.specify({name: 'MyEntity2'});

      Entity.specify({
        name: 'MyEntity3',
        attributes: [],
        methods: {},
        isAbstract: null,
        dataName: null
      });

      Entity.specify({
        name: 'MyEntity4',
        attributes: new attributes.AttributeDictionary(),
        methods: new methods.MethodDictionary(),
        isAbstract: false,
        dataName: {}
      });

      Entity.specify(new EntitySpecification('MyEntity5'));

      Entity.specify('MyEntity6', null, null, null);

      Entity.specify('MyEntity7', {}, {}, {});

      Entity.specify('MyEntity8', [], {}, {});

      Entity.specify(
        'MyEntity9',
        new attributes.AttributeDictionary(),
        new methods.MethodDictionary(),
        {
          isAbstract: null,
          dataName: null
        }
      );

      Entity.specify(
        'MyEntity10',
        null,
        new methods.MethodDictionary()
      );

      Entity.specify(
        'MyEntity11',
        new attributes.AttributeDictionary(),
        null
      );
    });

    it('expect to run without error', function () {
      C1 = require('./C1');
      C11 = require('./C11');
      C2 = require('./C2');
      C3 = require('./C3');

      c1 = new C1();
      c11 = new C11();
      c2 = new C2();
    });

    it('expect to not work with wrong arguments', function () {
      expect(function () {
        Entity.specify();
      }).to.throw(AssertionError);

      expect(function () {
        Entity.specify(null);
      }).to.throw(AssertionError);

      expect(function () {
        Entity.specify({});
      }).to.throw(AssertionError);

      expect(function () {
        Entity.specify('MyEntity12', {}, {}, null, {});
      }).to.throw(AssertionError);

      expect(function () {
        Entity.specify(function () {});
      }).to.throw(AssertionError);

      expect(function () {
        Entity.specify(function () {}, {}, {});
      }).to.throw(AssertionError);

      expect(function () {
        Entity.specify('MyEntity13', function () {}, {}, {});
      }).to.throw(AssertionError);

      expect(function () {
        Entity.specify('MyEntity14', {}, function () {}, {});
      }).to.throw(AssertionError);

      expect(function () {
        Entity.specify('MyEntity14', {}, {}, function () {});
      }).to.throw(AssertionError);
    });
  });

  describe('.adapterName', function () {
    it(
      'expect to exist as a static property and contain the right adapter name',
      function () {
        expect(Entity).to.have.property('adapterName')
          .that.equals('default');
        expect(C1).to.have.property('adapterName')
          .that.equals('default');
        expect(C11).to.have.property('adapterName')
          .that.equals('default');
        expect(C2).to.have.property('adapterName')
          .that.equals('default');
      }
    );

    it('expect to not be changed or deleted', function () {
      expect(function () {
        delete Entity.adapterName;
      }).to.throw(Error);

      expect(function () {
        Entity.adapterName = 'willnotwork';
      }).to.throw(Error);

      expect(Entity).to.have.property('adapterName')
        .that.equals('default');
    });
  });

  describe('.adapter', function () {
    it(
      'expect to exist as a static property and contain the right adapter',
      function () {
        expect(Entity).to.have.property('adapter')
          .that.equals(settings.ADAPTERS.default);
        expect(Entity).to.have.property('adapter')
          .that.equals(settings.ADAPTERS[Entity.adapterName]);
        expect(C1).to.have.property('adapter')
          .that.equals(settings.ADAPTERS[C1.adapterName]);
        expect(C11).to.have.property('adapter')
          .that.equals(settings.ADAPTERS[C11.adapterName]);
        expect(C2).to.have.property('adapter')
          .that.equals(settings.ADAPTERS[C2.adapterName]);
      }
    );

    it('expect to not be changed or deleted', function () {
      expect(function () {
        delete Entity.adapter;
      }).to.throw(Error);

      expect(function () {
        Entity.adapter = new MockAdapter();
      }).to.throw(Error);

      expect(Entity).to.have.property('adapter')
        .that.equals(settings.ADAPTERS[Entity.adapterName]);
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
        entitySpecification = new EntitySpecification('MyEntity15');
        MyEntity = Entity.specify(entitySpecification);

        expect(MyEntity.specification).to.equal(entitySpecification);
      }
    );

    it(
      'expect specification of Entity base class to have the correct settings',
      function () {
        expect(Entity.specification.name).to.equal('Entity');
        expect(Entity.specification.attributes).to.have.property('id');
        expect(Entity.specification.isAbstract).to.equal(true);
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

  describe('.dataName', function () {
    it(
      'expect to exist as a static property and contain the right name',
      function () {
        expect(Entity).to.have.property('dataName')
          .that.equals('Entity');
        expect(Entity).to.have.property('dataName')
          .that.equals(Entity.specification.getDataName(Entity.adapterName));
        expect(C1).to.have.property('dataName')
          .that.equals(C1.specification.getDataName(C1.adapterName));
        expect(C11).to.have.property('dataName')
          .that.equals(C11.specification.getDataName(C11.adapterName));
        expect(C2).to.have.property('dataName')
          .that.equals(C2.specification.getDataName(C2.adapterName));

        expect(Entity.specify({
          name: 'MyNewC111',
          dataName: 'MyC111DataName'
        }).dataName).to.equal('MyC111DataName');

        expect(Entity.specify({
          name: 'MyNewC112',
          dataName: {
            default: 'MyC111DataName'
          }
        }).dataName).to.equal('MyC111DataName');
      }
    );
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
          'c1A10',
          'id'
        ]);
      }
    );

    it('expect to not be changed or deleted', function () {
      expect(function () {
        delete C1.attributes;
      }).to.throw(Error);

      expect(function () {
        C1.attributes = new attributes.AttributeDictionary();
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
        C1.methods = new methods.MethodDictionary();
      }).to.throw(Error);

      expect(C1.methods.c1M1('a1', 'a2')).to.equal('a1a2');
    });
  });

  describe('.directSpecializations', function () {
    it('expect to exist and returns the right values', function () {
      expect(Entity).to.have.ownProperty('directSpecializations');
      expect(Entity.directSpecializations).to.have.ownProperty('C1');
      expect(Entity.directSpecializations.C1).to.equal(C1);
      expect(Entity.directSpecializations.C2).to.equal(C2);

      expect(C1).to.have.ownProperty('directSpecializations');
      expect(C1.directSpecializations).to.have.ownProperty('C11');
      expect(C1.directSpecializations.C11).to.equal(C11);

      expect(C11).to.have.ownProperty('directSpecializations');
      expect(C11.directSpecializations).to.deep.equal({});

      expect(C2).to.have.ownProperty('directSpecializations');
      expect(C2.directSpecializations).to.deep.equal({});
    });

    it('expect to not be changeable', function () {
      expect(function () {
        C1.directSpecializations = [];
      }).to.throw(Error);

      expect(function () {
        delete C1.directSpecializations;
      }).to.throw(Error);

      expect(function () {
        C1.directSpecializations.a = C1;
      }).to.throw(Error);

      expect(function () {
        C1.directSpecializations.push(C1);
      }).to.throw(Error);

      expect(function () {
        C1.directSpecializations[0] = C1;
      }).to.throw(Error);

      expect(function () {
        delete C1.directSpecializations.C11;
      }).to.throw(Error);
    });
  });

  describe('.specializations', function () {
    it('expect to exist and returns the right values', function () {
      var C111 = C11.specify('C111');

      expect(Entity).to.have.ownProperty('specializations');
      expect(Entity.specializations).to.not.have.ownProperty('Entity');
      expect(Entity.specializations).to.have.ownProperty('C1');
      expect(Entity.specializations.C1).to.equal(C1);
      expect(Entity.specializations).to.have.ownProperty('C11');
      expect(Entity.specializations.C11).to.equal(C11);
      expect(Entity.specializations).to.have.ownProperty('C111');
      expect(Entity.specializations.C111).to.equal(C111);
      expect(Entity.specializations).to.have.ownProperty('C2');
      expect(Entity.specializations.C2).to.equal(C2);

      expect(C1).to.have.ownProperty('specializations');
      expect(C1.specializations).to.not.have.ownProperty('C1');
      expect(C1.specializations).to.have.ownProperty('C11');
      expect(C1.specializations.C11).to.equal(C11);
      expect(C1.specializations).to.have.ownProperty('C111');
      expect(C1.specializations.C111).to.equal(C111);

      expect(C11).to.have.ownProperty('specializations');
      expect(C11.specializations).to.not.have.ownProperty('C11');
      expect(C11.specializations).to.have.ownProperty('C111');
      expect(C11.specializations.C111).to.equal(C111);

      expect(C111).to.have.ownProperty('specializations');
      expect(C111.specializations).to.not.have.ownProperty('C111');
      expect(C111.specializations).to.deep.equal({});

      expect(C2).to.have.ownProperty('specializations');
      expect(C2.specializations).to.not.have.ownProperty('C2');
      expect(C2.specializations).to.deep.equal({});
    });

    it('expect to not be changeable', function () {
      expect(function () {
        C1.specializations = [];
      }).to.throw(Error);

      expect(function () {
        delete C1.specializations;
      }).to.throw(Error);

      expect(function () {
        C1.specializations.a = C1;
      }).to.throw(Error);

      expect(function () {
        C1.specializations.push(C1);
      }).to.throw(Error);

      expect(function () {
        C1.specializations[0] = C1;
      }).to.throw(Error);

      expect(function () {
        delete C1.specializations.C11;
      }).to.throw(Error);
    });
  });

  describe('.getSpecialization', function () {
    it('expect to exist', function () {
      expect(Entity).itself.to.respondTo('getSpecialization');
      expect(C1).itself.to.respondTo('getSpecialization');
      expect(C11).itself.to.respondTo('getSpecialization');
      expect(C2).itself.to.respondTo('getSpecialization');
    });

    it('expect to return the right classes', function () {
      expect(function () {
        Entity.getSpecialization('Entity');
      }).to.throw(EntityNotFoundError);
      expect(Entity.getSpecialization('C1')).to.equal(C1);
      expect(Entity.getSpecialization('C11')).to.equal(C11);
      expect(Entity.getSpecialization('C2')).to.equal(C2);

      expect(function () {
        C1.getSpecialization('Entity');
      }).to.throw(EntityNotFoundError);
      expect(function () {
        C1.getSpecialization('C1');
      }).to.throw(EntityNotFoundError);
      expect(C1.getSpecialization('C11')).to.equal(C11);
      expect(function () {
        C1.getSpecialization('C2');
      }).to.throw(EntityNotFoundError);

      expect(function () {
        C11.getSpecialization('Entity');
      }).to.throw(EntityNotFoundError);
      expect(function () {
        C11.getSpecialization('C1');
      }).to.throw(EntityNotFoundError);
      expect(function () {
        C11.getSpecialization('C11');
      }).to.throw(EntityNotFoundError);
      expect(function () {
        C11.getSpecialization('C2');
      }).to.throw(EntityNotFoundError);

      expect(function () {
        C2.getSpecialization('Entity');
      }).to.throw(EntityNotFoundError);
      expect(function () {
        C2.getSpecialization('C1');
      }).to.throw(EntityNotFoundError);
      expect(function () {
        C2.getSpecialization('C11');
      }).to.throw(EntityNotFoundError);
      expect(function () {
        C2.getSpecialization('C2');
      }).to.throw(EntityNotFoundError);
    });

    it('expect to not work with wrong arguments', function () {
      expect(function () {
        Entity.getSpecialization();
      }).to.throw(AssertionError);
    });

    it('expect to not work with wrong arguments', function () {
      expect(function () {
        Entity.getSpecialization(null);
      }).to.throw(AssertionError);
    });

    it('expect to not work with wrong arguments', function () {
      expect(function () {
        Entity.getSpecialization('C1', 'C1');
      }).to.throw(AssertionError);
    });

    it('expect to not work with wrong arguments', function () {
      expect(function () {
        Entity.getSpecialization('C1', null);
      }).to.throw(AssertionError);
    });

    it('expect to not work with wrong arguments', function () {
      expect(function () {
        Entity.getSpecialization({});
      }).to.throw(AssertionError);
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
        expect(Entity.new('C1')()).to.be.an.instanceof(C1);
        expect(Entity.new('C11')()).to.be.an.instanceof(C11);
        expect(Entity.new('C2')()).to.be.an.instanceof(C2);
        expect(C1.new()()).to.be.an.instanceof(C1);
        expect(C11.new()()).to.be.an.instanceof(C11);
        expect(C2.new()()).to.be.an.instanceof(C2);
        expect(C2.new()({})).to.be.an.instanceof(C2);
        expect(C2.new()({
          id: uuid.v4()
        })).to.be.an.instanceof(C2);
      }
    );

    it('expect to not work with wrong arguments', function () {
      expect(function () {
        Entity.new('C1', null);
      }).to.throw(AssertionError);

      expect(function () {
        Entity.new(null)();
      }).to.throw(AssertionError);

      expect(function () {
        Entity.new()();
      }).to.throw(AssertionError);

      expect(function () {
        C1.new()(function () {});
      }).to.throw(AssertionError);
    });
  });

  describe('#adapterName', function () {
    it(
      'expect to exist as an inner property and contain the right name',
      function () {
        expect(entity).to.have.property('adapterName')
          .that.equals('default');
        expect(entity).to.have.property('adapterName')
          .that.equals(entity.Entity.adapterName);
        expect(c1).to.have.property('adapterName')
          .that.equals(c1.Entity.adapterName);
        expect(c11).to.have.property('adapterName')
          .that.equals(c11.Entity.adapterName);
        expect(c2).to.have.property('adapterName')
          .that.equals(c2.Entity.adapterName);
      }
    );

    it('expect to not be deleted', function () {
      expect(function () {
        delete entity.adapterName;
      }).to.throw(Error);

      expect(entity).to.have.property('adapterName')
        .that.equals('default');
    });

    it('expect to not be changed', function () {
      expect(function () {
        entity.adapterName = null;
      }).to.throw(Error);

      expect(entity).to.have.property('adapterName')
        .that.equals('default');
    });
  });

  describe('#adapter', function () {
    it(
      'expect to exist as an inner property and contain the right class',
      function () {
        expect(entity).to.have.property('adapter')
          .that.equals(settings.ADAPTERS.default);
        expect(entity).to.have.property('adapter')
          .that.equals(entity.Entity.adapter);
        expect(c1).to.have.property('adapter')
          .that.equals(c1.Entity.adapter);
        expect(c11).to.have.property('adapter')
          .that.equals(c11.Entity.adapter);
        expect(c2).to.have.property('adapter')
          .that.equals(c2.Entity.adapter);
      }
    );

    it('expect to not be deleted', function () {
      expect(function () {
        delete entity.adapter;
      }).to.throw(Error);

      expect(entity).to.have.property('adapter')
        .that.equals(settings.ADAPTERS.default);
    });

    it('expect to not be changed', function () {
      expect(function () {
        entity.adapter = null;
      }).to.throw(Error);

      expect(entity).to.have.property('adapter')
        .that.equals(settings.ADAPTERS.default);
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

    it('expect to not be deleted', function () {
      expect(function () {
        delete entity.Entity;
      }).to.throw(Error);

      expect(entity).to.have.property('Entity')
        .that.equals(Entity);
    });

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

    it('expect to not be deleted', function () {
      expect(function () {
        delete entity.General;
      }).to.throw(Error);

      expect(entity).to.have.property('General')
        .that.equals(null);
    });

    it('expect to not be changed', function () {
      expect(function () {
        entity.General = Entity;
      }).to.throw(Error);

      expect(entity).to.have.property('General')
        .that.equals(null);
    });
  });

  describe('#isNew', function () {
    it(
      'expect to exist as an inner property and contain the right information',
      function () {
        expect(new C1()).to.have.property('isNew')
          .that.equals(true);

        expect(new C1({
          id: uuid.v4()
        })).to.have.property('isNew')
          .that.equals(false);

        expect(new C1(
          {},
          {isNew: true}
        )).to.have.property('isNew')
          .that.equals(true);

        expect(new C1(
          {},
          {
            isNew: false
          }
        )).to.have.property('isNew')
          .that.equals(false);

        expect(new C1(
          {
            id: uuid.v4()
          },
          {
            isNew: true
          }
        )).to.have.property('isNew')
          .that.equals(true);

        expect(new C1(
          {
            id: uuid.v4()
          },
          {
            isNew: false
          }
        )).to.have.property('isNew')
          .that.equals(false);
      }
    );

    it('expect to not be deleted', function () {
      expect(function () {
        delete entity.isNew;
      }).to.throw(Error);

      expect(entity).to.have.property('isNew')
        .that.equals(true);
    });

    it('expect can be changed', function () {
      entity.isNew = false;

      expect(entity).to.have.property('isNew')
        .that.equals(false);
    });
  });

  describe('#id', function () {
    it('expect not be undefined', function () {
      expect(c1.id).to.not.equal(undefined);
      expect(c11.id).to.not.equal(undefined);
      expect(c2.id).to.not.equal(undefined);
    });

    it('expect to be valid', function () {
      var c1Id = c1.id;
      var c11Id = c11.id;
      var c2Id = c2.id;

      function isValid(id) {
        var regex = '^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-' +
          '[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$';
        return new RegExp(regex).test(id);
      }

      expect(isValid(c1Id)).to.equal(true);
      expect(isValid(c11Id)).to.equal(true);
      expect(isValid(c2Id)).to.equal(true);
    });

    it('expect to generate different ids', function () {
      expect(c1.id).to.not.equal(c11.id);
      expect(c1.id).to.not.equal(c2.id);
      expect(c2.id).to.not.equal(c11.id);
    });

    it('expect to be given in the constructor', function () {
      expect(new EntityProxy({
        id: '00000000-0000-4000-a000-000000000000'
      }))
        .to.have.property('id')
        .that.equals('00000000-0000-4000-a000-000000000000');
    });

    it('expect to validate if given id is valid', function () {
      expect(function () {
        entity = new EntityProxy({id: 'itisnotvalid'});
      }).to.throw(Error);
    });

    it('expect to not be deleted', function () {
      expect(function () {
        delete c1.id;
      }).to.throw(Error);

      expect(c1).to.have.property('id');
    });

    it('expect to be not writable', function () {
      expect(function () {
        c1.id = '00000000-0000-4000-a000-000000000000';
      }).to.throw(Error);
    });
  });

  describe('functional tests', function () {
    it('expect correct inheritances', function () {
      expect(classes.isGeneral(Entity, Entity)).to.equal(true);
      expect(classes.isGeneral(Entity, C1)).to.equal(true);
      expect(classes.isGeneral(Entity, C11)).to.equal(true);
      expect(classes.isGeneral(Entity, C2)).to.equal(true);

      expect(classes.isGeneral(C1, C1)).to.equal(true);
      expect(classes.isGeneral(C1, C11)).to.equal(true);

      expect(classes.isGeneral(C11, C11)).to.equal(true);

      expect(classes.isGeneral(C2, C2)).to.equal(true);

      expect(c1).be.instanceof(Entity);
      expect(c1).be.instanceof(C1);

      expect(c11).be.instanceof(Entity);
      expect(c11).be.instanceof(C1);
      expect(c11).be.instanceof(C11);

      expect(c2).be.instanceof(Entity);
      expect(c2).be.instanceof(C2);
    });

    it('expect to store data correctly', function () {
      //enable mockery
      mockery.enable({
        useCleanCache: true,
        warnOnUnregistered: false
      });

      //mocking v4() node-uuid function
      var uuidMock = {
        v4: function () {
          return '00000000-0000-4000-a000-000000000000';
        }
      };

      //register mock on node-uuid and require node-uuid
      mockery.registerMock('node-uuid', uuidMock);

      //new require to use the mock
      C1 = require('./C1');
      C11 = require('./C11');
      C2 = require('./C2');

      c1 = new C1();
      c11 = new C11();
      c2 = new C2();

      expect(c1).to.have.property('c1A1').that.equals(false);
      expect(c1).to.have.property('c1A2');
      expect(c1).to.have.property('c1A3').that.deep.equals([0]);
      expect(c1).to.have.property('c1A4').that.equals(null);
      expect(c1).to.have.property('c1A5').that.equals(0.0);
      expect(c1).to.have.property('c1A6').that.equals('');
      expect(c1).to.have.property('c1A7').that.equals(null);
      expect(c1).to.have.property('c1A8').that.equals(null);
      expect(c1).to.have.property('c1A9').that.deep.equals([new C2()]);
      expect(c1).to.have.property('c1A10').that.deep.equals(new C2());

      expect(c11).to.have.property('c1A1').that.equals(false);
      expect(c11).to.have.property('c1A2');
      expect(c11).to.have.property('c1A3').that.deep.equals([0]);
      expect(c11).to.have.property('c1A4').that.equals(null);
      expect(c11).to.have.property('c1A5').that.equals(0.0);
      expect(c11).to.have.property('c1A6').that.equals('');
      expect(c11).to.have.property('c1A7').that.equals(null);
      expect(c11).to.have.property('c1A8').that.equals(null);
      expect(c11).to.have.property('c1A9').that.deep.equals([new C2()]);
      expect(c11).to.have.property('c1A10').that.deep.equals(new C2());
      expect(c11).to.have.property('c11A1').that.equals(null);

      expect(c2).to.have.property('_Entity').that.deep.equals({});
      expect(c2).to.have.property('c2A2').that.deep.equals({
        default: 'thisIsMyDefault'
      });

      var newC11 = new C11({
        c1A2: new Date(1982, 11, 23),
        c1A4: [{a: 'a'}, {b: 'b'}],
        c1A6: 'c1A6',
        c1A8: new C11(),
        c11A1: {z: 'z'}
      });

      expect(newC11).to.have.property('c1A1').that.equals(false);
      expect(newC11).to.have.property('c1A2').that.deep.equals(
        new Date(1982, 11, 23)
      );
      expect(newC11).to.have.property('c1A3').that.deep.equals([0]);
      expect(newC11).to.have.property('c1A4').that.deep.equals(
        [{a: 'a'}, {b: 'b'}]
      );
      expect(newC11).to.have.property('c1A5').that.equals(0.0);
      expect(newC11).to.have.property('c1A6').that.equals('c1A6');
      expect(newC11).to.have.property('c1A7').that.equals(null);
      expect(newC11).to.have.property('c1A8');
      expect(newC11).to.have.property('c1A9').that.deep.equals([new C2()]);
      expect(newC11).to.have.property('c1A10').that.deep.equals(new C2());
      expect(newC11).to.have.property('c11A1').that.deep.equals({z: 'z'});

      //disable mock on node-uuid
      mockery.deregisterMock('node-uuid');

      //disable mockery
      mockery.disable();

      //restoring old require without mock
      C1 = require('./C1');
      C11 = require('./C11');
      C2 = require('./C2');

      c1 = new C1();
      c11 = new C11();
      c2 = new C2();

    });

    it('expect methods to run correctly', function () {
      expect(c1.c1A6M('teste')).to.equal('teste');
      expect(c1.c1A6M()).to.equal('teste');
      expect(c1.c1M1(1, 2)).to.equal(3);
      expect(c1.c1M1('a', 'b')).to.equal('ab');
      expect(c1.c1M2(1, 2)).to.equal(3);
      expect(c1.c1M2('a', 'b')).to.equal('ab');

      expect(c11.c1A6M('teste')).to.equal('teste');
      expect(c11.c1A6M()).to.equal('teste');
      expect(c11.c1M1(1, 2, 3)).to.equal(6);
      expect(c11.c1M1('a', 'b', 'c')).to.equal('abc');
      expect(c11.c1M2(1, 2)).to.equal(3);
      expect(c11.c1M2('a', 'b')).to.equal('ab');
      expect(c11.c11M()).to.equal(
        'c1A1c1A2c1A3c1A4c1A5c1A6c1A7c1A8c1A9c1A10idc11A1c1A1c1A2c1A3c1A4c1A5' +
        'c1A6c1A7c1A8c1A9c1A10id'
      );
      expect(c2.constructor()).to.equal('constructor');
    });

    it('expect to not instantiate abstract Entities', function () {
      var MyAbstractEntity = Entity.specify({
        name: 'MyAbstractEntity',
        isAbstract: true
      });

      function MyAbstractEntityProxy() {
        MyAbstractEntity.apply(this, Array.prototype.slice.call(arguments));
      }

      classes.generalize(MyAbstractEntity, MyAbstractEntityProxy);

      function MyAbstractEntityWrongProxy() {
        MyAbstractEntity.apply(this, Array.prototype.slice.call(arguments));
      }

      var MyConcreteEntity = MyAbstractEntity.specify({
        name: 'MyConcreteEntity',
        isAbstract: false
      });

      expect(function () {
        entity = new MyAbstractEntity();
      }).to.throw(AssertionError);

      expect(function () {
        entity = new MyAbstractEntityWrongProxy();
      }).to.throw(AssertionError);

      entity = new MyAbstractEntityProxy();

      entity = new MyConcreteEntity();

      var MyAbstractEntity2 = null;

      expect(function () {
        MyAbstractEntity2 = MyConcreteEntity.specify({
          name: 'MyAbstractEntity2',
          isAbstract: true
        });
      }).to.throw(AssertionError);

      MyAbstractEntity2 = MyAbstractEntity.specify({
        name: 'MyAbstractEntity2',
        isAbstract: true
      });

      var MyConcreteEntity2 = null;

      MyConcreteEntity2 = MyConcreteEntity.specify({
        name: 'MyConcreteEntity2',
        isAbstract: false
      });
    });
  });

  describe('#validate', function () {
    it('expect to run without error', function () {
      var MyEntity40 = Entity.specify(
        'MyEntity40',
        {
          a1: {
            multiplicity: '1'
          },
          a2: {
            multiplicity: '1'
          }
        }
      );

      var myEntity40 = new MyEntity40();

      expect(function () {
        myEntity40.validate();
      }).to.throw(ValidationError);

      expect(function () {
        myEntity40.validate('a1');
      }).to.throw(ValidationError);

      expect(function () {
        myEntity40.validate('a2');
      }).to.throw(ValidationError);

      myEntity40.a1 = {};

      myEntity40.validate('a1');

      expect(function () {
        myEntity40.validate('a2');
      }).to.throw(ValidationError);

      myEntity40.a1 = '';
      myEntity40.a2 = {};

      expect(function () {
        myEntity40.validate('a1');
      }).to.throw(ValidationError);

      myEntity40.validate('a2');

      myEntity40.a1 = {};

      myEntity40.validate();
    });
  });

  describe('#isValid', function () {
    it('expect to run without error', function () {
      var MyEntity50 = Entity.specify(
        'MyEntity50',
        {
          a1: {
            multiplicity: '1'
          },
          a2: {
            multiplicity: '1'
          }
        }
      );

      var myEntity50 = new MyEntity50();

      expect(myEntity50.isValid()).to.equal(false);

      expect(myEntity50.isValid('a1')).to.equal(false);

      expect(myEntity50.isValid('a2')).to.equal(false);

      myEntity50.a1 = {};

      expect(myEntity50.isValid('a1')).to.equal(true);

      expect(myEntity50.isValid('a2')).to.equal(false);

      myEntity50.a1 = '';
      myEntity50.a2 = {};

      expect(myEntity50.isValid('a1')).to.equal(false);

      expect(myEntity50.isValid('a2')).to.equal(true);

      myEntity50.a1 = {};

      expect(myEntity50.isValid()).to.equal(true);
    });
  });

  describe('#get()', function () {
    var MyEntity60 = Entity.specify({
      name: 'MyEntity60'
    });

    it('should call `getObject` method on adapter', function () {
      // mock adapter
      var mock = sinon.mock(settings.ADAPTERS.default);

      var instance = new MyEntity60();
      var promise = Promise.resolve(instance);
      mock.expects('getObject').once().withExactArgs(MyEntity60, {id: '0000'})
        .returns(promise);

      // call method
      MyEntity60.get({id: '0000'});

      // check for mocked calls
      mock.verify();
      mock.restore();
    });
  });

  describe('#find()', function () {
    var MyEntity70 = Entity.specify({
      name: 'MyEntity70'
    });

    it('should call `findObjects` method on adapter', function () {
      // mock adapter
      var mock = sinon.mock(settings.ADAPTERS.default);

      var instance = new MyEntity70();
      var promise = Promise.resolve([instance]);
      mock.expects('findObjects').once().withExactArgs(MyEntity70, {age: 20})
        .returns(promise);

      // call method
      MyEntity70.find({age: 20});

      // check for mocked calls
      mock.verify();
      mock.restore();
    });
  });

  describe('.create', function () {
    it('expect to not work with wrong arguments', function (done) {
      expect(function () {
        C2.create(null, null);
      }).to.throw(AssertionError);

      C2
        .create(function () {})
        .catch(function (error) {
          expect(error).to.be.an.instanceOf(AssertionError);
          done();
        });
    });

    it('expect to work with right arguments', function (done) {
      var promises = [];

      promises.push(
        C3.create()
      );

      promises.push(
        C3.create(null)
      );

      promises.push(
        C3.create({})
      );

      promises.push(
        C3.create({
          c3A1: {
            myObjectAttributeName: 'myObjectAttributeValue'
          }
        }).then(function (c3) {
          expect(c3.isNew).to.equal(false);
        })
      );

      var myC31 = new C3();
      var myC32 = new C3({
        c3A2: myC31
      });

      promises.push(
        C3.create({
          c3A2: myC32
        }).then(function (c3) {
          expect(c3.isNew).to.equal(false);
          expect(myC31.isNew).to.equal(false);
          expect(myC32.isNew).to.equal(false);
        })
      );

      Promise
        .all(promises)
        .then(function () {
          done();
        })
        .catch(console.log);
    });

    it('expect to not work if not valid', function (done) {
      C2
        .create({ _Entity: function () {} })
        .catch(function (error) {
          expect(error).to.be.an.instanceOf(ValidationError);
          done();
        });
    });

    it('expect to not work if associations not valid', function (done) {
      var promises = [];

      var myC33 = new C3();
      var myC34 = new C3({
        c3A2: myC33
      });
      myC33.c3A1 = null;

      promises.push(
        C3.create({
          c3A2: myC34
        }).catch(function (error) {
          expect(error).to.be.instanceOf(ValidationError);
          expect(myC33.isNew).to.equal(true);
          expect(myC34.isNew).to.equal(true);
        })
      );

      Promise
        .all(promises)
        .then(function () {
          done();
        })
        .catch(console.log);
    });

    it(
      'expect to not work if adapter does not return an object',
      function (done) {
        var insertObjectFunction = settings.ADAPTERS.default.insertObject;
        settings.ADAPTERS.default.insertObject = function () {
          return null;
        };

        C3
          .create()
          .catch(function (error) {
            expect(error).to.be.an.instanceOf(AssertionError);
            settings.ADAPTERS.default.insertObject = insertObjectFunction;
            done();
          });
      }
    );

    it(
      'expect to not work if adapter does not return an object',
      function (done) {
        var insertObjectFunction = settings.ADAPTERS.default.insertObject;
        settings.ADAPTERS.default.insertObject = function () {
          return function () {};
        };

        C3
          .create()
          .catch(function (error) {
            expect(error).to.be.an.instanceOf(AssertionError);
            settings.ADAPTERS.default.insertObject = insertObjectFunction;
            done();
          });
      }
    );

    it(
      'expect to not work if adapter does not return a Promise',
      function (done) {
        var insertObjectFunction = settings.ADAPTERS.default.insertObject;
        settings.ADAPTERS.default.insertObject = function () {
          return {};
        };

        C3
          .create()
          .catch(function (error) {
            expect(error).to.be.an.instanceOf(AssertionError);
            settings.ADAPTERS.default.insertObject = insertObjectFunction;
            done();
          });
      }
    );

    it(
      'expect to not work if adapter throws an Error',
      function (done) {
        var myNewError = new Error('MyNewError');

        var insertObjectFunction = settings.ADAPTERS.default.insertObject;
        settings.ADAPTERS.default.insertObject = function () {
          throw myNewError;
        };

        C3
          .create()
          .catch(function (error) {
            expect(error).equal(myNewError);
            settings.ADAPTERS.default.insertObject = insertObjectFunction;
            done();
          });
      }
    );
  });

  describe('#save', function () {
    C3 = require('./C3');
    var c3 = new C3();

    it('expect to not work with wrong arguments', function (done) {
      expect(function () {
        c3.save(null, null);
      }).to.throw(AssertionError);

      var promises = [];

      promises.push(c3
        .save(function () {})
        .catch(function (error) {
          expect(error).to.be.an.instanceOf(AssertionError);
        }));

      promises.push(c3
        .save({
          forceCreate: true,
          forceUpdate: true
        })
        .catch(function (error) {
          expect(error).to.be.an.instanceOf(AssertionError);
        }));

      promises.push(c3
        .save({
          forceCreate: {}
        })
        .catch(function (error) {
          expect(error).to.be.an.instanceOf(AssertionError);
        }));

      promises.push(c3
        .save({
          forceUpdate: {}
        })
        .catch(function (error) {
          expect(error).to.be.an.instanceOf(AssertionError);
        }));

      Promise.all(promises).then(function () {
        done();
      });
    });

    it('expect to work with right arguments', function (done) {
      var promises = [];

      promises.push(
        c3.save()
      );

      promises.push(
        c3.save(null)
      );

      promises.push(
        c3.save({})
      );

      promises.push(
        c3.save({
          forceCreate: false,
          forceUpate: false
        })
      );

      promises.push(
        c3.save({
          forceCreate: true,
          forceUpate: false
        })
      );

      promises.push(
        c3.save({
          forceCreate: false,
          forceUpate: true
        })
      );

      promises.push(
        c3.save({
          forceCreate: true
        })
      );

      promises.push(
        c3.save({
          forceUpate: true
        })
      );

      promises.push(
        c3.save({
          forceUpate: false
        })
      );

      promises.push(
        c3.save({
          forceCreate: false
        })
      );

      var myC31 = new C3();
      var myC32 = new C3({
        c3A2: myC31
      });
      var myc3 = new C3({
        c3A2: myC32
      });

      promises.push(
        myc3
          .save()
          .then(function () {
            expect(myc3.isNew).to.equal(false);
            expect(myC31.isNew).to.equal(false);
            expect(myC32.isNew).to.equal(false);
          }
        )
      );

      Promise
        .all(promises)
        .then(function () {
          done();
        })
        .catch(console.log);
    });

    it('expect to not work if not valid', function (done) {
      var myC2 = new C2();
      myC2._Entity = function () {};
      myC2
        .save()
        .catch(function (error) {
          expect(error).to.be.an.instanceOf(ValidationError);
          done();
        });
    });

    it('expect to not work if associations not valid', function (done) {
      var promises = [];

      var myC33 = new C3();
      var myC34 = new C3({
        c3A2: myC33
      });
      myC33.c3A1 = null;
      var myC35 = new C3({
        c3A2: myC34
      });

      promises.push(
        myC35
          .save()
          .catch(function (error) {
            expect(error).to.be.instanceOf(ValidationError);
            expect(myC33.isNew).to.equal(true);
            expect(myC34.isNew).to.equal(true);
            expect(myC35.isNew).to.equal(true);
          })
      );

      Promise
        .all(promises)
        .then(function () {
          done();
        })
        .catch(console.log);
    });

    it(
      'expect to not work if adapter does not return an object',
      function (done) {
        c3
          .save({ forceInsert: true })
          .then(function () {
            c3.c3A1 = {};

            var updateObjectFunction = settings.ADAPTERS.default.updateObject;
            settings.ADAPTERS.default.updateObject = function () {
              return null;
            };

            c3
              .save()
              .catch(function (error) {
                expect(error).to.be.an.instanceOf(AssertionError);
                settings.ADAPTERS.default.updateObject = updateObjectFunction;
                done();
              });
          });
      }
    );

    it(
      'expect to not work if adapter does not return an object',
      function (done) {
        c3
          .save({ forceInsert: true })
          .then(function () {
            c3.c3A1 = {};

            var updateObjectFunction = settings.ADAPTERS.default.updateObject;
            settings.ADAPTERS.default.updateObject = function () {
              return function () {};
            };

            c3
              .save()
              .catch(function (error) {
                expect(error).to.be.an.instanceOf(AssertionError);
                settings.ADAPTERS.default.updateObject = updateObjectFunction;
                done();
              });
          });
      }
    );

    it(
      'expect to not work if adapter does not return a Promise',
      function (done) {
        c3
          .save({ forceInsert: true })
          .then(function () {
            c3.c3A1 = {};

            var updateObjectFunction = settings.ADAPTERS.default.updateObject;
            settings.ADAPTERS.default.updateObject = function () {
              return {};
            };

            c3
              .save()
              .catch(function (error) {
                expect(error).to.be.an.instanceOf(AssertionError);
                settings.ADAPTERS.default.updateObject = updateObjectFunction;
                done();
              });
          });
      }
    );

    it(
      'expect to not work if adapter throws an error',
      function (done) {
        var myNewError = new Error('MyNewError');

        c3
          .save({ forceInsert: true })
          .then(function () {
            c3.c3A1 = {};

            var updateObjectFunction = settings.ADAPTERS.default.updateObject;
            settings.ADAPTERS.default.updateObject = function () {
              throw myNewError;
            };

            c3
              .save()
              .catch(function (error) {
                expect(error).to.equal(myNewError);
                settings.ADAPTERS.default.updateObject = updateObjectFunction;
                done();
              });
          });
      }
    );
  });

  describe('dirty/clean', function () {
    it(
      'expect to have option in constructor to instantiate clean',
      function () {
        C3 = require('./C3');

        var c3 = new C3(
          {},
          {
            clean: true
          }
        );

        c3 = new C3(
          {},
          {
            clean: false
          }
        );

        expect(function () {
          c3 = new C3(
            {},
            {
              clean: {}
            }
          );
        }).to.throw(AssertionError);
      }
    );

    it('expect to correctly control the dirty/clean state', function (done) {
      var c3 = new C3();
      expect(c3.isDirty()).to.equal(true);
      expect(c3.isDirty('id')).to.equal(true);
      expect(c3.isDirty('c3A1')).to.equal(true);
      expect(c3.isDirty('c3A2')).to.equal(true);

      c3 = new C3({}, { isNew: true });
      expect(c3.isDirty()).to.equal(true);
      expect(c3.isDirty('id')).to.equal(true);
      expect(c3.isDirty('c3A1')).to.equal(true);
      expect(c3.isDirty('c3A2')).to.equal(true);

      c3 = new C3({}, { isNew: false });
      expect(c3.isDirty()).to.equal(true);
      expect(c3.isDirty('id')).to.equal(true);
      expect(c3.isDirty('c3A1')).to.equal(true);
      expect(c3.isDirty('c3A2')).to.equal(true);

      c3 = new C3(
        {
          id: uuid.v4(),
          c3A1: {},
          c3A2: null
        },
        { isNew: true }
      );
      expect(c3.isDirty()).to.equal(true);
      expect(c3.isDirty('id')).to.equal(true);
      expect(c3.isDirty('c3A1')).to.equal(true);
      expect(c3.isDirty('c3A2')).to.equal(true);

      c3 = new C3(
        {
          id: uuid.v4(),
          c3A1: {},
          c3A2: null
        },
        { isNew: false }
      );
      expect(c3.isDirty()).to.equal(false);
      expect(c3.isDirty('id')).to.equal(false);
      expect(c3.isDirty('c3A1')).to.equal(false);
      expect(c3.isDirty('c3A2')).to.equal(false);

      c3 = new C3(
        {
          c3A1: {},
          c3A2: null
        },
        { isNew: false }
      );
      expect(c3.isDirty()).to.equal(true);
      expect(c3.isDirty('id')).to.equal(true);
      expect(c3.isDirty('c3A1')).to.equal(false);
      expect(c3.isDirty('c3A2')).to.equal(false);

      c3 = new C3(
        {
          id: uuid.v4(),
          c3A2: null
        },
        { isNew: false }
      );
      expect(c3.isDirty()).to.equal(true);
      expect(c3.isDirty('id')).to.equal(false);
      expect(c3.isDirty('c3A1')).to.equal(true);
      expect(c3.isDirty('c3A2')).to.equal(false);

      c3 = new C3({}, {clean: true});
      expect(c3.isDirty()).to.equal(true);
      expect(c3.isDirty('id')).to.equal(true);
      expect(c3.isDirty('c3A1')).to.equal(true);
      expect(c3.isDirty('c3A2')).to.equal(true);

      c3 = new C3({}, { isNew: true, clean: true });
      expect(c3.isDirty()).to.equal(true);
      expect(c3.isDirty('id')).to.equal(true);
      expect(c3.isDirty('c3A1')).to.equal(true);
      expect(c3.isDirty('c3A2')).to.equal(true);

      c3 = new C3({}, { isNew: false, clean: true });
      expect(c3.isDirty()).to.equal(true);
      expect(c3.isDirty('id')).to.equal(true);
      expect(c3.isDirty('c3A1')).to.equal(false);
      expect(c3.isDirty('c3A2')).to.equal(false);

      c3 = new C3(
        {
          id: uuid.v4(),
          c3A1: {},
          c3A2: null
        },
        { isNew: true, clean: true }
      );
      expect(c3.isDirty()).to.equal(true);
      expect(c3.isDirty('id')).to.equal(true);
      expect(c3.isDirty('c3A1')).to.equal(true);
      expect(c3.isDirty('c3A2')).to.equal(true);

      c3 = new C3(
        {
          id: uuid.v4(),
          c3A1: {},
          c3A2: null
        },
        { isNew: false, clean: true }
      );
      expect(c3.isDirty()).to.equal(false);
      expect(c3.isDirty('id')).to.equal(false);
      expect(c3.isDirty('c3A1')).to.equal(false);
      expect(c3.isDirty('c3A2')).to.equal(false);

      c3 = new C3(
        {
          c3A1: {},
          c3A2: null
        },
        { isNew: false, clean: true }
      );
      expect(c3.isDirty()).to.equal(true);
      expect(c3.isDirty('id')).to.equal(true);
      expect(c3.isDirty('c3A1')).to.equal(false);
      expect(c3.isDirty('c3A2')).to.equal(false);

      c3 = new C3(
        {
          id: uuid.v4(),
          c3A2: null
        },
        { isNew: false, clean: true }
      );
      expect(c3.isDirty()).to.equal(false);
      expect(c3.isDirty('id')).to.equal(false);
      expect(c3.isDirty('c3A1')).to.equal(false);
      expect(c3.isDirty('c3A2')).to.equal(false);

      c3.c3A2 = null;
      expect(c3.isDirty()).to.equal(false);
      expect(c3.isDirty('id')).to.equal(false);
      expect(c3.isDirty('c3A1')).to.equal(false);
      expect(c3.isDirty('c3A2')).to.equal(false);

      c3.c3A1 = {};
      expect(c3.isDirty()).to.equal(true);
      expect(c3.isDirty('id')).to.equal(false);
      expect(c3.isDirty('c3A1')).to.equal(true);
      expect(c3.isDirty('c3A2')).to.equal(false);

      c3.clean('c3A1');
      expect(c3.isDirty()).to.equal(false);
      expect(c3.isDirty('id')).to.equal(false);
      expect(c3.isDirty('c3A1')).to.equal(false);
      expect(c3.isDirty('c3A2')).to.equal(false);

      c3.c3A1 = {};
      expect(c3.isDirty()).to.equal(true);
      expect(c3.isDirty('id')).to.equal(false);
      expect(c3.isDirty('c3A1')).to.equal(true);
      expect(c3.isDirty('c3A2')).to.equal(false);

      c3.clean();
      expect(c3.isDirty()).to.equal(false);
      expect(c3.isDirty('id')).to.equal(false);
      expect(c3.isDirty('c3A1')).to.equal(false);
      expect(c3.isDirty('c3A2')).to.equal(false);

      c3.c3A1 = {};
      expect(c3.isDirty()).to.equal(true);
      expect(c3.isDirty('id')).to.equal(false);
      expect(c3.isDirty('c3A1')).to.equal(true);
      expect(c3.isDirty('c3A2')).to.equal(false);

      c3
        .save()
        .then(function () {
          expect(c3.isDirty()).to.equal(false);
          expect(c3.isDirty('id')).to.equal(false);
          expect(c3.isDirty('c3A1')).to.equal(false);
          expect(c3.isDirty('c3A2')).to.equal(false);

          c3 = new C3(
            {
              id: uuid.v4(),
              c3A1: function () {},
              c3A2: null
            },
            { isNew: false, clean: true }
          );
          expect(c3.isDirty()).to.equal(false);
          expect(c3.isDirty('id')).to.equal(false);
          expect(c3.isDirty('c3A1')).to.equal(false);
          expect(c3.isDirty('c3A2')).to.equal(false);

          c3.validate();

          c3.c3A1 = function () {};

          expect(function () {
            c3.validate();
          }).to.throw(ValidationError);

          done();
        });
    });
  });
});
