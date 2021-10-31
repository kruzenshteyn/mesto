//import './index.css';

import Card from "../components/Сard.js";
import FormValidator from "../components/FormValidator.js";
import initialCards from "../utils/initialCards.js"
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import {imagePopupSelectorimage, imagePopupSelectorCaption, popupProfileForm, popupNewCardForm, popupUpdateAvatarForm}
        from "../utils/constants.js";
import {enableValidationFields} from "../utils/validationFields.js";

import Api from "../components/Api.js";

//Image Popup
const imagePopup = document.querySelector('.image-popup');
const popupWithImage = new PopupWithImage(imagePopup, imagePopupSelectorimage, imagePopupSelectorCaption);
popupWithImage.setEventListeners();


const api = new Api({
  cards: 'https://mesto.nomoreparties.co/v1/cohort-29/cards',
  avatar: 'https://mesto.nomoreparties.co/v1/cohort-29/users/me/avatar',
  profile: 'https://mesto.nomoreparties.co/v1/cohort-29/users/me',
  likes: 'https://mesto.nomoreparties.co/v1/cohort-29/cards/likes',
  headers: {
      authorization: 'cfaf0977-e7ef-41b9-b3ff-5b31bcc8ae61',
      'Content-Type': 'application/json'
  }
});


const loadCard  = api.getInitialCards()
        .then((result) => {
          // обрабатываем результат
          console.log(result);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });

//Cards List
const cardsList = new Section(
  {
    data:initialCards,
    renderer:(cardItem)=>{
      const card = new Card({link:cardItem.link, about:cardItem.name}, '#element', (link, about)=>{popupWithImage.open(link, about)});
      const cardElement = card.createCard();
      cardsList.addItem(cardElement);
    }
  },
  '.elements'
)
cardsList.renderItems();

//profile page fields
const textProfileName = document.querySelector('.profile__name');
const textProfileAbout = document.querySelector('.profile__about');
const avatarImage = document.querySelector('.profile__avatar-pic')
const userInfo = new UserInfo({name:textProfileName, about:textProfileAbout, avatar:avatarImage});


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
  (data) => { cardsList.renderNewItem({link:data.link, name:data.caption});//{link:cardItem.link, about:cardItem.name}
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
//https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg
//http://127.0.0.1:5500/src/images/kusto.jpg
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






