//Popup fields
let btnOpenPopup = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let btnClosePopup = document.querySelector('.popup__close');
let textProfileName = document.querySelector('.profile__name');
let textProfileAbout = document.querySelector('.profile__about');
let frmPopupSubmit = document.querySelector('.popup__form');
let popupContent = document.querySelector('.popup__content');
let popupName = document.getElementById('popupFieldName');
let popupAbout = document.getElementById('popupFieldAbout');

//Popup Methods
function togglePopup(){
  if(!popup.classList.contains('popup_is-opened')){
    popupName.value = textProfileName.textContent
    popupAbout.value = textProfileAbout.textContent;
  }
  popup.classList.toggle('popup_is-opened');
};

function changeProfileInfo(event)
{
  event.preventDefault();
  textProfileName.textContent = popupName.value;
  textProfileAbout.textContent = popupAbout.value;
  togglePopup();
}

//Popup Event Listeners
btnOpenPopup.addEventListener('click', togglePopup);
btnClosePopup.addEventListener('click', togglePopup);

frmPopupSubmit.addEventListener('submit', changeProfileInfo);
