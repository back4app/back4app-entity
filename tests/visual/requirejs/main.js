'use strict';

requirejs(['back4app-entity'], function (entity) {
  var Entity = entity.models.Entity;

  var Person = Entity.specify({
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
        return 'I am ' + this.name + ', created at ' + this.createdAt;
      }
    }
  });

  var person = new Person();
  person.name = 'John';
  person.createdAt = new Date();
  console.log(Person.methods.getInfo.call(person));
});
