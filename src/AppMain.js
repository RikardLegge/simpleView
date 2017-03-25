import domTemplate from "./domTemplate";
import viewTemplate from "./viewTemplate";
import EventSource from "./EventSource";
import click from "./attributes/click";
import write from "./attributes/write";
import edit from "./attributes/edit";

class ExampleView extends domTemplate`
  <div>
    <button ${click('add')}></button>
  </div>
  <div ${write('title')}>test text</div>
  <input ${edit('title')}>
` {
}

class ExampleComposite extends viewTemplate`
  <example-view></example-view>
` {
}

const exampleModel = {
  __title : 'hello',
  get title(){return this.__title},
  set title(value){
    const oldValue = this.__title;
    this.__title = value;
    this.changed.dispatch('title', value, oldValue);
  },
  changed: new EventSource()
};

const composite = new ExampleComposite({
  exampleView: new ExampleView({
    signal: {add: () => exampleModel.title = ''},
    model: exampleModel
  })
});

const el = composite.options.exampleView.element;
document.body.appendChild(el);

