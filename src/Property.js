export const set = Symbol('Property.set');
export const get = Symbol('Property.get');

function defaultSet(propertyName, value) {
  return this[set](propertyName, value);
}

function defaultGet(propertyName) {
  return this[get](propertyName);
}

export class Property {
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