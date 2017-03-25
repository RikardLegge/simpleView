import AttributeFactory from "./AttributeFactory";
import Attribute from "./Attribute";

export default function click(signal, options={}) {

  return new AttributeFactory('click', (id, view)=>{
    options.id = id;

    return new ClickEventListener(onClick, options);
    function onClick() {
      view.signal.dispatch(signal);
    }
  });
}

class ClickEventListener extends Attribute {
  constructor(onClick, options) {
    super(options);
    this.onClick = onClick;
  }

  onAttach() {
    this.element.addEventListener('click', this.onClick)
  }

  onDetach() {
    this.element.removeEventListener('click', this.onClick);
  }
}