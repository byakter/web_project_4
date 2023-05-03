export class Section {
  constructor({ items, renderer }, containerSelector) {
    this.items = items;
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }
  addItem(element) {
    this._container.prepend(element);
  }

  render() {
    this.items.forEach((data) => {
      this._renderer(data);
    });
  }
  
  appendItem(element) {
    this._container.append(element);
  }

}
