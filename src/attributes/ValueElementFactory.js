export default class ValueElementFactory {
  constructor(name, generator) {
    this.name = name;
    this.id = Math.random();
    this.generator = generator;
  }

  create(...args) {
    return this.generator(this.id, ...args);
  }

  getSelector() {
    return `placeholder-${this.name}-${this.id.toString().replace('.','_')}`;
  }

  substitute() {
    const type = this.getSelector();
    return `<${type}></${type}>`;
  }

  resolveNode(element) {
    const type = this.getSelector();
    const node = element.querySelector(type);
    return node;
  }

  isChild(value) {
    return value.id === this.id;
  }
}