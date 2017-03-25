import * as Model from "./Model";

function defaultSet(propertyName, value) {
  return this[Model.set](propertyName, value);
}

function defaultGet(propertyName) {
  return this[Model.get](propertyName);
}

export default class Property {
  constructor(desc={get: defaultGet, set: defaultSet}) {
    this.desc = desc;
  }

  attachTo(model, propertyName) {
    const get = this.desc.get && (()=>this.desc.get.call(model, propertyName));
    const set = this.desc.set && ((value)=>this.desc.set.call(model, propertyName, value));
    Object.defineProperty(model, propertyName, {
      get: get || undefined,
      set: set || undefined
    });
  }
}