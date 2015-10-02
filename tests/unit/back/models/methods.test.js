//
// Created by davimacedo on 02/10/15.
//

'use strict';

var chai = require('chai');
var expect = chai.expect;
var AssertionError = chai.AssertionError;
var methods = require('../../../../src/back/models/methods');

describe('methods', function () {
  it(
    'expect to export MethodCollection in the MethodCollection property',
    function () {
      expect(methods).to.have.property('MethodCollection');
    }
  );

  describe('MethodCollection', function () {
    var methodCollection;

    it('expect to work without arguments', function () {
      methodCollection = new methods.MethodCollection();
    });

    it('expect to work with null argument', function () {
      methodCollection = new methods.MethodCollection(null);
    });

    it('expect to work with empty object', function () {
      methodCollection = new methods.MethodCollection({});
    });

    it('expect to work with right arguments', function () {
      methodCollection = new methods.MethodCollection({
        method1: function () { return 'method1'; },
        method2: function () { return 'method2'; }
      });
    });

    it('expect to not work with wrong arguments', function () {
      expect(function () {
        methodCollection = new methods.MethodCollection({}, {});
      }).to.throw(AssertionError);

      expect(function () {
        methodCollection = new methods.MethodCollection(function () {});
      }).to.throw(AssertionError);

      expect(function () {
        methodCollection = new methods.MethodCollection({
          method1: {}
        });
      }).to.throw(AssertionError);
    });

    describe('#add', function () {
      it('expect to exist as an instance method', function () {
        expect(methodCollection).to.respondTo('add');
      });

      it('expect to work with right arguments', function () {
        methodCollection.add(function () { return 'method3'; }, 'method3');
      });

      it('expect to not work with wrong arguments', function () {
        expect(function () {
          methodCollection.add();
        }).to.throw(AssertionError);

        expect(function () {
          methodCollection.add(
            function () { return 'method4'; },
            'method4',
            null
          );
        }).to.throw(AssertionError);

        expect(function () {
          methodCollection.add({}, 'method4');
        }).to.throw(AssertionError);

        expect(function () {
          methodCollection.add(function () { return 'method4'; }, {});
        }).to.throw(AssertionError);

        expect(methodCollection).not.to.respondTo('method4');
      });

      it('expect to not work with duplicates', function () {
        expect(function () {
          methodCollection.add(
            function () { return 'will never execute'; },
            'method3'
          );
        }).to.throw(AssertionError);

        expect(methodCollection.method3()).to.equal('method3');
      });

      it('expect to allow execute functions correctly', function () {
        expect(methodCollection.method1()).to.equal('method1');
        expect(methodCollection.method2()).to.equal('method2');
        expect(methodCollection.method3()).to.equal('method3');
      });
    });
  });
});
