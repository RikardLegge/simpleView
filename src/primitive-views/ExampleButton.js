import click from "../attributes/click";
import write from "../attributes/write";
import domTemplate from "../domTemplate";

export default class ExampleButton extends domTemplate`
  <div>
    <button ${write('text')} ${click('triggered')}></button>
  </div>
` {
  constructor(signalName, options={}) {
    const signalOverwrite = {signal: {triggered: ()=>this.onSignal()}};
    
    options = Object.assign(options, signalOverwrite);
    super(options);
    this.signalName = signalName;
  }

  onSignal() {
    this.parent.signal.dispatch(this.signalName);
  }
}