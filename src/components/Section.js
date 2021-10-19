export default class Section{
  constructor({ data, renderer }, containerSelector) {
    this._initialArray = data;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  _clear(){
    this._container.innerHTML = '';
  }

  renderItems() {
    this._clear();
    this._initialArray.forEach(item => {
      this._renderer(item); // вызываем renderer, передав item
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderNewItem(item){
    this._renderer(item);
  }
}
