//Main container
const root = document.querySelector('.root');

//Cards
const elements = document.querySelector('.elements');
const elementTemplate = document.getElementById('#element').content;

//Загрузка изображений из массива
initialCards.forEach((item)=>{
  addElementToPage(item.link, item.name);
});

//Buttons
const btnEditProfile = document.querySelector('.profile__edit-button');
const btnAddElement = document.querySelector('.profile__add-button');

//Button Event Listeners
btnEditProfile.addEventListener('click', openPopupProfile);
btnAddElement.addEventListener('click', openPopupNewCard);

function openAnyPopup(sender) {
  sender.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByESC);
}

//Popups
function closeAnyPopup(sender){
  sender.closest('.popup').classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByESC);
}

const ESC_CODE = 'Escape';

//Popup close overlay
function closePopupOverlay(e) {
  if(e.target.classList.contains('popup')) {
    e.stopImmediatePropagation();
    e.stopPropagation();
    closeAnyPopup(this);
  }
}

function closeByESC(event) {
  if(event.key === ESC_CODE){
    event.preventDefault();
    //Ищем активный popup
    const activePopup = document.querySelector('.popup_is-opened');
    if(activePopup === null) return;
    closeAnyPopup(activePopup);
  }
}

//Popup-image
const imagePopup = document.querySelector('.image-popup');
const imagePopupLink = document.querySelector('.image-popup__image');
const imagePopupCaption = document.querySelector('.image-popup__caption');
const imagePopupBtnClose = document.getElementById('#image-popup__button');
//Добавим событие на кнопку закрытия popupImage
imagePopupBtnClose.addEventListener('click', ()=>{
  closeAnyPopup(imagePopupBtnClose);
});
//Закрытие по клику на оверлэй
imagePopup.addEventListener('mousedown', closePopupOverlay);



function openImagePopup(link, name){
  if(!imagePopup.classList.contains('popup_is-opened')){
    imagePopupLink.setAttribute('src', link);
    imagePopupCaption.textContent = name;
  }
  openAnyPopup(imagePopup);
}

//Popup profile
const popupProfile = document.getElementById('#popupProfile');
const popupProfileName = document.getElementById('name');
const popupProfileAbout = document.getElementById('about');
const popupProfileBtnSubmit = document.getElementById('#popupProfileSubmit');
const popupProfileForm = document.getElementById('#popupProfileForm');
const popupProfileBtnClose = document.getElementById('#popupProfileClose');
popupProfileBtnClose.addEventListener('click', ()=>{
  closeAnyPopup(popupProfileBtnClose);
});
popupProfileForm.addEventListener('submit', changeProfileInfo);
//Закрытие по клику на оверлэй
popupProfile.addEventListener('mousedown', closePopupOverlay);

//profile page fields
const textProfileName = document.querySelector('.profile__name');
const textProfileAbout = document.querySelector('.profile__about');

function changeProfileInfo(event) {
  event.preventDefault();
  textProfileName.textContent = popupProfileName.value;
  textProfileAbout.textContent = popupProfileAbout.value;
  closeAnyPopup(event.target);
}

function openPopupProfile() {
  if(!popupProfile.classList.contains('popup_is-opened')){
    popupProfileName.value = textProfileName.textContent;
    popupProfileAbout.value = textProfileAbout.textContent;
  }
  disableSubmitButton(popupProfileBtnSubmit, enableValidationFields.inactiveButtonClass);
  openAnyPopup(popupProfile);
}

//popup new card
const popupNewCard = document.getElementById('#popupNewCard');
const popupNewCardCaption = document.getElementById('caption');
const popupNewCardLink = document.getElementById('link');
const popupNewCardBtnSubmit = document.getElementById('#popupNewCardSubmit');
const popupNewCardForm = document.getElementById('#popupNewCardForm');
const popupNewCardBtnClose = document.getElementById('#popupNewCardClose');
popupNewCardBtnClose.addEventListener('click', ()=>{
  closeAnyPopup(popupNewCardBtnClose);
});
popupNewCardForm.addEventListener('submit', submitNewCard);
//Закрытие по клику на оверлэй
popupNewCard.addEventListener('mousedown', closePopupOverlay);

function submitNewCard(event) {
  event.preventDefault();
  addElementToPage(popupNewCardLink.value, popupNewCardCaption.value);
  closeAnyPopup(event.target);
}

function openPopupNewCard() {
  popupNewCardCaption.value = "";
  popupNewCardLink.value = "";
  disableSubmitButton(popupNewCardBtnSubmit, enableValidationFields.inactiveButtonClass);
  openAnyPopup(popupNewCard);
}

//Добавление элемента
function addElementToPage(picLink, title){
  const element = createCard(picLink, title);
  //Добавление элемента на страницу в начало списка
  elements.prepend(element);
}

function createCard(picLink, title) {
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const image = element.querySelector('.element__image');
  //Values
  image.setAttribute('src', picLink);
  image.setAttribute('alt', `Изображение ${title}`);
  element.querySelector('.element__title').textContent = title;
  //Events
  //обработчик нажания кнопки like
  element.querySelector('.element__like').addEventListener(
    'click',
    (e)=>{
      e.target.classList.toggle('element__like_checked');
    }
  );
  //обработчик нажания кнопки remove
  element.querySelector('.element__remove').addEventListener(
    'click',
    (e) => {
      e.target.closest('.element').remove();
    }
  );
  //обработчик нажания на изображение
  element.querySelector('.element__image').addEventListener(
    'click',
    () => {
      openImagePopup(picLink, title);
    }
  );
  return element;
}


const enableValidationFields = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(enableValidationFields);


