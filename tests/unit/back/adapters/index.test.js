'use strict';

var expect = require('chai').expect;
var Entity = require('../../../../').models.Entity;
var adapters = require('../../../../').adapters;


describe('index', function () {

  it.skip('expect to create new schema (directly on mongoBD adapter)',
    function (done) {
    var mongo =
      require('../../../../node_modules/@back4app/back4app-entity-mongodb');
    var Person = Entity.specify({
      name: 'Person',
      attributes: {
        name: {
          type: 'String',
          multiplicity: '1',
          default: ''
        }
      },
      methods: {
        greeting: function greeting() {
          return 'I am ' + this.name;
        }
      }
    });

    adapters.init(mongo);
    adapters.adapters[0].registerEntity(Person).then(function (Model) {
      (new Model({name: 'Johnny'}));
    }).then(function () {
      adapters.adapters[0].getMongooseModel('Person').then(function (model) {
        expect(adapters.adapters[0].entitySchema).to.equal(model);
      });
      done();
    });

  });

});



//tests
