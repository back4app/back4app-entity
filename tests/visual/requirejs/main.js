'use strict';

require(['back4app-entity'], function (entity) {
  var Entity = entity.models.Entity;

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

  var person = new Person();
  person.name = 'John';
  console.log(person.getInfo());
});
