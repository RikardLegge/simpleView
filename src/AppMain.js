import domTemplate from "./domTemplate";
import viewTemplate from "./viewTemplate";
import write from "./attributes/write";
import edit from "./attributes/edit";
import child from "./attributes/child";
import * as Model from "./Model";
import {Property} from "./Property";
import AddButton from "./primitive-views/AddButton";

function uppercase(value) {
  return value.toUpperCase();
}

class ExampleView extends domTemplate`
  ${child(new AddButton())}
  <div ${write('title', {transform: uppercase})}></div>
  <input ${edit('title')}>
` {
}

class ExampleComposite extends viewTemplate`
  <example-view></example-view>
` {
}

class ExampleModel extends Model.define({
  title: new Property(),
  login: new Property({
    get() { return 'hej'; },
    set(value) { this[Property.set]('title', value); }
  })
}) {
  constructor(){
    super();
    this.title = 'default title';
  }
}

const exampleModel = new ExampleModel();
const composite = new ExampleComposite({
  exampleView: new ExampleView({
    signal: {add() { exampleModel.title = ''}},
    model: exampleModel
  })
});

const el = composite.options.exampleView.element;
document.body.appendChild(el);

