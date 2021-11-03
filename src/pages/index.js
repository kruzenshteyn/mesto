import './index.css';

import Card from "../components/Сard.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import {imagePopupSelectorimage, imagePopupSelectorCaption, popupProfileForm, popupNewCardForm, popupUpdateAvatarForm, popupConfirmForm}
        from "../utils/constants.js";
import {enableValidationFields} from "../utils/validationFields.js";

import Api from "../components/Api.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";

//Image Popup
const popupWithImage = new PopupWithImage('.image-popup', imagePopupSelectorimage, imagePopupSelectorCaption);
popupWithImage.setEventListeners();


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-29/',
  headers: {
      authorization: 'cfaf0977-e7ef-41b9-b3ff-5b31bcc8ae61',
      'Content-Type': 'application/json'
  }
});

const popupWithConfirm = new PopupWithConfirm('#popupConfirm', api);
popupWithConfirm.setEventListeners()

//profile page fields
const textProfileName = document.querySelector('.profile__name');
const textProfileAbout = document.querySelector('.profile__about');
const avatarImage = document.querySelector('.profile__avatar-pic')
const userInfo = new UserInfo({name:textProfileName, about:textProfileAbout, avatar:avatarImage});

//Cards List
const cardsList = new Section({
    renderer:(cardItem)=>{
      const card = new Card(
        '#element',
        cardItem,
        userInfo.getId(),
        (link, about)=>{popupWithImage.open(link, about)},
        (event)=>{
          event.preventDefault();
          const card = event.target.closest('.element');
          popupWithConfirm.open(card);
        },
        api);
      const cardElement = card.createCard();
      cardsList.addItem(cardElement);
    }
  },
  '.elements'
)

//Load initial data from server
const profile = api.getProfile();
const initialCards  = api.getInitialCards();
Promise.all([profile, initialCards])
  .then(res=>{
    userInfo.setUserInfo(res[0]);
    cardsList.renderItems(res[1]);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

//Validators
const frmProfileValidaton = new FormValidator(enableValidationFields, popupProfileForm);
frmProfileValidaton.enableValidation();
const frmNewCardValidaton = new FormValidator(enableValidationFields, popupNewCardForm);
frmNewCardValidaton.enableValidation();
const frmUpdateAvatarValidaton = new FormValidator(enableValidationFields, popupUpdateAvatarForm);
frmUpdateAvatarValidaton.enableValidation();

//Popup profile
const popupWithFormProfile = new PopupWithForm(
  '#popupProfile',
  (data, popup) => {
              popup.querySelector('.popup__button').textContent = 'Сохранение...';
              api.patchUserInfo(data.name, data.about)
              .then(res => {
                userInfo.setUserInfo(res);
                popupWithFormProfile.close();
              })
              .catch(err => {
                console.log(err);
              })
              .finally(()=>{
                popup.querySelector('.popup__button').textContent = 'Сохранить';
              })
            },
  () => {frmProfileValidaton.disableSubmitButton()}
);
popupWithFormProfile.setEventListeners();

function openPopupWithFormProfile() {
  popupWithFormProfile.open();
  //info from Html
  const info = userInfo.getUserInfo();
  document.getElementById('name').value = info.name;
  document.getElementById('about').value = info.about;
}

//popup new card
const popupWithFormNewCard = new PopupWithForm(
  '#popupNewCard',
  (data, popup) => {
              popup.querySelector('.popup__button').textContent = 'Создание...';
              api.postCard(data.caption, data.link)
              .then(res =>{
                cardsList.renderNewItem(res);
                popupWithFormNewCard.close();
              })
              .catch(err => {console.log(err)})
              .finally(()=>{
                popup.querySelector('.popup__button').textContent = 'Создать';
              });
            },
  () => {frmNewCardValidaton.disableSubmitButton()}
);
popupWithFormNewCard.setEventListeners();

function openPopupWithFormNewCard() {
  popupWithFormNewCard.open();
}

//popup edit avatar #popupUpdateAvatar
//https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgFHJGeoCUPKhbNS1XVLncOF_DPe3Ok5vGgQ&usqp=CAU
const popupWithFormUpdateAvatar = new PopupWithForm(
  '#popupUpdateAvatar',
  (data, popup) => {
              popup.querySelector('.popup__button').textContent = 'Сохранение...';
              api.patchAvatar(data.link)
              .then(res => {
                userInfo.setUserAvatar(res.avatar);
                popupWithFormUpdateAvatar.close();
              })
              .catch(err => { console.log(err) })
              .finally(()=>{
                popup.querySelector('.popup__button').textContent = 'Сохранить';
              });
            },
  () => {frmUpdateAvatarValidaton.disableSubmitButton()}
);
popupWithFormUpdateAvatar.setEventListeners();

function openPopupWithFormUpdateAvatar() {
  popupWithFormUpdateAvatar.open();
}

//Buttons
const btnEditProfile = document.querySelector('.profile__edit-button');
const btnAddElement = document.querySelector('.profile__add-button');
const btnUpdateAvatar = document.querySelector('.profile__avatar-button');

//Button Event Listeners
btnEditProfile.addEventListener('click', openPopupWithFormProfile);
btnAddElement.addEventListener('click', openPopupWithFormNewCard);
btnUpdateAvatar.addEventListener('click', openPopupWithFormUpdateAvatar);






