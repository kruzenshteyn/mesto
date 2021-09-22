const showInputError = (inputElement, errorElement, inputErrorClass, errorClass)=>{
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage; //Сначала наполним
  errorElement.classList.add(errorClass);//потом показываем
};

const hideInputError = (inputElement, errorElement, inputErrorClass, errorClass)=>{
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);//удаляем класс
  errorElement.textContent = ""; //стираем значение
};

const hasInvalidInput = (inputList) =>{
  return inputList.some(inputElement =>{
    return !inputElement.validity.valid;
  });
};

const hasNoInvalidInput = (inputList) =>{
  return inputList.some(inputElement =>{
    return inputElement.value.lenght === 0;
  });
};

let counter = 0;
const disableSubmitButton = (buttonElement, inactiveButtonClass) =>{
  if(!buttonElement.classList.contains(inactiveButtonClass))
    buttonElement.classList.add(inactiveButtonClass);
  //console.log(`buttonElement disabled is ${buttonElement.classList.contains(inactiveButtonClass)} in ${counter} iteration`);
};

const enableSubmitButton = (buttonElement, inactiveButtonClass) =>{
  buttonElement.classList.remove(inactiveButtonClass);
};

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass)=>{
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  if(!inputElement.validity.valid){
    showInputError(inputElement, errorElement, inputErrorClass, errorClass);
  }
  else{
    hideInputError(inputElement, errorElement, inputErrorClass, errorClass);
  }
};

const toggleButtonState = (buttonElement, inputList, inactiveButtonClass)=>{
  if(hasInvalidInput(inputList) || hasNoInvalidInput(inputList)){
    disableSubmitButton(buttonElement, inactiveButtonClass);
  }else{
    enableSubmitButton(buttonElement, inactiveButtonClass);
  }
};

const setEventListeners = (formElement, config)=>{
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

  inputList.forEach(inputElement =>{
    inputElement.addEventListener('input', ()=>{
      checkInputValidity(formElement, inputElement, config.inputErrorClass, config.errorClass);
      toggleButtonState(buttonElement, inputList, config.inactiveButtonClass);
    });
  });

  formElement.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  toggleButtonState(buttonElement, inputList, config.inactiveButtonClass);
}

const enableValidation = (config) =>{
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach(formElement =>{
      setEventListeners(
        formElement, config);
  });
}


