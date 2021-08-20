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

let elements = document.querySelector('.elements');

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
    btnPopupSubmit.textContent = 'Сохранить';
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
    popupTitle.textContent = 'Новое место';
    popupFieldFirst.setAttribute('placeholder', 'Название');
    popupFieldSecond.setAttribute('placeholder', 'Ссылка на картинку');

    frmPopupSubmit.addEventListener('submit', addNewPlace);
    btnPopupSubmit.textContent = 'Создать';

    //Temp
    let idx = getRandomInt(6);
    popupFieldFirst.value = initialCards[idx].name;
    popupFieldSecond.value = initialCards[idx].link;
  }
  popup.classList.add('popup_is-opened');
}

function closePopup(){
  popup.classList.remove('popup_is-opened');
}

function closeImagePopup(){
  popupImage.classList.remove('popup_is-opened');
}

function addNewPlace(event){
  event.preventDefault();
  AddElement(popupFieldSecond.value, popupFieldFirst.value)
  frmPopupSubmit.removeEventListener('submit', addNewPlace);
  closePopup();
}

function changeProfileInfo(event)
{
  event.preventDefault();
  textProfileName.textContent = popupFieldFirst.value;
  textProfileAbout.textContent = popupFieldSecond.value;
  frmPopupSubmit.removeEventListener('submit', changeProfileInfo);
  closePopup();
}

//Popup Event Listeners
btnOpenPopup.addEventListener('click', openPopupProfile);
btnAddElement.addEventListener('click', openPopupPlace);
btnClosePopup.addEventListener('click', closePopup);
btnClosePopupImage.addEventListener('click', closeImagePopup);



//Add element
function AddElement(picLink, title){
  elements.insertAdjacentHTML('afterbegin', `
    <figure class="element">
      <button type="button" class="button element__remove"></button>
      <img
        class="element__image"
        src=${picLink}
        alt=${title}
        id = '#element__image'
      />
      <figcaption class="element__caption">
        <h2 class="element__title">${title}</h2>
        <button type="button" class="element__like"></button>
      </figcaption>
    </figure>
    `);
    //Добавляетм первому элементу обработчик нажания кнопки like
    document.querySelectorAll('.element__like')[0].addEventListener(
        'click',
        (e)=>{
          e.target.classList.toggle('element__like_checked');
        }
      );
    //Добавляетм первому элементу обработчик нажания кнопки remove
    document.querySelectorAll('.element__remove')[0].addEventListener(
        'click',
        (e) => {
          e.target.parentNode.parentNode.removeChild(e.target.parentNode);
        }
      );
    //Добавляетм первому элементу обработчик нажания на изображение
    document.querySelectorAll('.element__image')[0].addEventListener(
      'click',
      (e) => {
        openImagePopup(
          e.target.getAttribute('src'),
          e.target.parentNode.querySelector('.element__title').textContent
          );
      }
    );
}
