//
// Created by davimacedo on 02/10/15.
//

'use strict';

var chai = require('chai');
var expect = chai.expect;
var AssertionError = chai.AssertionError;
var methods = require('../../../../').models.methods;

require('../../settings');

describe('methods', function () {
  it(
    'expect to export MethodDictionary in the MethodDictionary property',
    function () {
      expect(methods).to.have.property('MethodDictionary');
    }
  );

  describe('MethodDictionary', function () {
    var methodDictionary;

    context('interface tests', function () {
      it('expect to work without arguments', function () {
        methodDictionary = new methods.MethodDictionary();
      });

      it('expect to work with null argument', function () {
        methodDictionary = new methods.MethodDictionary(null);
      });

      it('expect to work with empty object', function () {
        methodDictionary = new methods.MethodDictionary({});
      });

      it('expect to work with right arguments', function () {
        methodDictionary = new methods.MethodDictionary({
          method1: function () { return 'method1'; },
          method2: function () { return 'method2'; }
        });
      });

      it('expect to not work with wrong arguments', function () {
        expect(function () {
          methodDictionary = new methods.MethodDictionary({}, {});
        }).to.throw(AssertionError);

        expect(function () {
          methodDictionary = new methods.MethodDictionary(function () {});
        }).to.throw(AssertionError);

        expect(function () {
          methodDictionary = new methods.MethodDictionary({
            method1: {}
          });
        }).to.throw(AssertionError);
      });
    });

    context('functional tests', function () {
      it('expect to allow execute functions correctly', function () {
        expect(methodDictionary.method1()).to.equal('method1');
        expect(methodDictionary.method2()).to.equal('method2');
      });

      it('expect to allow to list methods', function () {
        var methods = [];

        for (var method in methodDictionary) {
          methods.push(method);
        }

        expect(methods).to.be.deep.equal(['method1', 'method2']);
      });

      it('expect to be not extensible', function () {
        expect(Object.isExtensible(methodDictionary)).to.equal(false);

        expect(function () {
          methodDictionary.method3 = function () {
            return 'will never execute';
          };
        }).to.throw(TypeError);

        expect(methodDictionary).to.not.respondTo('method3');
      });

      it('expect to not allow to delete method', function () {
        expect(function () {
          delete methodDictionary.method1;
        }).to.throw(Error);

        expect(methodDictionary).to.respondTo('method1');
      });

      it('expect to not allow to change method', function () {
        expect(function () {
          methodDictionary.method1 = function () {
            return 'will never execute';
          };
        }).to.throw(Error);

        expect(methodDictionary.method1()).to.equal('method1');
      });
    });

    describe('.concat', function () {
      var methodDictionary;
      var concatenatedMethodDictionary;

      it(
        'expect to work with right arguments and have specified behavior',
        function () {
          methodDictionary = new methods.MethodDictionary({
            method1: function () { return 'method1'; },
            method2: function () { return 'method2'; }
          });

          concatenatedMethodDictionary =
            methods.MethodDictionary.concat(
              methodDictionary,
              function () { return 'method3'; },
              'method3'
            );

          expect(concatenatedMethodDictionary)
            .to.not.deep.equal(methodDictionary);

          expect(Object.keys(concatenatedMethodDictionary))
            .to.deep.equal(['method1', 'method2', 'method3']);

          expect(concatenatedMethodDictionary.method1())
            .to.equal('method1');
          expect(concatenatedMethodDictionary.method2())
            .to.equal('method2');
          expect(concatenatedMethodDictionary.method3())
            .to.equal('method3');
        }
      );

      it('expect to not work with wrong arguments', function () {
        expect(function () {
          concatenatedMethodDictionary =
            methods.MethodDictionary.concat(
              methodDictionary,
              function () { return 'method3'; }
            );
        }).to.throw(AssertionError);

        expect(function () {
          concatenatedMethodDictionary =
            methods.MethodDictionary.concat(
              methodDictionary,
              function () { return 'method3'; },
              'method3',
              null
            );
        }).to.throw(AssertionError);

        expect(function () {
          concatenatedMethodDictionary =
            methods.MethodDictionary.concat(
              {},
              function () { return 'method3'; },
              'method3'
            );
        }).to.throw(AssertionError);

        expect(function () {
          concatenatedMethodDictionary =
            methods.MethodDictionary.concat(
              methodDictionary,
              {},
              'method3'
            );
        }).to.throw(AssertionError);

        expect(function () {
          concatenatedMethodDictionary =
            methods.MethodDictionary.concat(
              methodDictionary,
              function () { return 'method3'; },
              null
            );
        }).to.throw(AssertionError);
      });

      it('expect to not work with duplicated', function () {
        expect(function () {
          concatenatedMethodDictionary =
            methods.MethodDictionary.concat(
              concatenatedMethodDictionary,
              function () { return 'method3'; },
              'method3'
            );
        }).to.throw(AssertionError);
      });
    });
  });
});
