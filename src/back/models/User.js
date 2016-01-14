'use strict';

var Entity = require('./Entity');
var Promise = require('bluebird');
var bcrypt = require('bcryptjs');

module.exports = Entity.specify({
  name: 'User',

  attributes: {
    'username': {
      type: 'String',
      multiplicity: '1',
      default: ''
    },
    'email': {
      type: 'String',
      multiplicity: '1',
      default: ''
    },
    'password': {
      type: 'String',
      multiplicity: '1',
      default: ''
    }
  },

  methods: {
    'authenticate': authenticate
  },

  nameValidation: false

});

function authenticate(password) {
  var user = this;
  return new Promise(function (resolve) {
    bcrypt.compare(password, user.password, function (err, res) {
      resolve(res);
    });
  })
}

