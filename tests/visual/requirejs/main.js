'use strict';

function makeMockAdapter(Adapter) {
  // create class
  var MockAdapter = function () {};

  // inherit from base Adapter
  MockAdapter.prototype = Object.create(Adapter.prototype);
  MockAdapter.prototype.constructor = MockAdapter;

  // implement stub methods
  MockAdapter.prototype.loadEntity = function () {};
  MockAdapter.prototype.loadEntityAttribute = function () {};
  MockAdapter.prototype.insertObject = function () {};
  MockAdapter.prototype.updateObject = function () {};

  return MockAdapter;
}

require(['back4app-entity'], function (entity) {
  var Adapter = entity.adapters.Adapter;
  var Entity = entity.models.Entity;

  // set default adapter
  var MockAdapter = makeMockAdapter(Adapter);

  entity.settings.ADAPTERS = {
    default: new MockAdapter()
  };

  // create new entity class
  var Person = Entity.specify({
    name: 'Person',
    attributes: {
      name: {
        type: 'String'
      },
      createdAt: {
        type: 'Datetime',
        default: Date.now
      },
      friends: {
        type: 'String',
        multiplicity: '*'
      }
    },
    methods: {
      getInfo: function () {
        return 'I am ' + this.name + ', created at ' + new Date(this.createdAt);
      }
    }
  });

  // test entity instance
  var person = new Person();
  person.name = 'John';
  console.log(person.getInfo());
});
