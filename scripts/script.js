//Buttons
const btnEditProfile = document.querySelector('.profile__edit-button');
const btnAddElement = document.querySelector('.profile__add-button');

//Main container
const root = document.querySelector('.root');

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
    AddElement(item.link, item.name);
  });
}
loadDefaultPlaces();

//Button Event Listeners
btnEditProfile.addEventListener('click', openPopup);
btnAddElement.addEventListener('click', openPopup);

//Popup Methods
function closePopup(){
  document.querySelector('.popup').classList.remove('popup_is-opened');
}

function closePopupOnKeyboard(event) {
  if(event.keyCode === 13){
    event.preventDefault();
    closePopup();
  }
}

function AddCommonPopupEvents(element) {
  element.querySelector('.popup__close').addEventListener('click', ()=>{
    closePopup();
  });
  element.addEventListener('transitionend', ()=>{
    if(!element.classList.contains('popup_is-opened'))
    element.remove();
  });
  setTimeout(() => element.classList.add('popup_is-opened'), 0);
}

//Popup сделан через template, так как иначе временно появлялся при обновлении страницы
//popup image
function openImagePopup(link, name){
  //fileds
  const imageTemplate = document.getElementById('#image-popup').content;
  const imagePopup = imageTemplate.querySelector('.image-popup').cloneNode(true);
  //change values
  imagePopup.querySelector('.image-popup__image').setAttribute('src', link);
  imagePopup.querySelector('.image-popup__caption').textContent = name;
  //Events
  AddCommonPopupEvents(imagePopup);
  //Добавление элемента на страницу
  root.append(imagePopup);
}

//Popup
function openPopup(e)
{
  const popupTemplate = document.getElementById('#popup').content;
  const popup = popupTemplate.querySelector('.popup').cloneNode(true);
  const input1 = popup.querySelector('#popupFieldFirst');
  const input2 = popup.querySelector('#popupFieldSecond');
  const btn = popup.querySelector('.popup__button');
  const titleField = popup.querySelector('.popup__title');
  const form = popup.querySelector('.popup__form');
  //Нажатие кнопки редактирования профиля
  if(e.target.classList.contains('profile__edit-button')|| //Если нажали на поле кнопки
      e.target.parentNode.classList.contains('profile__edit-button'))//Если нажали на картинку
  {
    const textProfileName = document.querySelector('.profile__name');
    const textProfileAbout = document.querySelector('.profile__about');
    input1.setAttribute('placeholder', 'Имя');
    input2.setAttribute('placeholder', 'О себе');
    input1.value = textProfileName.textContent;
    input2.value = textProfileAbout.textContent;
    btn.textContent = 'Сохранить';
    titleField.textContent = 'Редактировать профиль';
    //Events
    form.addEventListener('submit', (event)=>{
      event.preventDefault();
      textProfileName.textContent = input1.value;
      textProfileAbout.textContent = input2.value;
      closePopup();
    });
  }
  //Нажатие кнопки добавления элемента
  if(e.target.classList.contains('profile__add-button') ||
      e.target.parentNode.classList.contains('profile__add-button'))
  {
    input1.setAttribute('placeholder', 'Название');
    input2.setAttribute('placeholder', 'Ссылка на картинку');
    input1.value = "";
    input2.value = "";
    btn.textContent = 'Создать';
    titleField.textContent = 'Новое место';
    //Events
    form.addEventListener('submit', (event)=>{
      event.preventDefault();
      AddElement(input2.value, input1.value);
      closePopup();
    });
  }

  input1.addEventListener('keyup', closePopupOnKeyboard);
  input2.addEventListener('keyup', closePopupOnKeyboard);

  //Events
  AddCommonPopupEvents(popup);
  //Добавление элемента на страницу
  root.append(popup);
}

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
      elements.removeChild(e.target.parentNode);
    }
  );
  //обработчик нажания на изображение
  element.querySelector('.element__image').addEventListener(
    'click',
    (e) => {
      openImagePopup(
        e.target.getAttribute('src'),
        e.target.parentNode.querySelector('.element__title').textContent
        );
    }
  );
  //Добавление элемента на страницу в начало списка
  elements.prepend(element);
}
