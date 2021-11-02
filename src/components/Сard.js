export default class Card{

  constructor(cardSelector, data, userId, handleCardClick, handleRemoveCardClick, api){
    this.cardSelector = cardSelector;
    this.handleCardClick = handleCardClick;
    this._handleRemoveCardClick = handleRemoveCardClick;
    this._api = api;
    this._userId = userId;
    this._data = data;
  }

  _getTemplate(){
    const cardElement = document.getElementById(this.cardSelector).content
    .querySelector('.element')
    .cloneNode(true);
    // вернём DOM-элемент карточки
    return cardElement;
  }

  _changeLikeCount(target, count){
    const scount = count > 0 ? count : '';
    target.querySelector('.element__like-counter').textContent = scount;
  }

  createCard() {
    this._element = this._getTemplate();
    //Image
    const image = this._element.querySelector('.element__image');
    //Values
    image.setAttribute('src', this._data.link);
    image.setAttribute('alt', `Изображение ${this._data.name}`);
    this._element.setAttribute("id", this._data._id);
    //caption
    this._element.querySelector('.element__title').textContent = this._data.name;

    //Likes count
    this._changeLikeCount(this._element, this._data.likes.length);

    const hasLike = this._data.likes.map((item)=>{
      return item._id == this._userId;
    }).includes(true);
    if(hasLike){
      this._element.querySelector('.element__like').classList.toggle('element__like_checked');
    }

    //Remove item
    if (this._data.owner._id !== this._userId) {
      this._element.querySelector('.element__remove')
          .classList.add('element__remove_hidden');
    }

    this._setEventListeners(this._data, this._api);
    return this._element;
  }


  _handleLikeChecking(event, api) {
    const element = event.target.closest('.element');

    if(!event.target.classList.contains('element__like_checked')){
      api.putLike(element.id, 'PUT')
                .then(res => {
                  this._changeLikeCount(element, res.likes.length);
                  this._toggleLike(event);
                })
                .catch(res => { console.log(res) })
    }
    else{
      api.putLike(element.id, 'DELETE')
                .then(res => {
                  this._changeLikeCount(element, res.likes.length);
                  this._toggleLike(event);
                })
                .catch(res => { console.log(res) })
    }
  }

  _toggleLike(event) {
    event.target.classList.toggle('element__like_checked');
  }

  _setEventListeners(data, api) {
    //Events
    //обработчик нажания кнопки remove
    this._element.querySelector('.element__remove').addEventListener(
      'click',
      this._handleRemoveCardClick
    );

    //обработчик нажания кнопки like
    this._element.querySelector('.element__like').addEventListener(
      'click',
      (event)=>{this._handleLikeChecking(event, api)}
    );

    //Нажатие на картинку
    if(typeof this.handleCardClick !== 'undefined'){
      this._element.querySelector('.element__image').addEventListener(
        'click',
        () => {
          this.handleCardClick(data.link, data.name);
        }
      );
    }
  }

}
