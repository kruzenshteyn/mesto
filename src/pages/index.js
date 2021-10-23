//import './index.css';

import Card from "../components/Сard.js";
import FormValidator from "../components/FormValidator.js";
import initialCards from "../utils/initialCards.js"
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import {imagePopupSelectorimage, imagePopupSelectorCaption, popupProfileForm, popupNewCardForm} from "../utils/constants.js";
import {enableValidationFields} from "../utils/validationFields.js";

//Image Popup
const imagePopup = document.querySelector('.image-popup');
const popupWithImage = new PopupWithImage(imagePopup, imagePopupSelectorimage, imagePopupSelectorCaption);
popupWithImage.setEventListeners();


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
const userInfo = new UserInfo({name:textProfileName, about:textProfileAbout});

//Validators
const frmProfileValidaton = new FormValidator(enableValidationFields, popupProfileForm);
frmProfileValidaton.enableValidation();
const frmNewCardValidaton = new FormValidator(enableValidationFields, popupNewCardForm);
frmNewCardValidaton.enableValidation();

//Popup profile
const popupProfile = document.getElementById('#popupProfile');
const popupProfileName = document.getElementById('name');
const popupProfileAbout = document.getElementById('about');

const popupWithFormProfile = new PopupWithForm(
  popupProfile,
  (data) => { userInfo.setUserInfo(data);

              popupWithFormProfile.close();
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

//Buttons
const btnEditProfile = document.querySelector('.profile__edit-button');
const btnAddElement = document.querySelector('.profile__add-button');

//Button Event Listeners
btnEditProfile.addEventListener('click', openPopupWithFormProfile);
btnAddElement.addEventListener('click', openPopupWithFormNewCard);


fetch('https://mesto.nomoreparties.co/v1/cohort-29/users/me', {
  headers: {
    authorization: 'cfaf0977-e7ef-41b9-b3ff-5b31bcc8ae61'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });

fetch('https://mesto.nomoreparties.co/v1/cohort-29/cards', {
  headers: {
    authorization: 'cfaf0977-e7ef-41b9-b3ff-5b31bcc8ae61'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });
