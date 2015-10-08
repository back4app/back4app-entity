//
// Created by davimacedo on 08/10/15.
//

'use strict';

var classes = require('../../../utils/classes');
var Attribute = require('../Attribute');

module.exports = ObjectAttribute;

function ObjectAttribute() {
  Attribute.apply(this, arguments);
}

classes.generalize(Attribute, ObjectAttribute);
