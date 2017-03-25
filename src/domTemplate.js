import EventSource from "./EventSource";
import voidFunc from "./voidFunc";
import Template from "./Template";

export default function domTemplate(templateArray, ...attributeBuilders) {
  const template = new Template(templateArray, attributeBuilders);

  return class {
    constructor(options) {
      this.model = options.model;

      const attributes = attributeBuilders.map(attributeBuilder => attributeBuilder.create(this));
      this.element = template.createElement(attributes);
      this.signal = this.createSignalSource(options.signal);
    }

    createSignalSource(signalMap = {}) {
      const signal = new EventSource();
      signal.on(event => {
        const signalHandler = signalMap[event] || voidFunc;
        signalHandler();
      });
      return signal;
    }
  };
}
