//
// Created by davimacedo on 22/09/15.
//

'use strict';

var expect = require('chai').expect;
var modelsIndex = require('../../../..//src/back/models');
var Entity = require('../../../../src/back/models/Entity');
var EntitySpecification = require(
  '../../../../src/back/models/EntitySpecification'
);
var attributes = require('../../../../src/back/models/attributes');
var methods = require('../../../../src/back/models/methods');
var errors = require('../../../../src/back/models/errors');

describe('modelsIndex', function () {
  it('expect to export Entity in the Entity property', function () {
    expect(modelsIndex).to.have.property('Entity')
      .that.equals(Entity);
  });

  it(
    'expect to export EntitySpecification in the EntitySpecification property',
    function () {
      expect(modelsIndex).to.have.property('EntitySpecification')
        .that.equals(EntitySpecification);
    }
  );

  it('expect to export attributes in the attributes property', function () {
    expect(modelsIndex).to.have.property('attributes')
      .that.equals(attributes);
  });

  it('expect to export methods in the methods property', function () {
    expect(modelsIndex).to.have.property('methods')
      .that.equals(methods);
  });

  it('expect to export errors in the errors property', function () {
    expect(modelsIndex).to.have.property('errors')
      .that.equals(errors);
  });
});
