export default class ValueElement {
  constructor(element) {
    this.id = null;
    this.element = element;
    this.placeholder = null;
  }

  setId(id) {
    this.id = id;
  }

  attachTo(placeholder) {
    this.detach();
    this.placeholder = placeholder;
    this.placeholder.parentNode.replaceChild(this.element, this.placeholder);
    this.onAttach();
  }

  detach() {
    if(this.placeholder) {
      this.onDetach(this.placeholder);
      this.element.parentNode.replaceChild(this.placeholder, this.element);
    }
  }

  onAttach(){}
  onDetach(){}
}