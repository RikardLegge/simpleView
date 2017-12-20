import ExampleButton from "./ExampleButton";

export default class AddButton extends ExampleButton {
  constructor(signalName, text) {
    super(
      {signalMap: {triggered: signalName}},
      {dataMap: {text: text}}
      );
  }
}