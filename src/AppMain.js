import domTemplate from "./domTemplate";
import viewTemplate from "./viewTemplate";
import click from "./attributes/click";
import write from "./attributes/write";
import edit from "./attributes/edit";
import * as Model from "./Model";
import Property from "./Property";

function uppercase(value) {
  return value.toUpperCase();
}

class ExampleView extends domTemplate`
  <div>
    <button ${click('add')}></button>
  </div>
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
    set(value) { this[Model.set]('title', value); }
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
    signal: {add: () => exampleModel.title = ''},
    model: exampleModel
  })
});

const el = composite.options.exampleView.element;
document.body.appendChild(el);

