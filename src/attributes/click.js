import AttributeFactory from "./AttributeFactory";
import Attribute from "./Attribute";

export default function click(signal, {}={}) {

  return new AttributeFactory('click', (id, view)=>{
    const attribute = new ClickEventListener(onClick);
    attribute.setId(id);

    return attribute;

    function onClick() {
      view.signal.dispatch(signal);
    }
  });
}

class ClickEventListener extends Attribute {
  constructor(onClick) {
    super();
    this.onClick = onClick;
  }

  onAttach() {
    this.element.addEventListener('click', this.onClick)
  }

  onDetach() {
    this.element.removeEventListener('click', this.onClick);
  }
}