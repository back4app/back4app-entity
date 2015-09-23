//
// Created by davimacedo on 22/09/15.
//

var mocha = require('mocha');
var describe = require('mocha').describe;
var it = require('mocha').it;
var expect = require('chai').expect;
var AssertionError = require('chai').AssertionError;
var classes = require('../../../../src/back/utils/classes');

describe('classes', function () {
  describe('generalization', function () {
    context('interface tests', function () {
      it('expect to exist as an inner method', function () {
        expect(classes).to.respondTo('generalization');
      });

      it('expect to work with functions', function () {
        classes.generalization(function () {}, function () {});
      });

      it('expect to throw error with objects', function () {
        expect(function () {
          classes.generalization({}, {});
        }).to.throw(AssertionError);

        expect(function () {
          classes.generalization(function () {}, {});
        }).to.throw(AssertionError);
      });
    });

    context('functional tests', function () {
      var GeneralClass;
      var SpecificClass;
      var g;
      var s;

      it('expect to run without error', function () {
        GeneralClass = function (ga1, ga2) {
          var g = this;

          g.ga1 = ga1;
          g.ga2 = ga2;
        }

        GeneralClass.prototype.gm1 = function () {
          return 'gm1';
        }

        GeneralClass.prototype.gm2 = function () {
          return 'gm2';
        }

        GeneralClass.gs1 = function() {
          return 'gs1';
        }

        GeneralClass.gs2 = function() {
          return 'gs2';
        }

        SpecificClass = function (ga1, ga2, sa) {
          var s = this;

          GeneralClass.call(s, ga1, ga2);

          s.sa = sa;
        }

        classes.generalization(SpecificClass, GeneralClass);

        SpecificClass.prototype.gm1 = function () {
          return 'sm1';
        }

        SpecificClass.prototype.sm = function () {
          return 'sm';
        }

        SpecificClass.gs1 = function () {
          return 'ss1';
        }

        SpecificClass.ss = function () {
          return 'ss';
        }

        g = new GeneralClass('ga1', 'ga2');
        s = new SpecificClass('sa1', 'sa2', 'sa');
      });

      it(
        'expect instance of SpecificClass to be an instance of SpecificClass',
        function () {
          expect(s).to.be.an.instanceof(SpecificClass);
        }
      );

      it(
        'expect instance of SpecificClass to be an instance of GeneralClass',
        function () {
          expect(s).to.be.an.instanceof(GeneralClass);
        }
      );

      it(
        'expect instance of GeneralClass to be an instance of GeneralClass',
        function () {
          expect(g).to.be.an.instanceof(GeneralClass);
        }
      );
    });
  });
});
