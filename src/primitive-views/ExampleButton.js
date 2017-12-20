import click from "../attributes/click";
import write from "../attributes/write";
import domTemplate from "../domTemplate";

export default class ExampleButton extends domTemplate`
  <div>
    <button ${write('text')} ${click('triggered')}></button>
  </div>
` { }