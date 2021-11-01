export default class Card{

  constructor(cardSelector, handleCardClick, handleRemoveCardClick, api){
    this.cardSelector = cardSelector;
    this.handleCardClick = handleCardClick;
    this._handleRemoveCardClick = handleRemoveCardClick;
    this._api = api;
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

  createCard(data) {
    this._element = this._getTemplate();
    //Image
    const image = this._element.querySelector('.element__image');
    //Values
    image.setAttribute('src', data.link);
    image.setAttribute('alt', `Изображение ${data.name}`);
    this._element.setAttribute("id", data._id);
    //caption
    this._element.querySelector('.element__title').textContent = data.name;

    //Likes count
    this._changeLikeCount(this._element, data.likes.length);

    //Remove item
    if (data.owner.name !== document.querySelector('.profile__name').textContent) {
      this._element.querySelector('.element__remove')
          .classList.add('element__remove_hidden');
    }

    this._setEventListeners(data, this._api);
    return this._element;
  }


  _handleLikeChecking(event, api) {

    event.target.classList.toggle('element__like_checked');

    const element = event.target.closest('.element');

    if(event.target.classList.contains('element__like_checked')){
      api.putLike(element.id, 'PUT')
                .then(res => {
                  this._changeLikeCount(element, res.likes.length);
                })
                .catch(res => { console.log(res) })
    }
    else{
      api.putLike(element.id, 'DELETE')
                .then(res => {
                  this._changeLikeCount(element, res.likes.length);
                })
                .catch(res => { console.log(res) })
    }


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
