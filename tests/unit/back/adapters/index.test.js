'use strict';

var expect = require('chai').expect;
var Entity = require('../../../../').models.Entity;


describe('index', function () {

  it.skip('expect to create new schema (directly on mongoBD adapter)',
    function (done) {
      //var entity = require('@back4app/back4app-entity');
      var entity = require('../../../../');
      var MongoAdapter = require('@back4app/back4app-entity-mongodb');

      entity.settings.ADAPTERS = {
        default: new MongoAdapter('localhost')
      };

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

      entity.settings.ADAPTERS.default.registerEntity(Person)
        .then(function (Model) {
          return new Model({name: 'Johnny'});
        }).then(function () {
          entity.settings.ADAPTERS.default.getMongooseModel('Person')
            .then(function (model) {
              expect(entity.settings.ADAPTERS.default.entitySchema).to.equal(model);
            });
          done();
        });

    });

});



//tests
