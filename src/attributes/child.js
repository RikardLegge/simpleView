import ValueElement from "./ValueElement";
import ValueElementFactory from "./ValueElementFactory";

export default function child(elementView, {}={}) {

  return new ValueElementFactory('child', (id, view)=>{
    const value = new ChildElement(elementView, view);
    value.setId(id);

    elementView.context = view.context;

    return value;
  });
}

class ChildElement extends ValueElement {
  constructor(elementView) {
    super(elementView.element);
  }
}
