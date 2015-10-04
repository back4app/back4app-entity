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

    context('interface tests', function () {
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
    });

    describe('.add', function () {
      it('expect to exist as a static method', function () {
        expect(methods.MethodCollection).itself.to.respondTo('add');
      });

      it('expect to work with right arguments', function () {
        methods.MethodCollection.add(
          methodCollection,
          function () { return 'method3'; },
          'method3'
        );
      });

      it('expect to not work with wrong arguments', function () {
        expect(function () {
          methods.MethodCollection.add(methodCollection);
        }).to.throw(AssertionError);

        expect(function () {
          methods.MethodCollection.add(
            methodCollection,
            function () { return 'method4'; },
            'method4',
            null
          );
        }).to.throw(AssertionError);

        expect(function () {
          methods.MethodCollection.add(methodCollection, {}, 'method4');
        }).to.throw(AssertionError);

        expect(function () {
          methods.MethodCollection.add(
            methodCollection,
            function () { return 'method4'; },
            {}
          );
        }).to.throw(AssertionError);

        expect(methodCollection).not.to.respondTo('method4');
      });

      it('expect to not work with duplicates', function () {
        expect(function () {
          methods.MethodCollection.add(
            methodCollection,
            function () { return 'will never execute'; },
            'method3'
          );
        }).to.throw(AssertionError);

        expect(methodCollection.method3()).to.equal('method3');
      });

      it(
        'expect to not work with not extensible MethodCollection',
        function () {
          Object.preventExtensions(methodCollection);

          expect(function () {
            methods.MethodCollection.add(
              methodCollection,
              function () { return 'method5'; },
              'method5'
            );
          }).to.throw(AssertionError);

          expect(methodCollection).not.to.respondTo('method5');
        }
      );
    });

    context('functional tests', function () {
      it('expect to allow execute functions correctly', function () {
        expect(methodCollection.method1()).to.equal('method1');
        expect(methodCollection.method2()).to.equal('method2');
        expect(methodCollection.method3()).to.equal('method3');
      });

      it('expect to allow to list methods', function () {
        var methods = [];

        for (var method in methodCollection) {
          methods.push(method);
        }

        expect(methods).to.be.deep.equal(['method1', 'method2', 'method3']);
      });

      it('expect to not allow to delete method', function () {
        expect(function () {
          delete methodCollection.method1;
        }).to.throw(Error);

        expect(methodCollection).to.respondTo('method1');
      });

      it('expect to not allow to change method', function () {
        expect(function () {
          methodCollection.method1 = function () {
            return 'will never execute';
          };
        }).to.throw(Error);

        expect(methodCollection.method1()).to.equal('method1');
      });
    });
  });
});
