export default class FormValidator{
  constructor(config, formSelector){
    this._formSelector = formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;

    this._formElement = document.getElementById(this._formSelector);
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }

  _showInputError(inputElement, errorElement){
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage; //Сначала наполним
    errorElement.classList.add(this._errorClass);//потом показываем
  };

  _hideInputError(inputElement, errorElement){
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);//удаляем класс
    errorElement.textContent = ""; //стираем значение
  };

  _hasInvalidInput(){
    return this._inputList.some(inputElement =>{
      return !inputElement.validity.valid;
    });
  };

  _hasEmptyInput(){
    return this._inputList.some(inputElement =>{
      return inputElement.value.length === 0;
    });
  };

  _disableSubmitButton(){
    if(!this._buttonElement.classList.contains(this._inactiveButtonClass))
      this._buttonElement.classList.add(this._inactiveButtonClass);
  };

  _enableSubmitButton(){
    this._buttonElement.classList.remove(this._inactiveButtonClass);
  };

  _checkInputValidity(inputElement){
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    if(!inputElement.validity.valid){
      this._showInputError(inputElement, errorElement);
    }
    else{
      this._hideInputError(inputElement, errorElement);
    }
  };

  _toggleButtonState(){
    if(this._hasInvalidInput(this._inputList) || this._hasEmptyInput(this._inputList)){
      this._disableSubmitButton();
    }else{
      this._enableSubmitButton();
    }
  };

  _setEventListeners(){
    this._inputList.forEach(inputElement =>{
      inputElement.addEventListener('input', ()=>{
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });

    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    this._toggleButtonState();
  }

  enableValidation(){
    this._setEventListeners();
  }

}
