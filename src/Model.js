import EventSource from "./EventSource";
import * as Property from "./Property";

const properties = Symbol('Model.properties');

export class Model {
  constructor() {
    Object.defineProperty(this, 'changed', {
      enumerable: true,
      writable: false,
      value: new EventSource()
    });
    this[properties] = {};
  }

  [Property.get](key) {
    return this[properties][key];
  }

  [Property.set](key, value) {
    const oldValue = this[properties][key];
    this[properties][key] = value;
    this.changed.dispatch(key, value, oldValue);
    return value;
  }
}

export function define(properties) {
  const propEntries = Object.entries(properties);

  function ModelInstance() {
    propEntries
      .forEach(([key, property])=>{
        property.attachTo(this, key);
      });

    const model = new Model();
    this.__proto__ = model;
  }

  return ModelInstance;
}

export function simple(keyValues) {
  const definition = Object.keys(keyValues).reduce((acc, key) =>{
    acc[key] = new Property.Property();
    return acc;
  }, {});

  return new class extends define(definition) {
    constructor(){
      super();
      Object.entries(keyValues).forEach(([key, value])=>{
        this[key] = value;
      });
    }
  }
}
