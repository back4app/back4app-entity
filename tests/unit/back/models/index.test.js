//
// Created by davimacedo on 22/09/15.
//

'use strict';

var expect = require('chai').expect;
var modelsIndex = require('../../../..//src/back/models');
var Entity = require('../../../../src/back/models/Entity');
var errors = require('../../../../src/back/models/errors');

describe('modelsIndex', function () {
  it('expect to export Entity in the Entity property', function () {
    expect(modelsIndex).to.have.property('Entity')
      .that.equals(Entity);
  });

  it('expect to export errors in the errors property', function () {
    expect(modelsIndex).to.have.property('errors')
      .that.equals(errors);
  });
});
