export default class EventSource {
  constructor() {
    this.listeners = [];
  }

  on(listener) {
    this.listeners.push(listener);
    return () => this.off(listener);
  }

  off(listener) {
    let i;
    while ((i = this.listeners.indexOf(listener)) >= 0) {
      this.listeners.splice(i, 1);
    }
  }

  dispatch(...args) {
    this.listeners.forEach(listener => listener(...args));
  }
}