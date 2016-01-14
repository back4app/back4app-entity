'use strict';

var chai = require('chai');
var expect = chai.expect;
var User = require('../../../../').models.User;
var Promise = require('bluebird');

require('../../settings');

var user = new User({
  username: 'test',
  email: 'email@test.com',
  password: '$2a$10$Bd4I9p6xSuphD3gSPk006.fMR5/Dr9LjJD7JhvJcm7hpDaS0wJruq'
  // the hash refers to 'test'
});

describe('User', function () {

  it('has attributes', function () {
    expect(user).to.have.property('username');
    expect(user).to.have.property('email');
    expect(user).to.have.property('password');
  });

  it('#authenticate', function () {
    var promises = [
      user.authenticate('wrong_password').then(function (res) {
        expect(res).to.equal(false);
      }),
      user.authenticate('test').then(function (res) {
        expect(res).to.equal(true);
      })
    ];
    return Promise.all(promises);
  });
});

