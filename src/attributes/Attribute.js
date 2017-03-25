export default class Attribute {
  constructor(options) {
    this.id = options.id;
    this.element = null;
  }

  attachTo(element) {
    this.detach();
    this.element = element;
    this.onAttach();
  }

  detach() {
    if(this.element) {
      this.onDetach(this.element);
      this.element = null;
    }
  }

  onAttach(){}
  onDetach(){}
}