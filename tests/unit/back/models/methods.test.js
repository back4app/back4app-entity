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
  });
});
