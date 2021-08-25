//Buttons
const btnEditProfile = document.querySelector('.profile__edit-button');
const btnAddElement = document.querySelector('.profile__add-button');

//Main container
const root = document.querySelector('.root');

//Cards
const elements = document.querySelector('.elements');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Загрузка изображений из массива
function loadDefaultPlaces(){
  initialCards.forEach(function(item, i , initialCards){
    AddElementToPage(item.link, item.name);
  });
}
loadDefaultPlaces();

//Button Event Listeners
btnEditProfile.addEventListener('click', openPopupProfile);
btnAddElement.addEventListener('click', openPopupNewCard);


function closeAnyPopup(event){
  event.target.closest('.popup').classList.remove('popup_is-opened');
}

//Popup-image
const imagePopup = document.querySelector('.image-popup');
const imagePopupLink = document.querySelector('.image-popup__image');
const imagePopupCaption = document.querySelector('.image-popup__caption');
const imagePopupBtnClose = document.getElementById('#image-popup__button');
//Добавим событие на кнопку закрытия popupImage
imagePopupBtnClose.addEventListener('click', closeAnyPopup);

function openImagePopup(link, name){
  if(!imagePopup.classList.contains('popup_is-opened')){
    imagePopupLink.setAttribute('src', link);
    imagePopupCaption.textContent = name;
  }
  imagePopup.classList.add('popup_is-opened');
}

//Popup
const popup = document.querySelector('.popup');
const popupInput1 = document.getElementById('#popupFieldFirst');
const popupInput2 = document.getElementById('#popupFieldSecond');
const popupBtnSubmit = document.getElementById('#popup__submit');
const popupTitleField = document.querySelector('.popup__title');
const popupForm = document.querySelector('.popup__form');
const popupBtnClose = document.getElementById('#popup__close');
popupBtnClose.addEventListener('click', closeAnyPopup);

//popup profile
const textProfileName = document.querySelector('.profile__name');
const textProfileAbout = document.querySelector('.profile__about');

function changeProfileInfo(event) {
  event.preventDefault();
  textProfileName.textContent = popupInput1.value;
  textProfileAbout.textContent = popupInput2.value;
  popupForm.removeEventListener('submit', changeProfileInfo);
  closeAnyPopup(event);
}

function openPopupProfile() {
  if(!popup.classList.contains('popup_is-opened')){
    popupInput1.setAttribute('placeholder', 'Имя');
    popupInput2.setAttribute('placeholder', 'О себе');
    popupInput1.value = textProfileName.textContent;
    popupInput2.value = textProfileAbout.textContent;
    popupBtnSubmit.textContent = 'Сохранить';
    popupTitleField.textContent = 'Редактировать профиль';
    //Events
    popupForm.addEventListener('submit', changeProfileInfo);
  }
  popup.classList.add('popup_is-opened');
}

//popup new card

const popupNewCard = document.getElementById('#popupNewCard');
const popupNewCardInput1 = document.getElementById('#popupNewCardCaption');
const popupNewCardInput2 = document.getElementById('#popupNewCardLink');
const popupNewCardBtnSubmit = document.getElementById('#popupNewCardSubmit');
const popupNewCardTitleField = document.getElementById('#popupNewCardTitle');
const popupNewCardForm = document.getElementById('#popupNewCardForm');
const popupNewCardBtnClose = document.getElementById('#popupNewCardClose');
console.log(popupNewCardForm);
popupNewCardBtnClose.addEventListener('click', closeAnyPopup);



function SubmitNewCard(event) {
  event.preventDefault();
  AddElementToPage(popupNewCardInput2.value, popupNewCardInput1.value);
  //Удаляем событие
  popupNewCardForm.removeEventListener('submit', SubmitNewCard);
  closeAnyPopup(event);
}

function openPopupNewCard() {
  if(!popup.classList.contains('popup_is-opened')){
    popupNewCardInput1.setAttribute('placeholder', 'Название');
    popupNewCardInput2.setAttribute('placeholder', 'Ссылка на картинку');
    popupNewCardInput1.value = "";
    popupNewCardInput2.value = "";
    popupNewCardBtnSubmit.textContent = 'Создать';
    popupNewCardTitleField.textContent = 'Новое место';
    //Events
    popupNewCardForm.addEventListener('submit', SubmitNewCard);
  }
  popupNewCard.classList.add('popup_is-opened');
}

function createCard(picLink, title) {
  const elementTemplate = document.getElementById('#element').content;
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
      elements.removeChild(e.target.closest('.element'));
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

//Добавление элемента
function AddElementToPage(picLink, title){
  element = createCard(picLink, title);
  //Добавление элемента на страницу в начало списка
  elements.prepend(element);
}
