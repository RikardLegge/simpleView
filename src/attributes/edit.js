import AttributeFactory from "./AttributeFactory";
import Attribute from "./Attribute";

export default function edit(key, options = {}) {
  return new AttributeFactory('edit', (id, view)=>{
    options.id = id;
    const attribute = new EditAttribute(getValue, setValue, options);
    view.model.changed.on((prop)=>prop === key && attribute.refresh());
    return attribute;

    function getValue() {
      return view.model[key];
    }
    function setValue(value) {
      return view.model[key] = value;
    }
  });
}

class EditAttribute extends Attribute {
  constructor(getValue, setValue, options) {
    super(options);
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