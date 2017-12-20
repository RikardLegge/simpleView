import AttributeFactory from "./AttributeFactory";
import Attribute from "./Attribute";

export default function edit(key, {} = {}) {
  return new AttributeFactory('edit', (id, view)=>{
    const attribute = new EditAttribute(getValue, setValue);
    attribute.setId(id);
    
    view.context.model.changed.on((prop)=>prop === key && attribute.refresh());
    return attribute;

    function getValue() {
      return view.context.model[key];
    }
    function setValue(value) {
      return view.context.model[key] = value;
    }
  });
}

class EditAttribute extends Attribute {
  constructor(getValue, setValue) {
    super();
    this.onChange = ()=>setValue(this.element.value);
    this.getValue = getValue;
  }

  onAttach() {
    this.element.addEventListener('input', this.onChange);
    this.refresh();
  }

  onDetach() {
    this.element.removeEventListener('input', this.onChange);
  }

  refresh() {
    this.element.value = this.getValue();
  }
}