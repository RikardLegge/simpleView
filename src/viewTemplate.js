export default function viewTemplate(template, ...values) {
  return function ViewTemplate(options) {
    this.options = options;
  };
}