import EventSource from "./EventSource";
import voidFunc from "./voidFunc";
import Template from "./Template";

export default function domTemplate(templateArray, ...attributeBuilders) {
  const template = new Template(templateArray, attributeBuilders);

  return class {
    constructor(options = {}) {
      this.signalMap = options.signal || {};
      this.dataMap = options.dataMap || {};
      this.context = options.context || new DomContext({model: options.model});

      const attributes = attributeBuilders.map(attributeBuilder => attributeBuilder.create(this));
      this.element = template.createElement(attributes);
      
      this.attachSignalSource(this.signalMap);
    }

    attachSignalSource(signalMap = {}) {
      this.context.signal.on(event => {
        const signalHandler = signalMap[event] || voidFunc;
        signalHandler();
      });
    }

  };
}

class DomContext {
  constructor(options = {}) {
    this.model = options.model;
    this.signal = new EventSource();
  }
}