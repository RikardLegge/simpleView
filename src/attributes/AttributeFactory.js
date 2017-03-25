export default class AttributeFactory {
  constructor(name, generator) {
    this.name = name;
    this.id = Math.random();
    this.generator = generator;
  }

  create(...args) {
    return this.generator(this.id, ...args);
  }

  substitute() {
    return ` data-${this.name}=${this.id}`;
  }

  resolveNode(element) {
    const node = element.querySelector(`[data-${this.name}="${this.id}"]`);
    node.attributes.removeNamedItem(`data-${this.name}`);
    return node;
  }

  isChild(attribute) {
    return attribute.id === this.id;
  }
}