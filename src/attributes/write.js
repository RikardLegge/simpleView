import AttributeFactory from "./AttributeFactory";
import Attribute from "./Attribute";
import dito from "../dito";

export default function write(key, {
  transform = dito
} = {}) {
  return new AttributeFactory('write', (id, view)=>{
    const attribute = new WriteAttribute(getValue);
    attribute.setId(id);
    
    view.model.changed.on((prop)=>prop === key && attribute.refresh());
    return attribute;

    function getValue() {
      const value = view.model[key];
      return transform(value);
    }
  });
}

class WriteAttribute extends Attribute {
  constructor(getValue) {
    super();
    this.getValue = getValue;
  }

  onAttach(element) {
    this.refresh();
  }

  onDetach() {
    this.element.innerHTML = '';
  }

  refresh() {
    this.element.innerHTML = this.getValue();
  }
}