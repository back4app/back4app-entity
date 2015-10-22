//
// Created by davimacedo on 22/10/15.
//

'use strict';

var chai = require('chai');
var expect = chai.expect;
var AssertionError = chai.AssertionError;
var classes = require('../../../../src/back/utils').classes;
var adapters = require('../../../../').adapters;
var Adapter = adapters.Adapter;

require('../../settings');

describe('Adapter', function () {
  var adapter;

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
});
