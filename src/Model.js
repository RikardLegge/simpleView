import EventSource from "./EventSource";

const properties = Symbol('Model.properties');
export const set = Symbol('Model.set');
export const get = Symbol('Model.get');

export class Model {
  constructor() {
    Object.defineProperty(this, 'changed', {
      enumerable: true,
      writable: false,
      value: new EventSource()
    });
    this[properties] = {};
  }

  [get](key) {
    return this[properties][key];
  }

  [set](key, value) {
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