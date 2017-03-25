export default class Attribute {
  constructor() {
    this.id = null;
    this.element = null;
  }
  
  setId(id) {
    this.id = id;
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