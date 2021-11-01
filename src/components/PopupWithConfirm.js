import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup{
  constructor(popupSelector, api){
    super(popupSelector);
    this._popupSelector = popupSelector;
    this._api = api;
  }

  open(element){
    super.open();
    this._element = element;
  }

  _handleSubmit(event, element){
    event.preventDefault();
        this._api.deleteCard(this._element.id)
          .then(res => {
            if (res) {
              this._element.remove(this._element);
            }
          })
          .catch((err) => {
            console.log(err); // выведем ошибку в консоль
          })
          .finally(
            ()=>{
              this.close()
            }
          )
  }

  setEventListeners(){
    super.setEventListeners();
    this._popupSelector.addEventListener('submit', (el) => {this._handleSubmit(el)});
  }


}
