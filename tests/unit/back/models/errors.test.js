//
// Created by davimacedo on 30/09/15.
//

'use strict';

var chai = require('chai');
var expect = chai.expect;
var AssertionError = chai.AssertionError;
var errors = require('../../../../').models.errors;

describe('errors', function () {
  it(
    'expect to export EntityNotFoundError in the EntityNotFoundError property',
    function () {
      expect(errors).to.have.property('EntityNotFoundError');
    }
  );

  it(
    'expect to export AttributeTypeNotFoundError in the ' +
    'AttributeTypeNotFoundError property',
    function () {
      expect(errors).to.have.property('AttributeTypeNotFoundError');
    }
  );

  it(
    'expect to export ValidationError in the ValidationError property',
    function () {
      expect(errors).to.have.property('ValidationError');
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

    it('expect have properties storing right values', function () {
      expect(entityNotFoundError).to.have.property('entity')
        .that.equals('MyEntity');

      expect(entityNotFoundError).to.have.property('innerError')
        .that.deep.equals(new Error());
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

    it('expect have properties storing right values', function () {
      expect(attributeTypeNotFoundError).to.have.property('type')
        .that.equals('MyCustomAttribute');

      expect(attributeTypeNotFoundError).to.have.property('innerError')
        .that.deep.equals(new Error());
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

  describe('ValidationError', function () {
    var validationError;

    it('expect to work with right parameters', function () {
      validationError = new errors.ValidationError();
      validationError = new errors.ValidationError(
        null,
        null,
        null,
        null,
        null
      );
      validationError = new errors.ValidationError(
        'my validation message'
      );
      validationError = new errors.ValidationError(
        'my validation message',
        'MyEntity'
      );
      validationError = new errors.ValidationError(
        'my validation message',
        'MyEntity',
        'myAttribute'
      );
      validationError = new errors.ValidationError(
        'my validation message',
        'MyEntity',
        'myAttribute',
        1
      );
      validationError = new errors.ValidationError(
        'my validation message',
        'MyEntity',
        'myAttribute',
        1,
        new Error()
      );
    });

    it('expect have properties storing right values', function () {
      expect(validationError).to.have.property('validationMessage')
        .that.equals('my validation message');

      expect(validationError).to.have.property('entity')
        .that.equals('MyEntity');

      expect(validationError).to.have.property('attribute')
        .that.equals('myAttribute');

      expect(validationError).to.have.property('position')
        .that.equals(1);

      expect(validationError).to.have.property('innerError')
        .that.deep.equals(new Error());
    });

    it('expect to not work with wrong parameters', function () {
      expect(function () {
        validationError = new errors.ValidationError({});
      }).to.throw(AssertionError);

      expect(function () {
        validationError = new errors.ValidationError(
          null,
          {}
        );
      }).to.throw(AssertionError);

      expect(function () {
        validationError = new errors.ValidationError(
          null,
          null,
          {}
        );
      }).to.throw(AssertionError);

      expect(function () {
        validationError = new errors.ValidationError(
          null,
          null,
          null,
          {}
        );
      }).to.throw(AssertionError);

      expect(function () {
        validationError = new errors.ValidationError(
          null,
          null,
          null,
          null,
          {}
        );
      }).to.throw(AssertionError);

      expect(function () {
        validationError = new errors.ValidationError(
          null,
          null,
          null,
          null,
          null,
          null
        );
      }).to.throw(AssertionError);
    });

    it('expect to be an Error', function () {
      expect(new errors.ValidationError())
        .to.be.an.instanceof(Error);
    });

    it('expect to have the right name', function () {
      expect(new errors.ValidationError()).to.have.property('name')
        .that.equals('ValidationError');
    });

    it('expect to have the right message', function () {
      expect(new errors.ValidationError(
        'this attribute is required',
        'MyEntity',
        'myAttribute',
        1,
        null
      )).to.have.property('message')
        .that.equals('Error when validating an attribute called ' +
        '"myAttribute" of an entity called "MyEntity" in position 1: this ' +
        'attribute is required');
    });

    it('expect to concatenate the stack of the inner error', function () {
      var error = new Error();
      validationError = new errors.ValidationError(
        null,
        null,
        null,
        null,
        error
      );
      expect(validationError)
        .to.have.property('stack')
        .that.contains(error.stack);
    });
  });

  describe('AdapterNotFoundError', function () {
    var adapterNotFoundError;

    it('expect to work with right parameters', function () {
      adapterNotFoundError = new errors.AdapterNotFoundError();
      adapterNotFoundError = new errors.AdapterNotFoundError('MyAdapter');
      adapterNotFoundError = new errors.AdapterNotFoundError(
        null,
        new Error()
      );
      adapterNotFoundError = new errors.AdapterNotFoundError(
        'MyAdapter',
        new Error()
      );
    });

    it('expect have properties storing right values', function () {
      expect(adapterNotFoundError).to.have.property('adapterName')
        .that.equals('MyAdapter');

      expect(adapterNotFoundError).to.have.property('innerError')
        .that.deep.equals(new Error());
    });

    it('expect to not work with wrong parameters', function () {
      expect(function () {
        adapterNotFoundError = new errors.AdapterNotFoundError({});
      }).to.throw(AssertionError);

      expect(function () {
        adapterNotFoundError = new errors.AdapterNotFoundError(null, {});
      }).to.throw(AssertionError);

      expect(function () {
        adapterNotFoundError = new errors.AdapterNotFoundError({}, {});
      }).to.throw(AssertionError);

      expect(function () {
        adapterNotFoundError = new errors.AdapterNotFoundError(
          'MyAdapter',
          new Error(),
          null
        );
      }).to.throw(AssertionError);
    });

    it('expect to be an Error', function () {
      expect(new errors.AdapterNotFoundError()).to.be.an.instanceof(Error);
    });

    it('expect to have the right name', function () {
      expect(new errors.AdapterNotFoundError()).to.have.property('name')
        .that.equals('AdapterNotFoundError');
    });

    it('expect to have the right message', function () {
      expect(new errors.AdapterNotFoundError('MyAdapter'))
        .to.have.property('message')
        .that.equals('Cannot find Adapter "MyAdapter"');
    });

    it('expect to concatenate the stack of the inner error', function () {
      var error = new Error();
      adapterNotFoundError = new errors.AdapterNotFoundError(null, error);
      expect(adapterNotFoundError)
        .to.have.property('stack')
        .that.contains(error.stack);
    });
  });
});
