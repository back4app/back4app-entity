//
// Created by davimacedo on 30/09/15.
//

'use strict';

var chai = require('chai');
var expect = chai.expect;
var AssertionError = chai.AssertionError;
var errors = require('../../../../src/back/models/errors');

describe('errors', function () {
  it(
    'expect to export EntityNotFoundError in the EntityNotFoundError property',
    function () {
      expect(errors).to.have.property('EntityNotFoundError');
    }
  );

  describe('EntityNotFoundError', function () {
    var entityNotFoundError;

    it('expect to work with right parameters', function () {
      entityNotFoundError = new errors.EntityNotFoundError();
      entityNotFoundError = new errors.EntityNotFoundError('MyEntity');
      entityNotFoundError = new errors.EntityNotFoundError(
        null,
        new Error()
      );
      entityNotFoundError = new errors.EntityNotFoundError(
        'MyEntity',
        new Error()
      );
    });

    it('expect to not work with wrong parameters', function () {
      expect(function () {
        entityNotFoundError = new errors.EntityNotFoundError({});
      }).to.throw(AssertionError);

      expect(function () {
        entityNotFoundError = new errors.EntityNotFoundError(null, {});
      }).to.throw(AssertionError);

      expect(function () {
        entityNotFoundError = new errors.EntityNotFoundError({}, {});
      }).to.throw(AssertionError);

      expect(function () {
        entityNotFoundError = new errors.EntityNotFoundError(
          'MyEntity',
          new Error(),
          null
        );
      }).to.throw(AssertionError);
    });

    it('expect to be an Error', function () {
      expect(new errors.EntityNotFoundError()).to.be.an.instanceof(Error);
    });

    it('expect to have the right name', function () {
      expect(new errors.EntityNotFoundError()).to.have.property('name')
        .that.equals('EntityNotFoundError');
    });

    it('expect to have the right message', function () {
      expect(new errors.EntityNotFoundError('MyEntity'))
        .to.have.property('message')
        .that.equals('Cannot find Entity "MyEntity"');
    });

    it('expect to concatenate the stack of the inner error', function () {
      var error = new Error();
      entityNotFoundError = new errors.EntityNotFoundError(null, error);
      expect(entityNotFoundError)
        .to.have.property('stack')
        .that.contains(error.stack);
    });
  });

  describe('AttributeTypeNotFoundError', function () {
    var attributeTypeNotFoundError;

    it('expect to work with right parameters', function () {
      attributeTypeNotFoundError = new errors.AttributeTypeNotFoundError();
      attributeTypeNotFoundError = new errors.AttributeTypeNotFoundError(
        'MyCustomAttribute'
      );
      attributeTypeNotFoundError = new errors.AttributeTypeNotFoundError(
        null,
        new Error()
      );
      attributeTypeNotFoundError = new errors.AttributeTypeNotFoundError(
        'MyCustomAttribute',
        new Error()
      );
    });

    it('expect to not work with wrong parameters', function () {
      expect(function () {
        attributeTypeNotFoundError = new errors.AttributeTypeNotFoundError({});
      }).to.throw(AssertionError);

      expect(function () {
        attributeTypeNotFoundError = new errors.AttributeTypeNotFoundError(
          null,
          {}
        );
      }).to.throw(AssertionError);

      expect(function () {
        attributeTypeNotFoundError = new errors.AttributeTypeNotFoundError(
          {},
          {}
        );
      }).to.throw(AssertionError);

      expect(function () {
        attributeTypeNotFoundError = new errors.AttributeTypeNotFoundError(
          'MyEntity',
          new Error(),
          null
        );
      }).to.throw(AssertionError);
    });

    it('expect to be an Error', function () {
      expect(new errors.AttributeTypeNotFoundError())
        .to.be.an.instanceof(Error);
    });

    it('expect to have the right name', function () {
      expect(new errors.AttributeTypeNotFoundError()).to.have.property('name')
        .that.equals('AttributeTypeNotFoundError');
    });

    it('expect to have the right message', function () {
      expect(new errors.AttributeTypeNotFoundError('MyCustomAttribute'))
        .to.have.property('message')
        .that.equals('Cannot find Attribute type "MyCustomAttribute"');
    });

    it('expect to concatenate the stack of the inner error', function () {
      var error = new Error();
      attributeTypeNotFoundError = new errors.AttributeTypeNotFoundError(
        null,
        error
      );
      expect(attributeTypeNotFoundError)
        .to.have.property('stack')
        .that.contains(error.stack);
    });
  });
});
