//
// Created by davimacedo on 22/10/15.
//

'use strict';

var chai = require('chai');
var expect = chai.expect;
var AssertionError = chai.AssertionError;
var entity = require('../../../../');
var classes = entity.utils.classes;
var adapters = entity.adapters;
var Adapter = adapters.Adapter;
var Entity = entity.models.Entity;
var ObjectAttribute = entity.models.attributes.types.ObjectAttribute;

require('../../settings');

describe('Adapter', function () {
  var adapter;

  var myEntityAttribute = new ObjectAttribute('myAttribute');
  var MyEntity = Entity.specify(
    'MyNewEntity',
    [
      myEntityAttribute
    ]
  );

  function WrongAdapterProxy() {
    adapters.Adapter.apply(this, Array.prototype.slice.call(arguments));
  }

  function AdapterProxy() {
    adapters.Adapter.apply(this, Array.prototype.slice.call(arguments));
  }

  classes.generalize(adapters.Adapter, AdapterProxy);

  context('interface tests', function () {
    it('expect to not be able to instantiate directly', function () {
      expect(function () {
        adapter = new Adapter();
      }).to.throw(AssertionError);
    });

    it(
      'expect to not be not able to instantiate from a non subclass',
      function () {
        expect(function () {
          adapter = new WrongAdapterProxy();
        }).to.throw(AssertionError);
      }
    );

    it('expect to work when initialized from subclasses', function () {
      adapter = new AdapterProxy();
    });
  });

  describe('#loadEntity', function () {
    adapter = new AdapterProxy();

    it('expect to exist as an instance member', function () {
      expect(adapter).to.respondTo('loadEntity');
    });

    it('expect to be implemented in concrete adapters', function () {
      expect(function () {
        adapters.Adapter.prototype.loadEntity(Entity);
      }).to.throw(Error);
    });
  });

  describe('#loadEntityAttribute', function () {
    adapter = new AdapterProxy();

    it('expect to exist as an instance member', function () {
      expect(adapter).to.respondTo('loadEntityAttribute');
    });

    it('expect to be implemented in concrete adapters', function () {
      expect(function () {
        adapter.loadEntityAttribute(
          MyEntity,
          myEntityAttribute
        );
      }).to.throw(Error);
    });
  });

  describe('#insertObject', function () {
    adapter = new AdapterProxy();

    it('expect to exist as an instance member', function () {
      expect(adapter).to.respondTo('insertObject');
    });

    it('expect to be implemented in concrete adapters', function (done) {
      adapters.Adapter.prototype
        .insertObject(new MyEntity())
        .catch(function (error) {
          expect(error).to.be.an.instanceOf(Error);
          done();
        });
    });
  });
});
