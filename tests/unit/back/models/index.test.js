//
// Created by davimacedo on 22/09/15.
//

'use strict';

var expect = require('chai').expect;
var modelsIndex = require('../../../..//src/back/models');
var Entity = require('../../../../src/back/models/Entity');

describe('modelsIndex', function () {
  it('expect to export Entity in the Entity property', function () {
    expect(modelsIndex).to.have.property('Entity')
      .that.equals(Entity);
  });
});
