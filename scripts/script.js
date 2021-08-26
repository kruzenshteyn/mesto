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
  //initialCards.forEach(function(item, i , initialCards){
  initialCards.forEach((item)=>{
    AddElementToPage(item.link, item.name);
  });
}
loadDefaultPlaces();

//Buttons
const btnEditProfile = document.querySelector('.profile__edit-button');
const btnAddElement = document.querySelector('.profile__add-button');

//Button Event Listeners
btnEditProfile.addEventListener('click', openPopupProfile);
btnAddElement.addEventListener('click', openPopupNewCard);

function openAnyPopup(sender) {
  sender.classList.add('popup_is-opened');
}

//Popups
function closeAnyPopup(sender){
  sender.closest('.popup').classList.remove('popup_is-opened');
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

function openImagePopup(link, name){
  if(!imagePopup.classList.contains('popup_is-opened')){
    imagePopupLink.setAttribute('src', link);
    imagePopupCaption.textContent = name;
  }
  openAnyPopup(imagePopup);
}

//Popup profile
const popupProfile = document.getElementById('#popupProfile');
const popupProfileName = document.getElementById('#popupProfileName');
const popupProfileAbout = document.getElementById('#popupProfileAbout');
const popupProfileBtnSubmit = document.getElementById('#popupProfileSubmit');
const popupProfileForm = document.getElementById('#popupProfileForm');
const popupProfileBtnClose = document.getElementById('#popupProfileClose');
popupProfileBtnClose.addEventListener('click', ()=>{
  closeAnyPopup(popupProfileBtnClose);
});
popupProfileForm.addEventListener('submit', changeProfileInfo);

//profile page fields
const textProfileName = document.querySelector('.profile__name');
const textProfileAbout = document.querySelector('.profile__about');

function changeProfileInfo(event) {
  event.preventDefault();
  textProfileName.textContent = popupProfileName.value;
  textProfileAbout.textContent = popupProfileAbout.value;
  popupProfileForm.removeEventListener('submit', changeProfileInfo);
  closeAnyPopup(event.target);
}

function openPopupProfile() {
  if(!popupProfile.classList.contains('popup_is-opened')){
    popupProfileName.value = textProfileName.textContent;
    popupProfileAbout.value = textProfileAbout.textContent;
  }
  openAnyPopup(popupProfile);
}

//popup new card
const popupNewCard = document.getElementById('#popupNewCard');
const popupNewCardCaption = document.getElementById('#popupNewCardCaption');
const popupNewCardLink = document.getElementById('#popupNewCardLink');
const popupNewCardBtnSubmit = document.getElementById('#popupNewCardSubmit');
const popupNewCardForm = document.getElementById('#popupNewCardForm');
const popupNewCardBtnClose = document.getElementById('#popupNewCardClose');
popupNewCardBtnClose.addEventListener('click', ()=>{
  closeAnyPopup(popupNewCardBtnClose);
});
popupNewCardForm.addEventListener('submit', SubmitNewCard);

function SubmitNewCard(event) {
  event.preventDefault();
  AddElementToPage(popupNewCardLink.value, popupNewCardCaption.value);
  closeAnyPopup(event.target);
}

function openPopupNewCard() {
  popupNewCardCaption.value = "";
  popupNewCardLink.value = "";
  openAnyPopup(popupNewCard);
}

//Добавление элемента
function AddElementToPage(picLink, title){
  const element = createCard(picLink, title);
  //Добавление элемента на страницу в начало списка
  elements.prepend(element);
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


