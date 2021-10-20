import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
  constructor(popupSelector, handleSubmit, disableSubmitButton){
    super(popupSelector);
    this._popupSelector = popupSelector;
    this._handleSubmit = handleSubmit;
    this._disableSubmitButton = disableSubmitButton;
    this._popupForm = this._popupSelector.querySelector('.popup__form');
  }

  _getInputValues(){
    this._inputValues = {};
    this._popupSelector.querySelectorAll('input').forEach(element => this._inputValues[element.name] = element.value);
    return this._inputValues;
  }

  setEventListeners(){
    this._popupSelector.addEventListener('submit', ()=>{this._handleSubmit(this._getInputValues())});
    super.setEventListeners();
  }

  close(){
    this._popupForm.reset();
    this._disableSubmitButton();
    super.close();
  }
}
