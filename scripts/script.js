//Popup fields
let btnOpenPopup = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let btnClosePopup = document.querySelector('.popup__close');
let textProfileName = document.querySelector('.profile__name');
let textProfileAbout = document.querySelector('.profile__about');
let frmPopupSubmit = document.querySelector('.popup__form');
let popupContent = document.querySelector('.popup__content');
let popupFieldFirst = document.getElementById('popupFieldFirst');
let popupFieldSecond = document.getElementById('popupFieldSecond');
let btnAddElement = document.querySelector('.profile__add-button');

let popupTitle = document.querySelector('.popup__title');
let btnPopupSubmit = document.querySelector('.popup__button');



let popupImage = document.querySelector('.image-popup');
let btnClosePopupImage = document.getElementById("image-popup__close");

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

//Load default places
function loadDefaultPlaces(){
  initialCards.forEach(function(item, i , initialCards){
    AddElement(item.link, item.name);
  });
}

loadDefaultPlaces();

//Popup Methods
function togglePopup(){
  if(!popup.classList.contains('popup_is-opened')){
    popupFieldFirst.value = textProfileName.textContent
    popupFieldSecond.value = textProfileAbout.textContent;
  }
  popup.classList.toggle('popup_is-opened');
};

function openPopupProfile(){
  if(!popup.classList.contains('popup_is-opened')){
    popupFieldFirst.value = textProfileName.textContent
    popupFieldSecond.value = textProfileAbout.textContent;
    popupFieldFirst.setAttribute('placeholder', 'Имя');
    popupFieldSecond.setAttribute('placeholder', 'О себе');
    btnPopupSubmit.textContent = 'Сохранить';
    //Изменение ключевых надписей на форме
    popupTitle.textContent = 'Редактировать профиль';
  }
  popup.classList.add('popup_is-opened');
  frmPopupSubmit.addEventListener('submit', changeProfileInfo);
}

let popupImageLink = document.querySelector('.image-popup__image');
let popupImageCaption = document.querySelector('.image-popup__caption');

function openImagePopup(link, name){
  if(!popupImage.classList.contains('popup_is-opened')){
    popupImageLink.setAttribute('src', link);
    popupImageCaption.textContent = name;
  }
  popupImage.classList.add('popup_is-opened');
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function openPopupPlace(){
  if(!popup.classList.contains('popup_is-opened')){
    //Изменение ключевых надписей на форме
    popupTitle.textContent = 'Новое место';
    popupFieldFirst.setAttribute('placeholder', 'Название');
    popupFieldSecond.setAttribute('placeholder', 'Ссылка на картинку');
    popupFieldFirst.value = "";
    popupFieldSecond.value = "";
    frmPopupSubmit.addEventListener('submit', addNewPlace);
    btnPopupSubmit.textContent = 'Создать';

    //Temp
    //let idx = getRandomInt(6);
    //popupFieldFirst.value = initialCards[idx].name;
    //popupFieldSecond.value = initialCards[idx].link;
  }
  popup.classList.add('popup_is-opened');
}

function closePopup(){
  popup.classList.remove('popup_is-opened');
  frmPopupSubmit.removeEventListener('submit', addNewPlace);
  frmPopupSubmit.removeEventListener('submit', changeProfileInfo);
}

function closeImagePopup(){
  popupImage.classList.remove('popup_is-opened');
}

function addNewPlace(event){
  event.preventDefault();
  AddElement(popupFieldSecond.value, popupFieldFirst.value)
  closePopup();
}

function changeProfileInfo(event)
{
  event.preventDefault();
  textProfileName.textContent = popupFieldFirst.value;
  textProfileAbout.textContent = popupFieldSecond.value;
  closePopup();
}

//Popup Event Listeners
btnOpenPopup.addEventListener('click', openPopupProfile);
btnAddElement.addEventListener('click', openPopupPlace);
btnClosePopup.addEventListener('click', closePopup);
btnClosePopupImage.addEventListener('click', closeImagePopup);

//Add element
//Добавление элемента
function AddElement(picLink, title){
  const elementTemplate = document.getElementById('#element').content;
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const image = element.querySelector('.element__image');
  const elements = document.querySelector('.elements');
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
    (e) => {
      openImagePopup(picLink, title);
    }
  );
  //Добавление элемента на страницу в начало списка
  elements.prepend(element);
}

