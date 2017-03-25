import AttributeFactory from "./AttributeFactory";
import Attribute from "./Attribute";

export default function write(key, options = {}) {
  return new AttributeFactory('write', (id, view)=>{
    options.id = id;
    const attribute = new WriteAttribute(getValue, options);
    view.model.changed.on((prop)=>prop === key && attribute.refresh());
    return attribute;

    function getValue() {
      return view.model[key];
    }
  });
}

class WriteAttribute extends Attribute {
  constructor(getValue, options) {
    super(options);
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