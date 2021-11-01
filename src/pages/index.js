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
const imagePopup = document.querySelector('.image-popup');
const popupWithImage = new PopupWithImage(imagePopup, imagePopupSelectorimage, imagePopupSelectorCaption);
popupWithImage.setEventListeners();


const api = new Api({
  profile: 'https://mesto.nomoreparties.co/v1/cohort-29/users/me',
  avatar: 'https://mesto.nomoreparties.co/v1/cohort-29/users/me/avatar',
  cards: 'https://mesto.nomoreparties.co/v1/cohort-29/cards',
  likes: 'https://mesto.nomoreparties.co/v1/cohort-29/cards/likes',
  headers: {
      authorization: 'cfaf0977-e7ef-41b9-b3ff-5b31bcc8ae61',
      'Content-Type': 'application/json'
  }
});

const popupConfirm = document.getElementById('#popupConfirm');
const popupWithConfirm = new PopupWithConfirm(popupConfirm, api);
popupWithConfirm.setEventListeners()


  //Cards List
const cardsList = new Section(
  {
    renderer:(cardItem)=>{
      const card = new Card(
        '#element',
        (link, about)=>{popupWithImage.open(link, about)},
        (event)=>{
          event.preventDefault();
          const card = event.target.closest('.element');
          popupWithConfirm.open(card);
        },
        api);
      const cardElement = card.createCard(cardItem);
      cardsList.addItem(cardElement);
    }
  },
  '.elements'
)

const initialCards  = api.getInitialCards()
        .then((cards) => {
          // обрабатываем результат
          cardsList.renderItems(cards);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });

//profile page fields
const textProfileName = document.querySelector('.profile__name');
const textProfileAbout = document.querySelector('.profile__about');
const avatarImage = document.querySelector('.profile__avatar-pic')
const userInfo = new UserInfo({name:textProfileName, about:textProfileAbout, avatar:avatarImage});

//LoadProfile
const profile = api.getProfile()
        .then((result) => {
          userInfo.setUserInfo(result);
          userInfo.setUserAvatar(result.avatar);
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
const popupProfile = document.getElementById('#popupProfile');
const popupProfileName = document.getElementById('name');
const popupProfileAbout = document.getElementById('about');

const popupWithFormProfile = new PopupWithForm(
  popupProfile,
  (data) => {
              popupProfile.querySelector('.popup__button').textContent = 'Сохранение...';
              api.patchUserInfo(data.name, data.about)
              .then(res => {
                userInfo.setUserInfo(res)
              })
              .catch(err => {
                console.log(err);
              })
              .finally(()=>{
                popupWithFormProfile.close();
                popupProfile.querySelector('.popup__button').textContent = 'Сохранить';
              })
            },
  () => {frmProfileValidaton.disableSubmitButton()}
);
popupWithFormProfile.setEventListeners();

function openPopupWithFormProfile() {
  popupWithFormProfile.open();
  //info from Html
  const info = userInfo.getUserInfo();
  popupProfileName.value = info.name;
  popupProfileAbout.value = info.about;
}

//popup new card
const popupNewCard = document.getElementById('#popupNewCard');

const popupWithFormNewCard = new PopupWithForm(
  popupNewCard,
  (data) => { api.postCard(data.caption, data.link)
              .then(res =>{
                cardsList.renderNewItem(res);
              })
              .catch(err => {console.log(err)});
              popupWithFormNewCard.close();
            },
  () => {frmNewCardValidaton.disableSubmitButton()}
);
popupWithFormNewCard.setEventListeners();

function openPopupWithFormNewCard() {
  popupWithFormNewCard.open();
}

//popup edit avatar #popupUpdateAvatar
const popupUpdateAvatar = document.getElementById('#popupUpdateAvatar');
//https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgFHJGeoCUPKhbNS1XVLncOF_DPe3Ok5vGgQ&usqp=CAU
const popupWithFormUpdateAvatar = new PopupWithForm(
  popupUpdateAvatar,
  (data) => {
              popupUpdateAvatar.querySelector('.popup__button').textContent = 'Сохранение...';
              api.patchAvatar(data.link)
              .then(res => {
                avatarImage.src = res.avatar;
              })
              .catch(err => { console.log(err) })
              .finally(()=>{
                popupWithFormUpdateAvatar.close();
                popupUpdateAvatar.querySelector('.popup__button').textContent = 'Сохранить';
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






