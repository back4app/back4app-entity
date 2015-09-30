'use strict';

var expect = require('chai').expect;
var Entity = require('../../../../src/back/models/Entity');

describe('Entity', function () {
  var entity;

  var C1;
  var C11;
  var C2;

  var c1;
  var c11;
  var c2;

  it('expect to instantiate new Entity without error', function () {
    entity = new Entity();
  });

  describe('.specify()', function () {
    it('expect to exist as a static method', function () {
      expect(Entity).itself.to.respondTo('specify');
    });

    it('expect to run without error', function () {
      C1 = require('./C1');
      C11 = require('./C11');
      C2 = require('./C2');

      c1 = new C1();
      c11 = new C11();
      c2 = new C2();
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
  });
});
