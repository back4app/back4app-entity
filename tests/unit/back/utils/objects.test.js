//
// Created by davimacedo on 09/10/15.
//

'use strict';

var chai = require('chai');
var expect = chai.expect;
var AssertionError = chai.AssertionError;
var objects = require('../../../../src/back/utils').objects;

describe('objects', function () {
  describe('~copy', function () {
    context('interface tests', function () {
      it('expect to exist as an inner method', function () {
        expect(objects).to.respondTo('copy');
      });

      it('expect to work with object', function () {
        objects.copy({});

        function MyClass() {}

        var myObject = new MyClass();

        objects.copy(myObject);
      });

      it('expect to throw AssertionError with no objects', function () {
        expect(function () {
          objects.copy(true);
        }).to.throw(AssertionError);

        expect(function () {
          objects.copy(null);
        }).to.throw(AssertionError);

        expect(function () {
          objects.copy(undefined);
        }).to.throw(AssertionError);

        expect(function () {
          objects.copy(function () {});
        }).to.throw(AssertionError);
      });

      it(
        'expect to throw AssertionError with no parameters',
        function () {
          expect(function () {
            objects.copy();
          }).to.throw(AssertionError);
        }
      );

      it(
        'expect to throw AssertionError with more than 1 parameter',
        function () {
          expect(function () {
            objects.copy({}, null);
          }).to.throw(AssertionError);
        }
      );
    });

    context('functional tests', function () {
      var o = {
        o1: 'o1'
      };

      var copy = objects.copy(o);

      expect(copy).to.not.equal(o);

      expect(copy).to.deep.equal(o);
    });
  });
});
