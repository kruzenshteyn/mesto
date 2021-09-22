export default class Card{

  constructor(data, cardSelector){
    this.cardSelector = cardSelector;
    this._about = data.about;
    this._link = data.link;
  }

  _getTemplate(){
    const cardElement = document.getElementById(this.cardSelector).content
    .querySelector('.element')
    .cloneNode(true);
    // вернём DOM-элемент карточки
    return cardElement;
  }

  createCard() {
    this.element = this._getTemplate();
    const image = this.element.querySelector('.element__image');
    //Values
    image.setAttribute('src', this._link);
    image.setAttribute('alt', `Изображение ${this._about}`);
    this.element.querySelector('.element__title').textContent = this._about;
    this._setEventListeners();
    return this.element;
  }

  _handleRemoveCard(e) {
    e.target.closest('.element').remove();
  }

  _handleLikeChecking(e) {
    e.target.classList.toggle('element__like_checked');
  }

  _setEventListeners() {
    //Events
    //обработчик нажания кнопки like
    this.element.querySelector('.element__remove').addEventListener(
      'click',
      this._handleRemoveCard
    );
    //обработчик нажания кнопки remove
    this.element.querySelector('.element__like').addEventListener(
      'click',
      this._handleLikeChecking
    );
  }

}
