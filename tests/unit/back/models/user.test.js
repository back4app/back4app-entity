'use strict';

var chai = require('chai');
var expect = chai.expect;
var AssertionError = chai.AssertionError;
var methods = require('../../../../').models.methods;
var User = require('../../../../').models.User;

require('../../settings');

var user = new User({
  username: 'test',
  email: 'email@test.com',
  password: '$2a$10$Bd4I9p6xSuphD3gSPk006.fMR5/Dr9LjJD7JhvJcm7hpDaS0wJruq'
});

describe('User', function () {

  it('has attributes', function () {
    expect(user).to.have.property('username');
    expect(user).to.have.property('email');
    expect(user).to.have.property('password');
  });

  it('#authenticate', function () {
    var promises = [
      user.authenticate('teste').then(function (res) {
        expect(res).to.be.false;
      }),
      user.authenticate('test').then(function (res) {
        expect(res).to.be.true;
      })
    ];
    return Promise
      .all(promises)
  });
});

