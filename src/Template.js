export default class Template {
  constructor(templateArray, attributeBuilders) {
    this.attributeBuilders = attributeBuilders;
    this.templateElement = Template.createTemplateElement(templateArray, attributeBuilders);
  }

  createElement(attributes) {
    const element = document.importNode(this.templateElement, true);

    this.attributeBuilders.forEach(attributeBuilder => {
      const node = attributeBuilder.resolveNode(element);
      const attribute = attributes.find((attr)=>attributeBuilder.isChild(attr));
      attribute.attachTo(node);
    });

    return element;
  }

  static createTemplateElement(templateArray, attributeBuilders) {
    const template = templateArray.reduce((acc, arr, i) => {
      acc += arr;

      const isLast = templateArray.length - 1 <= i;
      if (!isLast) {
        const attributeBuilder = attributeBuilders[i];
        acc += attributeBuilder.substitute();
      }

      return acc;
    }, '');

    return Template.htmlToElements(template);
  }


  static htmlToElements(html) {
    const template = document.createElement('div');
    template.innerHTML = html;
    return template;
  }
}
