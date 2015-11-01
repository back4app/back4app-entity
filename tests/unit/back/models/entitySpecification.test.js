//
// Created by davimacedo on 05/10/15.
//

'use strict';

var chai = require('chai');
var expect = chai.expect;
var AssertionError = chai.AssertionError;
var entity = require('../../../../');
var settings = entity.settings;
var classes = entity.utils.classes;
var models = entity.models;
var Entity = models.Entity;
var EntitySpecification = models.EntitySpecification;
var attributes = models.attributes;
var attributeTypes = attributes.types;
var methods = models.methods;

require('../../settings');

describe('EntitySpecification', function () {
  var entitySpecification;

  context('interface tests', function () {
    it('expect to work only with the name', function () {
      entitySpecification = new EntitySpecification('MyEntity');
    });

    it('expect to work with right arguments passing as an object',
      function () {
        entitySpecification = new EntitySpecification({
          name: 'MyEntity'
        });

        entitySpecification = new EntitySpecification({
          name: 'MyEntity',
          attributes: null,
          methods: null,
          isAbstract: null,
          dataName: null
        });

        entitySpecification = new EntitySpecification({
          name: 'MyEntity',
          attributes: {},
          methods: {},
          isAbstract: false,
          dataName: {}
        });

        entitySpecification = new EntitySpecification({
          name: 'MyEntity',
          attributes: new attributes.AttributeDictionary(),
          methods: new methods.MethodDictionary(),
          isAbstract: false,
          dataName: {
            default: 'MyEntity'
          }
        });

        entitySpecification = new EntitySpecification({
          name: 'MyEntity',
          attributes: new attributes.AttributeDictionary()
        });

        entitySpecification = new EntitySpecification({
          name: 'MyEntity',
          methods: new methods.MethodDictionary()
        });

        entitySpecification = new EntitySpecification({
          name: 'MyEntity',
          attributes: new attributes.AttributeDictionary({
            attribute1: new attributeTypes.ObjectAttribute('attribute1'),
            attribute2: new attributeTypes.ObjectAttribute('attribute2')
          }),
          methods: new methods.MethodDictionary({
            method1: function () { return 'method1'; },
            method2: function () { return 'method2'; }
          }),
          isAbstract: false,
          dataName: {
            default: 'MyEntity'
          }
        });
      }
    );

    it('expect to work with right arguments passing as arguments',
      function () {
        entitySpecification = new EntitySpecification(
          'MyEntity',
          null,
          null,
          null
        );

        entitySpecification = new EntitySpecification(
          'MyEntity',
          {},
          {},
          {}
        );

        entitySpecification = new EntitySpecification(
          'MyEntity',
          new attributes.AttributeDictionary(),
          new methods.MethodDictionary(),
          {}
        );

        entitySpecification = new EntitySpecification(
          'MyEntity',
          null,
          new methods.MethodDictionary()
        );

        entitySpecification = new EntitySpecification(
          'MyEntity',
          new attributes.AttributeDictionary(),
          null
        );

        entitySpecification = new EntitySpecification(
          'MyEntity',
          new attributes.AttributeDictionary({
            attribute1: new attributeTypes.BooleanAttribute('attribute1'),
            attribute2: new attributeTypes.BooleanAttribute('attribute2')
          }),
          new methods.MethodDictionary({
            method1: function () { return 'method1'; },
            method2: function () { return 'method2'; }
          }),
          {
            isAbstract: true,
            dataName: {
              default: 'MyEntity'
            }
          }
        );
      }
    );

    it('expect to not work without arguments', function () {
      expect(function () {
        entitySpecification = new EntitySpecification();
      }).to.throw(AssertionError);
    });

    it('expect to not work with null argument', function () {
      expect(function () {
        entitySpecification = new EntitySpecification(null);
      }).to.throw(AssertionError);
    });

    it('expect to not work with empty object', function () {
      expect(function () {
        entitySpecification = new EntitySpecification({});
      }).to.throw(AssertionError);
    });

    it('expect to not work with wrong arguments', function () {
      expect(function () {
        entitySpecification = new EntitySpecification({}, {}, {}, {});
      }).to.throw(AssertionError);

      expect(function () {
        entitySpecification = new EntitySpecification(function () {});
      }).to.throw(AssertionError);

      expect(function () {
        entitySpecification = new EntitySpecification({
          name: 'MyEntity',
          attributes: new attributes.AttributeDictionary({
            attribute1: attributes.Attribute.resolve('attribute1'),
            attribute2: attributes.Attribute.resolve('attribute2')
          }),
          methods: new methods.MethodDictionary({
            method1: function () { return 'method1'; },
            method2: function () { return 'method2'; }
          }),
          isAbstract: true,
          dataName: 'MyEntity',
          doesNotExist: null
        });
      }).to.throw(AssertionError);

      expect(function () {
        entitySpecification = new EntitySpecification({
          name: 'MyEntity',
          attributes: function () {},
          methods: new methods.MethodDictionary({
            method1: function () { return 'method1'; },
            method2: function () { return 'method2'; }
          })
        });
      }).to.throw(AssertionError);

      expect(function () {
        entitySpecification = new EntitySpecification({
          name: 'MyEntity',
          attributes: new attributes.AttributeDictionary({
            attribute1: attributes.Attribute.resolve('attribute1'),
            attribute2: attributes.Attribute.resolve('attribute2')
          }),
          methods: function () {}
        });
      }).to.throw(AssertionError);

      expect(function () {
        entitySpecification = new EntitySpecification(
          'MyEntity',
          function () {},
          new methods.MethodDictionary({
            method1: function () { return 'method1'; },
            method2: function () { return 'method2'; }
          })
        );
      }).to.throw(AssertionError);

      expect(function () {
        entitySpecification = new EntitySpecification(
          'MyEntity',
          new attributes.AttributeDictionary({
            attribute1: attributes.Attribute.resolve('attribute1'),
            attribute2: attributes.Attribute.resolve('attribute2')
          }),
          function () {}
        );
      }).to.throw(AssertionError);

      expect(function () {
        entitySpecification = new EntitySpecification({
          name: 'MyEntity',
          attributes: new attributes.AttributeDictionary({
            attribute1: attributes.Attribute.resolve('attribute1'),
            attribute2: attributes.Attribute.resolve('attribute2')
          }),
          methods: new methods.MethodDictionary({
            method1: function () { return 'method1'; },
            method2: function () { return 'method2'; }
          }),
          isAbstract: {},
          dataName: 'MyEntity'
        });
      }).to.throw(AssertionError);

      expect(function () {
        entitySpecification = new EntitySpecification({
          name: 'MyEntity',
          attributes: new attributes.AttributeDictionary({
            attribute1: attributes.Attribute.resolve('attribute1'),
            attribute2: attributes.Attribute.resolve('attribute2')
          }),
          methods: new methods.MethodDictionary({
            method1: function () { return 'method1'; },
            method2: function () { return 'method2'; }
          }),
          isAbstract: false,
          dataName: function () {}
        });
      }).to.throw(AssertionError);
    });
  });

  context('functional tests', function () {
    it('expect to have all properties storing the right values', function () {
      expect(entitySpecification.attributes.attribute1.name)
        .to.equal('attribute1');

      expect(entitySpecification.attributes.attribute2.name)
        .to.equal('attribute2');

      expect(entitySpecification.methods.method1())
        .to.equal('method1');

      expect(entitySpecification.methods.method2())
        .to.equal('method2');

      expect(entitySpecification.isAbstract)
        .to.equal(true);

      expect(entitySpecification.dataName)
        .to.deep.equal({
          default: 'MyEntity'
        });
    });

    it('expect to be not extensible', function () {
      expect(Object.isExtensible(entitySpecification)).to.equal(false);

      expect(function () {
        entitySpecification.doesNotExist = {};
      }).to.throw(TypeError);

      expect(entitySpecification).to.not.respondTo('doesNotExist');
    });

    it('expect to not allow to delete property', function () {
      expect(function () {
        delete entitySpecification.attributes;
      }).to.throw(Error);

      expect(entitySpecification).to.have.property('attributes');

      expect(function () {
        delete entitySpecification.methods;
      }).to.throw(Error);

      expect(entitySpecification).to.have.property('methods');

      expect(function () {
        delete entitySpecification.isAbstract;
      }).to.throw(Error);

      expect(entitySpecification).to.have.property('isAbstract');

      expect(function () {
        delete entitySpecification.dataName;
      }).to.throw(Error);

      expect(entitySpecification).to.have.property('dataName');
    });

    it('expect to not allow to change property', function () {
      expect(function () {
        entitySpecification.attributes = {};
      }).to.throw(Error);

      expect(entitySpecification.attributes.attribute1.name)
        .to.equal('attribute1');

      expect(function () {
        entitySpecification.methods = {};
      }).to.throw(Error);

      expect(entitySpecification.methods.method2())
        .to.equal('method2');

      expect(function () {
        entitySpecification.isAbstract = false;
      }).to.throw(Error);

      expect(entitySpecification.isAbstract)
        .to.equal(true);

      expect(function () {
        entitySpecification.dataName = 'MyDataName';
      }).to.throw(Error);

      expect(entitySpecification.dataName)
        .to.deep.equal({
          default: 'MyEntity'
        });
    });
  });

  describe('#Entity', function () {
    it('expect to exist and be set', function () {
      var MyEntity = function () {};

      classes.generalize(Entity, MyEntity);

      MyEntity.specification = entitySpecification;

      entitySpecification.Entity = MyEntity;

      expect(entitySpecification.Entity).to.equal(MyEntity);

      expect(MyEntity.specification).to.equal(entitySpecification);
    });

    it(
      'expect to not work with classes that are not an Entity specification',
      function () {
        var MyEntity = function () {};

        //classes.generalize(Entity, MyEntity);

        var myEntitySpecification = new EntitySpecification('MyEntity');

        MyEntity.specification = myEntitySpecification;

        expect(function () {
          myEntitySpecification.Entity = MyEntity;
        }).to.throw(AssertionError);
      }
    );

    it(
      'expect to not work with classes that has a different specification',
      function () {
        var MyEntity = function () {};

        classes.generalize(Entity, MyEntity);

        var myEntitySpecification = new EntitySpecification('MyEntity');

        //MyEntity.specification = myEntitySpecification;

        expect(function () {
          myEntitySpecification.Entity = MyEntity;
        }).to.throw(AssertionError);
      }
    );

    it(
      'expect to contain the right value after Entity initialization',
      function () {
        var myEntitySpecification = new EntitySpecification('MyEntity');

        var MyEntity = Entity.specify(myEntitySpecification);

        expect(myEntitySpecification.Entity).to.equal(MyEntity);

        expect(MyEntity.specification).to.equal(myEntitySpecification);
      }
    );
  });

  describe('#addAttribute', function () {
    it(
      'expect to work with right arguments and have specified behavior',
      function () {
        entitySpecification.addAttribute(
          new attributeTypes.BooleanAttribute('attribute3')
        );

        entitySpecification.addAttribute(
          'attribute4'
        );

        entitySpecification.addAttribute({
          name: 'attribute5'
        });

        expect(Object.keys(entitySpecification.attributes))
          .to.deep.equal([
            'attribute1',
            'attribute2',
            'attribute3',
            'attribute4',
            'attribute5']
        );

        expect(entitySpecification.attributes.attribute1.name)
          .to.equal('attribute1');
        expect(entitySpecification.attributes.attribute2.name)
          .to.equal('attribute2');
        expect(entitySpecification.attributes.attribute3.name)
          .to.equal('attribute3');
      }
    );
  });

  describe('#addMethod', function () {
    it(
      'expect to work with right arguments and have specified behavior',
      function () {
        entitySpecification.addMethod(
          function () { return 'method3'; },
          'method3'
        );

        expect(Object.keys(entitySpecification.methods))
          .to.deep.equal(['method1', 'method2', 'method3']);

        expect(entitySpecification.methods.method1())
          .to.equal('method1');
        expect(entitySpecification.methods.method2())
          .to.equal('method2');
        expect(entitySpecification.methods.method3())
          .to.equal('method3');
      }
    );
  });

  context('loading members tests', function () {
    var MyEntity;
    var MyEntity2;
    var MyEntity3;

    it(
      'expect to not allow attribute with same name of an existing method',
      function () {
        MyEntity = Entity.specify(
          'MyEntity12',
          entitySpecification.attributes,
          entitySpecification.methods
        );

        expect(function () {
          MyEntity.specification.addAttribute('method3');
        }).to.throw(AssertionError);

        expect(function () {
          Entity.specify({
            name: 'MyEntity60',
            attributes: {
              attribute1: {}
            },
            methods: {
              attribute1: function () {}
            }
          });
        }).to.throw(AssertionError);
      }
    );

    it(
      'expect to not allow attribute with same name of an ancestral attribute',
      function () {
        MyEntity2 = MyEntity.specify(
          'MyEntity16',
          {
            attribute21: {}
          },
          {
            method21: function () { return 'method21'; }
          }
        );
        MyEntity3 = MyEntity2.specify(
          'MyEntity17',
          {
            attribute31: {}
          },
          {
            method31: function () { return 'method31'; }
          }
        );

        expect(function () {
          MyEntity2.specification.addAttribute('attribute1');
        }).to.throw(AssertionError);

        expect(function () {
          MyEntity3.specification.addAttribute('attribute1');
        }).to.throw(AssertionError);

        expect(function () {
          MyEntity3.specify({
            name: 'MyEntity18',
            attributes: {
              attribute1: {}
            }
          });
        }).to.throw(AssertionError);
      }
    );

    it(
      'expect to not allow attribute with same name of a descendant attribute',
      function () {
        expect(function () {
          MyEntity.specification.addAttribute('attribute21');
        }).to.throw(AssertionError);

        expect(function () {
          MyEntity.specification.addAttribute('attribute31');
        }).to.throw(AssertionError);

        expect(function () {
          MyEntity2.specification.addAttribute('attribute31');
        }).to.throw(AssertionError);
      }
    );

    it(
      'expect to not allow attribute with same name of an ancestral method',
      function () {
        expect(function () {
          MyEntity2.specification.addAttribute('method1');
        }).to.throw(AssertionError);

        expect(function () {
          MyEntity3.specification.addAttribute('method1');
        }).to.throw(AssertionError);

        expect(function () {
          MyEntity3.specify({
            name: 'MyEntity',
            attributes: {
              method1: {}
            }
          });
        }).to.throw(AssertionError);
      }
    );

    it(
      'expect to not allow attribute with same name of a descendant method',
      function () {
        expect(function () {
          MyEntity.specification.addAttribute('method21');
        }).to.throw(AssertionError);

        expect(function () {
          MyEntity.specification.addAttribute('method31');
        }).to.throw(AssertionError);

        expect(function () {
          MyEntity2.specification.addAttribute('method31');
        }).to.throw(AssertionError);
      }
    );

    it(
      'expect to not allow method with same name of an existing attribute',
      function () {
        expect(function () {
          MyEntity.specification.addMethod(function () {}, 'attribute1');
        }).to.throw(AssertionError);
      }
    );

    it(
      'expect to not allow method with same name of an ancestral attribute',
      function () {
        expect(function () {
          MyEntity2.specification.addMethod(function () {}, 'attribute1');
        }).to.throw(AssertionError);

        expect(function () {
          MyEntity3.specification.addMethod(function () {}, 'attribute1');
        }).to.throw(AssertionError);

        expect(function () {
          MyEntity3.specify({
            name: 'MyEntity',
            methods: {
              attribute1: function () {}
            }
          });
        }).to.throw(AssertionError);
      }
    );

    it(
      'expect to not allow method with same name of a descendant attribute',
      function () {
        expect(function () {
          MyEntity.specification.addMethod('attribute21');
        }).to.throw(AssertionError);

        expect(function () {
          MyEntity.specification.addMethod('attribute31');
        }).to.throw(AssertionError);

        expect(function () {
          MyEntity2.specification.addMethod('attribute31');
        }).to.throw(AssertionError);
      }
    );

    it(
      'expect to allow method with same name of ancestral or descendant method',
      function () {
        MyEntity.specification.addMethod(
          function () { return 'method21'; },
          'method21'
        );

        MyEntity.specification.addMethod(
          function () { return 'method31'; },
          'method31'
        );

        MyEntity2.specification.addMethod(
          function () { return 'method3'; },
          'method3'
        );

        MyEntity2.specification.addMethod(
          function () { return 'method31'; },
          'method31'
        );

        MyEntity3.specification.addMethod(
          function () { return 'method3'; },
          'method3'
        );

        MyEntity3.specification.addMethod(
          function () { return 'method21'; },
          'method21'
        );
      }
    );

    it('expect to load methods in the Entity prototype', function () {
      expect(MyEntity.prototype).to.respondTo('method1');
      expect(MyEntity.prototype.method1.call(null)).to.equal('method1');

      expect(MyEntity.prototype).to.respondTo('method3');
      expect(MyEntity.prototype.method3.call(null)).to.equal('method3');

      expect(MyEntity2.prototype).to.respondTo('method21');
      expect(MyEntity2.prototype.method21.call(null)).to.equal('method21');

      expect(MyEntity3.prototype).to.respondTo('method31');
      expect(MyEntity3.prototype.method31.call(null)).to.equal('method31');
    });

    it('expect to not work if adapter send error on load entity', function () {
      var loadEntityFunction = settings.ADAPTERS.default.loadEntity;
      settings.ADAPTERS.default.loadEntity = function () {
        throw new Error();
      };

      expect(function () {
        Entity.specify('MyEntity70');
      }).to.throw(Error);

      settings.ADAPTERS.default.loadEntity = loadEntityFunction;
    });

    it(
      'expect to not work if adapter send error on load attribute',
      function () {
        var loadEntityAttributeFunction =
          settings.ADAPTERS.default.loadEntityAttribute;
        settings.ADAPTERS.default.loadEntityAttribute = function () {
          throw new Error();
        };

        expect(function () {
          Entity.specify(
            'MyEntity80',
            {
              a1: {}
            }
          );
        }).to.throw(Error);

        settings.ADAPTERS.default.loadEntityAttribute =
          loadEntityAttributeFunction;
      }
    );
  });
});
