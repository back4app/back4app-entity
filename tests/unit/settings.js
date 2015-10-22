//
// Created by davimacedo on 22/10/15.
//

var settings = require('../../').settings;
var MockAdapter = require('./back/adapters/MockAdapter');

settings.ADAPTERS.default = new MockAdapter();
