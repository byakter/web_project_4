import "./index.css";
import { Card } from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { initialCards } from "../utils/constants.js";

const imageCards = document.querySelector(".cards");
const cardTemplateSelector = ".card-template";

function generateCard(card) {
  const cardElement = new Card(card, cardTemplateSelector, handlerCardClick);
  return cardElement.generateCard();
}

const section = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      imageCards.append(generateCard(data));
      // generateCard(data, imageCards);
    },
  },
  ".cards"
);

section.render();

const userInfo = new UserInfo({
  profileNameSelector: ".profile__title",
  profileJobSelector: ".profile__subtitle",
});

const imageModal = new PopupWithImage(".popup_type_preview");
imageModal.setEventListeners();

const editModal = new PopupWithForm(".popup_type_profile", (data) =>
  userInfo.setUserInfo(data)
);

editModal.setEventListeners();

const addCardModal = new PopupWithForm(".popup_type_card", (data) => {
  const cardInput = { name: data["place-name"], link: data.link };
  const cardElement = generateCard(cardInput);
  section.addItem(cardElement);
  //   imageCards.prepend(cardElement);
});

addCardModal.setEventListeners();

const settings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
const profileFormElement = document.querySelector(".popup__form_type_profile");
const addCardFormElement = document.querySelector(".popup__form_type_card");

const editFormValidator = new FormValidator(settings, profileFormElement);
const addCardFormValidator = new FormValidator(settings, addCardFormElement);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

/*-----------------------------------------------------------------------//
                                edit profile
------------------------------------------------------------------------*/
const profileEditButton = document.querySelector(".profile__edit-button");
//const profilePopup = document.querySelector(".popup_type_profile");

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_profession");

//const profileName = document.querySelector(".profile__title");
//const profileJob = document.querySelector(".profile__subtitle");

//-------------------------------------------------------------------------//

profileEditButton.addEventListener("click", function () {
  const data = userInfo.getUserInfo();
  editModal.open();
  editFormValidator.resetValidation();
  nameInput.value = data.name;
  jobInput.value = data.job;
});

/*-----------------------------------------------------------------------//
                                Add cards
------------------------------------------------------------------------*/
// const addCardPopup = document.querySelector(".popup_type_card");
const addCardOpenBtn = document.querySelector(".profile__button");

// const cardTitleInput = addCardPopup.querySelector(".popup__input_type_title");
// const cardLinkInput = addCardPopup.querySelector(".popup__input_type_link");

addCardOpenBtn.addEventListener("click", function () {
  addCardModal.open();
  addCardFormValidator.resetValidation();

});

//------------------------------------------------------------------------//
//                      initialCards                                      //
//------------------------------------------------------------------------//

//const cardTemplate = document
// .querySelector(".card-template")
//.content.querySelector(".cards__card");

function handlerCardClick(name, link) {
  imageModal.open(name, link);
}

// initialCards.forEach(function (cardData) {
//   // imageCards.append(generateCard(cardData));
// });
