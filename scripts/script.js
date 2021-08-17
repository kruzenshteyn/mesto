//Popup
let btnOpenPopup = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let btnClosePopup = document.querySelector('.popup__close');
let textProfileName = document.querySelector('.profile__name');
let textProfileAbout = document.querySelector('.profile__about');
let btnPopupSubmit = document.querySelector('.popup__button');
let popupName = document.querySelector('.popup__name');
let popupAbout = document.querySelector('.popup__about');

function togglePopup(){
  if(!popup.classList.contains('popup_is-opened')){
    popupName.value = textProfileName.textContent
    popupAbout.value = textProfileAbout.textContent;
  }
  popup.classList.toggle('popup_is-opened');
};

function changeProfileInfo()
{
  if(popupName.value === '' || popupAbout.value === '') return;
  textProfileName.textContent = popupName.value;
  textProfileAbout.textContent = popupAbout.value;
  togglePopup();
}

btnOpenPopup.addEventListener('click', togglePopup);
btnClosePopup.addEventListener('click', togglePopup);
btnPopupSubmit.addEventListener('click', changeProfileInfo);

document.querySelector('.popup__form').addEventListener(
  'submit',
  function(event){
    event.preventDefault();
  }
);

//Like
document.querySelectorAll('.element__like').forEach(item=>{
  item.addEventListener(
    'click',
    (e)=>{
      e.target.classList.toggle('element__like_background_black');
    }
  );
});



